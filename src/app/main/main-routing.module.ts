import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children:[{
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: 'dashboard',
      loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
    },
    {
      path: 'patient',
      loadChildren: () => import('../patient/patient.module').then( m => m.PatientPageModule)
    },
    {
      path: 'treatment',
      loadChildren: () => import('../treatment/treatment.module').then( m => m.TreatmentPageModule)
    },
    {
      path: 'billing',
      loadChildren: () => import('../billing/billing.module').then( m => m.BillingPageModule)
    },
    {
      path: 'summary',
      loadChildren: () => import('../summary/summary.module').then( m => m.SummaryPageModule)
    },
    {
      path: 'print',
      loadChildren: () => import('../print/print.module').then( m => m.PrintPageModule)
    },
   
    ]
    
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class MainPageRoutingModule {}
