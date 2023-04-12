import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit {

    visible: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    newCard() {
        this.visible = true;
    }

}
