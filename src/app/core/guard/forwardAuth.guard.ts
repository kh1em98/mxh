import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../../shared/user.model';
import { MyCookieService } from '../my-cookie.service';

@Injectable({
    providedIn: 'root'
})
export class ForwardAuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router,
        private myCookieService: MyCookieService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const user: User = this.myCookieService.decodePayload();

        if (user === null) {
            return true;
        }

        return this.router.createUrlTree(['/']);
    }
}