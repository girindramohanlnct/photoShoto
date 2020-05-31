import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication/authentication.component";
import { NormalUserComponent } from "./normal-user/normal-user.component";
import { ContributorComponent } from "./contributor/contributor.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthGuard } from "../app/auth/auth-guard";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { ContributorReportComponent } from './contributor-report/contributor-report.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    NormalUserComponent,
    ContributorComponent,
    ContributorReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
