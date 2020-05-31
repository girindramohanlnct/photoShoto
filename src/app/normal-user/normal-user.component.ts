import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-normal-user",
  templateUrl: "./normal-user.component.html",
  styleUrls: ["./normal-user.component.css"],
})
export class NormalUserComponent implements OnInit {
  isClicked = false;
  images;
  img;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http
      .get<{ data: [] }>("http://localhost:3000/image")
      .subscribe((images) => {
        // console.log("FIRST %%%%%%%% ", images);
        this.images = images.data;
        // console.log("FIRST %%%%%%%% ", this.images[0]);
      });
    // console.log(this.images);
  }

  show(image: { id: Number, category: string, userName: string, downloads: Number, imageURL: string }) {
    this.img = image;
    this.isClicked = !this.isClicked;
  }

  downloads(imageId: Number) {
    this.http
      .get<{ image }>("http://localhost:3000/image/" + imageId).subscribe(response => {
        console.log(response);
        this.img = response.image;
        this.http
          .get<{ data: [] }>("http://localhost:3000/image")
          .subscribe((images) => {
            this.images = images.data;
          });
      })
  }

  search(search: string) {
    this.http
      .get<{ images: [] }>("http://localhost:3000/image/search/" + search)
      .subscribe((res) => {
        this.images = res.images;
      });
  }

}
