import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ContributorService {
  constructor(private http: HttpClient) {}

  saveImage(imageName: string, image: File, category: string) {
    console.log("SAve Service");
    const postData = new FormData();
    postData.append("imageName", imageName);
    postData.append("imageURL", image);
    postData.append("catogery", category);
    this.http
      .post<{ imageName: string; userId: Number; message: string }>(
        "http://localhost:3000/image/save",
        postData
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
