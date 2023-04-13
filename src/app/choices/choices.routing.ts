import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChoicesComponent } from './components/choices.component';

const routes: Routes = [
    {
        path: '',
        component: ChoicesComponent
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChoicesRoutingModule {}
