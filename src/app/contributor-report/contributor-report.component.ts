import { Component, OnInit } from '@angular/core';

import { AuthServiceService } from "../auth/auth-service.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contributor-report',
  templateUrl: './contributor-report.component.html',
  styleUrls: ['./contributor-report.component.css']
})
export class ContributorReportComponent implements OnInit {
  images;

  constructor(private authService: AuthServiceService, private http: HttpClient) { }

  ngOnInit() {
    const userId = this.authService.getUserId();
    console.log(userId);
    this.http
      .get<{ images: [] }>("http://localhost:3000/image/byUser/" + userId)
      .subscribe((res) => {
        this.images = res.images;
      });
  }

}
