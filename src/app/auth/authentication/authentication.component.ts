import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthServiceService } from "../auth-service.service";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.css"],
})
export class AuthenticationComponent implements OnInit {
  form: FormGroup;
  form1: FormGroup;
  constructor(private route: Router, private authService: AuthServiceService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] }),
      user: new FormControl("", { validators: [Validators.required] }),
    });

    this.form1 = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    this.authService.saveUser(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password,
      this.form.value.user
    );
    this.authService.saved = true;
    this.form.reset();
    // this.route.navigate(["/login/normal"]);
  }

  login() {
    this.authService.login(this.form1.value.email, this.form1.value.password);
    this.form.reset();
  }
}
