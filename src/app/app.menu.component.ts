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
            { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/'] },
            {
                label: 'Mapas', icon: 'fa-solid fa-map-location-dot', items: [
                    { label: 'Inicial', icon: 'fa-solid fa-street-view', routerLink: ['/maps/test'] },
                ]
            },
        ];
    }
}
