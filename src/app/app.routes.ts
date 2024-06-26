import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HolidayPackageListComponent } from './holiday-package-list/holiday-package-list.component';
import { SurveyComponent } from './survey/survey.component';
import { HolidayCardComponent } from './holiday-card/holiday-card.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { AttractionVisitCardComponent } from './attraction-visit-card/attraction-visit-card.component';
import { ReservedPackageComponent } from './reserved-package/reserved-package.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'search', component: HolidayPackageListComponent},
    {path: 'showSurvey', component: SurveyComponent},
    {path: 'package/:city', component: HolidayCardComponent},
    {path: 'holiday-card', component: HolidayCardComponent},
    {path: 'sign-in', component: SignInComponent},
    {path: 'login', component: LoginComponent},
    {path: 'payment', component: PaymentComponent},
    {path: 'attraction', component: AttractionVisitCardComponent},
    {path: 'reserved-package', component: ReservedPackageComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'faq', component: FaqComponent},
];
