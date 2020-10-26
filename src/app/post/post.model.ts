export class Post {
<<<<<<< HEAD
  constructor(
    public _id: string,
    public userPost: {
      _id: string;
      name: string;
      username: string;
      avatar: string;
    },
    public content: string,
    public timeCreated: Date,
    public comments: any,
    public likes: string[],
    public retweets: string[],
    public images?: string[]
  ) {}
}

/* interface Comment {
  name: string;
  username: string;
  avatar: string;
  timeCreated: Date;
  content: string;
} */
=======
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
>>>>>>> prod
