import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrivingComponent } from './components/driving.component';

const routes: Routes = [
    {
        path: '',
        component: DrivingComponent
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DrivingRoutingModule {}
