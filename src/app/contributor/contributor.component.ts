import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ContributorService } from "./contributor.service";
import { mimeType } from "./mime-type.validator";
import { Router } from '@angular/router';

@Component({
  selector: "app-contributor",
  templateUrl: "./contributor.component.html",
  styleUrls: ["./contributor.component.css"],
})
export class ContributorComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;
  isForm = true;
  isReport = false;

  constructor(private contributorService: ContributorService, private route: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      imageName: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
      category: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  saveImage() {
    this.contributorService.saveImage(
      this.form.value.imageName,
      this.form.value.image,
      this.form.value.category
    );

    this.form.reset();
  }

  showReport() {
    this.route.navigate(["/contibutor/report"]);
  }
}
