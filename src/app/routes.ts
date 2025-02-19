import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
import { FormHousingComponent } from './form-housing/form-housing.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details',
  },
  {
    path: 'form',
    component: FormHousingComponent,
    title: 'Form page',
  }
];
export default routeConfig;