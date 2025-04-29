import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  constructor(private router: Router) {}

  navigateToAppointment() {
    this.router.navigate(['/clinic']);
  }
}
