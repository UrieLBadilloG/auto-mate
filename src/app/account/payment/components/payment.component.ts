import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.css']
})
export class PaymentComponent implements OnInit {

    visible: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    newCard() {
        this.visible = true;
    }

    simulateApplePay() {
        console.log('Simulando Apple Pay...');
        // Implementa la lógica necesaria aquí
    }

    simulateGooglePay() {
        console.log('Simulando Google Pay...');
        // Implementa la lógica necesaria aquí
    }

    simulatePayPal() {
        console.log('Simulando PayPal...');
        // Implementa la lógica necesaria aquí
    }
}
