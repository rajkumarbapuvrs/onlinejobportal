import { Routes } from '@angular/router';
import { ViewJobs } from './view-jobs/view-jobs';
import { RegistrationForm } from './registration/registration';
import { LoginForm } from './login-form/login-form';
import { Home } from './home/home';
import { JobDetails } from './job-details/job-details';
import { ShowJobDetails } from './view-jobs/show-job-details/show-job-details';
import { ArticleComponent } from './article/article';
export const routes: Routes = [

  {
    path:'login',
    component:LoginForm
  },
  {
    path:'registration',
    component:RegistrationForm
  },
   {
    path:'article',
    component:ArticleComponent
  },
  {
    path:'view-jobs',
    component: ViewJobs
  },
{
    path:'job-details',
    component: ShowJobDetails
  }
];