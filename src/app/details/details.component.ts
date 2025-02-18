import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
          <li>Does this location have security: {{ housingLocation?.security }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" required/>
          <p *ngIf="applyForm.get('firstName')?.invalid && (applyForm.get('firstName')?.touched)"
            style="color: red; margin-bottom: 10px">
            First name is obligatory
          </p>


          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" required/>
          <p *ngIf="applyForm.get('lastName')?.invalid && (applyForm.get('lastName')?.touched)"
            style="color: red; margin-bottom: 10px">
            Last name is obligatory
          </p>

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <p *ngIf="applyForm.get('email')?.invalid && (applyForm.get('email')?.touched)"
            style="color: red; margin-bottom: 10px">
            Email is obligatory / Invalid format
          </p>
          
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(localStorage.getItem('firstName'), Validators.required),
    lastName: new FormControl(localStorage.getItem('lastName'), Validators.required),
    email: new FormControl(localStorage.getItem('email'), Validators.email),
  });
  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication() {
    if (this.applyForm.valid) {
      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? '',
      );

      localStorage.setItem('firstName', this.applyForm.value.firstName ?? '');
      localStorage.setItem('lastName', this.applyForm.value.lastName ?? '');
      localStorage.setItem('email', this.applyForm.value.email ?? '');
    }
  }
}