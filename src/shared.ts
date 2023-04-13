import { Injectable } from "@angular/core";

@Injectable()
export class Shared {

    login: boolean = false;

    tripDetails: any = {
        start_address: '',
        end_address: '',
        distance: '',
        duration: '',
        price: ''
    };

    blankTripDetail() {
        this.tripDetails = {
            start_address: '',
            end_address: '',
            distance: '',
            duration: '',
            price: ''
        };
    }
}
