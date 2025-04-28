import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(): Observable<boolean | UrlTree> {
    const auth = inject(Auth);
    const router = inject(Router);

    return authState(auth).pipe(
      take(1),
      map(user => {
        if (user) {
          return true;
        } else {
          return router.createUrlTree(['/login']);
        }
      })
    );
  }
}
