import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// guards
// import * as fromGuards from '../../common/guards';
import { TestComponent } from './components/test.component';

const routes: Routes = [
    {
        path: '',
        // canActivate: [fromGuards.AuthGuard],
        component: TestComponent
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestRoutingModule {}
