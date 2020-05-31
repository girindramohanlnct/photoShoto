import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class NormalUserService {
  constructor(private http: HttpClient) {}

  getImages() {
    this.http.get("");
  }
}
