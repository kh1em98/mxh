export class Post {
  constructor(
    public _id: string,
    public userPost: {
      name: string;
      username: string;
      avatar: string;
    },
    public content: string,
    public timeCreated: Date,
    public comments: any,
    public likes: string[],
    public retweets: string[]
  ) {}
}

/* interface Comment {
  name: string;
  username: string;
  avatar: string;
  timeCreated: Date;
  content: string;
} */