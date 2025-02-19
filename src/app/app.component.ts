import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  template: `
    <main>
      <header class="brand-name" style="display: flex; justify-content: space-between;">
        <a [routerLink]="['/']">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
        </a>
        <a [routerLink]="['/form']">
          Register new House
        </a>
      </header>

      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
}