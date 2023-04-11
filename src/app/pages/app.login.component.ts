import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Shared } from 'src/shared';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {

    constructor(private router: Router, private shared: Shared) {}

    login() {
        this.shared.login = true;
        this.router.navigateByUrl('/');
    }
}
