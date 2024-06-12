import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HolidayPackageListComponent } from './holiday-package-list/holiday-package-list.component';
import { SurveyComponent } from './survey/survey.component';
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'search', component: HolidayPackageListComponent},
    {path: 'showSurvey', component: SurveyComponent}

];
