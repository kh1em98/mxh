import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import {
  map,
  take
} from 'rxjs/operators';
import {
  User
} from '../../shared/user.model';
import {
  AuthService
} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyMeGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable < boolean | UrlTree > | Promise < boolean | UrlTree > | boolean | UrlTree {
    return this.authService.user
      .pipe(
        take(1),
        map((user: User) => {
          const username = state.root.children[0].params.username;
          if (user.username === username) {
            return true;
          }
          return this.router.createUrlTree(['/']);
        })
      )
  }

}
