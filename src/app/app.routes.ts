import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { StatisticsComponent } from './components/statistics/statistics';

export const routes: Routes = [
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
 { path: 'dashboard', component: Dashboard },
 { path: 'statistics' , component : StatisticsComponent}

//   { path: 'users', component: Users },
//   { path: 'reports', component: Reports },
//   { path: 'settings', component: Settings },
//   { path: 'login', component: Login },
];
