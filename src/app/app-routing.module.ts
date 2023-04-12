import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { ValidarSesion } from 'src/core/guards/validar-sesion';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                canActivate: [ValidarSesion],
                children: [
                    { path: '', loadChildren: () => import('./maps/reservation/reservation.module').then(m => m.ReservationModule) },
                    { path: 'payment', loadChildren: () => import('./account/payment/payment.module').then(m => m.PaymentModule) },
                    { path: 'driving', loadChildren: () => import('./blank/blank.module').then(m => m.BlankModule) },
                    { path: 'trips', loadChildren: () => import('./blank/blank.module').then(m => m.BlankModule) },

                ]
            },
            { path: 'error', component: AppErrorComponent },
            { path: 'access', component: AppAccessdeniedComponent },
            { path: 'notfound', component: AppNotfoundComponent },
            { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
            { path: '**', redirectTo: '/login' },
        ], { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
