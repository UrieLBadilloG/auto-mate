import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shared } from 'src/shared';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private shared: Shared) {}

    ngOnInit(): void {}

    login() {
        this.shared.login = true;
        this.router.navigateByUrl('/');
    }

}
