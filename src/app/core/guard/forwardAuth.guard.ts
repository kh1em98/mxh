import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../../shared/user.model';
import { take, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ForwardAuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user
            .pipe(
                take(1),
                map((user: User) => {
                    console.log('Cut');
                    if (user === null) {
                        return true;
                    }
                    return this.router.createUrlTree(['/']);
                })
            )
    }
}