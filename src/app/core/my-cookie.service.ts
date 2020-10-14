import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class MyCookieService {
  constructor(private cookieService: CookieService) {}

  decodePayload(): User {
    if (document.cookie) {
      try {
        const jwt_headerAndPayload = this.cookieService.get('headerAndPayload');

        const foundDot = jwt_headerAndPayload.indexOf('.');

        let payload: any = atob(jwt_headerAndPayload.substr(foundDot + 1));
        payload = JSON.parse(payload);

        const user: User = {
          _id: payload._id,
          username: payload.username,
          name: payload.name,
          email: payload.email,
          avatar: payload.avatar,
          role: payload.role,
          phone: payload.phone ? payload.phone : '',
          bio: payload.bio ? payload.bio : '',
        };
        return user;
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  delete(prop: string) {
    this.cookieService.delete(prop, '/');
  }
}
