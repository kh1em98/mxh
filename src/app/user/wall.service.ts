import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user.model';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export interface UserProfile {
  _id: string;
  name: string;
  username: string;
  avatar: string;
  bigAvatar: string;
  wallPosts: [];
}

@Injectable({
  providedIn: 'root',
})
export class WallService {
  userProfile: UserProfile = null;

  userProfileChanged = new BehaviorSubject<UserProfile>(null);

  constructor(private http: HttpClient) {}

  getUserProfile(username: string) {
    return this.http.get<User>(`/api/user/${username}`).pipe(
      tap((response: any) => {
        this.userProfile = this.createUserProfile(response.user);
        this.userProfileChanged.next(this.userProfile);
      })
    );
  }

  createUserProfile(userResponse): UserProfile {
    return {
      _id: userResponse._id,
      name: userResponse.name,
      username: userResponse.username,
      avatar: userResponse.avatar,
      bigAvatar: userResponse.bigAvatar,
      wallPosts: userResponse.wallPosts,
    };
  }
}
