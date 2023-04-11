import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { AppMainComponent } from './app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { AppLoginComponent } from './pages/app.login.component';
import { ValidarSesion } from 'src/core/guards/validar-sesion';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                canActivate: [ValidarSesion],
                children: [
                    { path: '', component: DashboardDemoComponent },
                    // Mapas
                    { path: 'maps/test', loadChildren: () => import('./maps/test/test.module').then(m => m.TestModule) },
                    { path: 'maps/generate', loadChildren: () => import('./maps/generateRoute/test.module').then(m => m.GenerateRouteModule) },

                ]
            },
            { path: 'error', component: AppErrorComponent },
            { path: 'access', component: AppAccessdeniedComponent },
            { path: 'notfound', component: AppNotfoundComponent },
            { path: 'login', component: AppLoginComponent },
            { path: '**', redirectTo: '/login' },
        ], { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
