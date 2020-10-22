export class Post {
  _id: string;
  userPost: {
    _id: string;
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timeCreated: Date;
  comments: any;
  likes: string[];
  retweets: string[];
  images: string[];
  constructor(post: any) {
    this._id = post._id;
    this.comments = post.comments || [];
    this.likes = post.likes || [];
    this.images = post.images || [];
    this.retweets = post.retweets || [];
    this.timeCreated = post.timeCreated || new Date();
    this.userPost = post.userPost;
    this.content = post.content;
  }
}
