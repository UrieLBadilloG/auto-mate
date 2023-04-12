import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// guards
// import * as fromGuards from '../../common/guards';
import { ReservationComponent } from './components/reservation.component';

const routes: Routes = [
    {
        path: '',
        // canActivate: [fromGuards.AuthGuard],
        component: ReservationComponent
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReservationRoutingModule {}
