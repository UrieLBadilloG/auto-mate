import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Shared } from 'src/shared';

@Injectable({
    providedIn: 'root'
})
export class ValidarSesion implements CanActivate {

    constructor(private router: Router, private shared: Shared) { }


    canActivate(): boolean {
        // console.log('ValidarSesion', route, state)
        if (this.shared.login) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
