import { IPostOperation } from './post.service';
import { User } from './../shared/user.model';
import { Post } from './post.model';

export function operationCreatePost(newPost: Post): IPostOperation {
  return (posts: Post[]) => {
    return [newPost, ...posts];
  };
}

export function operationLoadPosts(newPosts: Post[]): IPostOperation {
  return (posts: Post[]) => {
    return [...posts, ...newPosts];
  };
}

export function operationLike(postId: string, userId: string): IPostOperation {
  return (posts: Post[]) => {
    const indexPost = posts.findIndex((post: Post) => post._id === postId);
    posts[indexPost].likes.push(userId);
    return posts;
  };
}

export function operationUnlike(
  postId: string,
  userId: string
): IPostOperation {
  return (posts: Post[]) => {
    const postIndex = posts.findIndex((post) => post._id === postId);

    const userToDeleteIndex = posts[postIndex].likes.findIndex(
      (userLike) => userLike === userId
    );

    posts[postIndex].likes.splice(userToDeleteIndex, 1);
    return posts;
  };
}

export function operationRetweet(
  postId: string,
  userId: string
): IPostOperation {
  return (posts: Post[]) => {
    const indexPost = posts.findIndex((post: Post) => post._id === postId);
    posts[indexPost].retweets.push(userId);
    return posts;
  };
}

export function createNewPost(post: Post, user: User): Post {
  return new Post({
    _id: post._id.toString(),
    userPost: {
      _id: user._id,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
    },
    content: post.content,
    images: post.images,
  });
}

export function operationDeletePost(postId: string): IPostOperation {
  return (posts: Post[]) => {
    const postIndex = posts.findIndex((post) => post._id === postId);
    posts.splice(postIndex, 1);
    return posts;
  };
}

export function operationCreateComment(
  postId: string,
  comment: any,
  user: User
): IPostOperation {
  return (posts: Post[]) => {
    const postIndex = posts.findIndex((post) => post._id === postId);

    posts[postIndex].comments.unshift({
      _id: comment._id,
      timeCreated: new Date(),
      content: comment.content,
      userComment: {
        _id: user._id,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
      },
    });
    return posts;
  };
}

export function operationDeleteComment(postId: string, commentId: string) {
  return (posts: Post[]) => {
    const indexPost = posts.findIndex((post) => post._id === postId);
    const indexComment = posts[indexPost].comments.findIndex(
      (comment) => comment._id === commentId
    );

    posts[indexPost].comments.splice(indexComment, 1);

    return posts;
  };
}
