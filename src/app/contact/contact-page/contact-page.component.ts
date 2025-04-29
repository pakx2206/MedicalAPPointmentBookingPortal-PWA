import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface City {
  name: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements AfterViewInit {
  cities: City[] = [
    { name: 'Warszawa', lat: 52.229676, lng: 21.012229 },
    { name: 'Kraków',   lat: 50.064650, lng: 19.944980 },
    { name: 'Łódź',     lat: 51.778710, lng: 19.457210 },
    { name: 'Wrocław',  lat: 51.107883, lng: 17.038538 }
  ];

  private markers: any[] = [];
  private map: any; 

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private http: HttpClient
  ) {}

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const L = await import('leaflet');

    this.map = L.map('map').setView(
      [52.229676, 19.457210],
      6
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(this.map);

    this.markers = this.cities.map(c =>
      L.marker([c.lat, c.lng]).addTo(this.map).bindPopup(`<b>${c.name}</b>`)
    );
  }

  locateNearestByRoad() {
    if (!navigator.geolocation) {
      alert('Twoja przeglądarka nie wspiera Geolocation API');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const userLng = pos.coords.longitude;
        const userLat = pos.coords.latitude;

        const calls = this.cities.map((city, idx) => {
          const url = [
            'https://api.openrouteservice.org/v2/directions/driving-car',
            `?api_key=${environment.openRouteServiceKey}`,
            `&start=${userLng},${userLat}`,
            `&end=${city.lng},${city.lat}`
          ].join('');

          return this.http.get<any>(url).pipe(
            map(res => ({
              idx,
              city: city.name,
              distance: res.features[0].properties.summary.distance  
            }))
          );
        });

        forkJoin(calls).subscribe(results => {
  
          let best = results[0];
          for (const r of results) {
            if (r.distance < best.distance) best = r;
          }

          const L = (window as any).L;
          const m = this.markers[best.idx];
          m.setIcon(
            L.icon({
              iconUrl: 'assets/marker-icon-red.png',
              shadowUrl: 'assets/marker-shadow.png',
              iconSize: [30, 50],
              iconAnchor: [15, 50]
            })
          );
          m.openPopup();
          this.map.setView(m.getLatLng(), 12);
        },
        err => alert('Błąd ORS: ' + err.message));
      },
      err => {
        alert('Nie udało się pobrać lokalizacji: ' + err.message);
      }
    );
  }
}
