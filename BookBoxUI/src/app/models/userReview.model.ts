export class UserReview{
  public username:string;
  public review:string;
  public reviewDate:string;

  constructor(username:string, review:string, reviewDate:string) {
    this.username = username;
    this.review = review;
    this.reviewDate = reviewDate;
  }
}
