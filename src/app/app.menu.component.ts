import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            { label: 'Reservación', icon: 'fa-solid fa-car-side', routerLink: ['/'] },
            { label: 'Simulador de Viaje', icon: 'fa-solid fa-route', routerLink: ['/driving'] },
            {
                label: 'Mi Cuenta', icon: 'fa-solid fa-user-gear', items: [
                    { label: 'Viajes', icon: 'fa-regular fa-rectangle-list', routerLink: ['/trips'] },
                    { label: 'Métodos de Pago', icon: 'fa-solid fa-money-check-dollar', routerLink: ['/payment'] },
                ]
            },
        ];
    }
}

