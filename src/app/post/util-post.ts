import { User } from '../shared/user.model';
import { Post } from './post.model';
export function createComment(post: Post) {}

export function like(post: Post, userId: string) {
  post.likes.push(userId);
}

export function unlike(post: Post, userId: string) {
  post.likes = post.likes.filter((user) => user !== userId);
}

export function comment(post: Post, content: string, user: User)
{
    post.comments.unshift({

    })
}
