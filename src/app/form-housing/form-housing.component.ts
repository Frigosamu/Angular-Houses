import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-form-housing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="housingForm" (ngSubmit)="onSubmit()" style="display: grid">
      <label for="name">Name</label>
      <input id="name" formControlName="name" />

      <label for="city">City</label>
      <input id="city" formControlName="city" />

      <label for="state">State</label>
      <input id="state" formControlName="state" />

      <label for="availableUnits">Available Units</label>
      <input id="availableUnits" formControlName="availableUnits" type="number" />

      <label for="wifi">WiFi</label>
      <input id="wifi" formControlName="wifi" type="checkbox" />

      <label for="laundry">Laundry</label>
      <input id="laundry" formControlName="laundry" type="checkbox" />

      <div formGroupName="coordinates">
        <label for="latitude">Latitude</label>
        <input id="latitude" formControlName="latitude" type="number" />

        <label for="longitude">Longitude</label>
        <input id="longitude" formControlName="longitude" type="number" />
      </div>

      <label for="security">Security</label>
      <select id="security" formControlName="security">
        <option *ngFor="let option of securityOptions" [value]="option">{{ option }}</option>
      </select>

      <button type="submit" [disabled]="housingForm.invalid">Register House</button>
    </form>
  `,
  styles: []
})
export class FormHousingComponent {
  housingForm: FormGroup;
  securityOptions = ["Cameras", "Reinforced Doors", "Smoke Detectors", "Alarm System"];

  constructor(private fb: FormBuilder, private housingService: HousingService) {
    this.housingForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      availableUnits: [0, [Validators.required, Validators.min(0)]],
      wifi: [false],
      laundry: [false],
      coordinates: this.fb.group({
        latitude: [0, Validators.required],
        longitude: [0, Validators.required]
      }),
      security: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.housingForm.valid) {
      const newHouse = this.housingForm.value;
      await this.housingService.addHousingLocation(newHouse);
      this.housingForm.reset();
      alert('House registered successfully!');
    }
  }
}
