import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationComponent } from "../app/auth/authentication/authentication.component";
import { NormalUserComponent } from "../app/normal-user/normal-user.component";
import { ContributorComponent } from "../app/contributor/contributor.component";

import { AuthGuard } from "../app/auth/auth-guard";
import { ContributorReportComponent } from './contributor-report/contributor-report.component';

const routes: Routes = [
  { path: "", component: AuthenticationComponent },
  {
    path: "login/normal",
    component: NormalUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "login/contibutor",
    component: ContributorComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "contibutor/report",
    component: ContributorReportComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
