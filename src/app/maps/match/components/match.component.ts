import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Shared } from 'src/shared';

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
})
export class MatchComponent implements OnInit {

    tripDetails: any = {
        start_address: '',
        end_address: '',
        distance: '',
        duration: '',
        price: ''
    };

    users: any = [];

    constructor(private shared: Shared) { }

    ngOnInit(): void {

        this.tripDetails = { ...this.shared.tripDetails };

        this.users = [
            { name: 'amy elsner', image: 'assets/avatar/amyelsner.png', stars: 4, selected: false },
            { name: 'anna fali', image: 'assets/avatar/annafali.png', stars: 3.5, selected: false },
            { name: 'asiyaja vayant', image: 'assets/avatar/asiyajavayant.png', stars: 4.5, selected: false },
            { name: 'bernardo dominic', image: 'assets/avatar/bernardodominic.png', stars: 5, selected: false },
            { name: 'elwin sharvill', image: 'assets/avatar/elwinsharvill.png', stars: 4, selected: false },
            { name: 'ioni bowcher', image: 'assets/avatar/ionibowcher.png', stars: 3, selected: false },
            { name: 'ivan magalhaes', image: 'assets/avatar/ivanmagalhaes.png', stars: 4.5, selected: false },
            { name: 'onya malimba', image: 'assets/avatar/onyamalimba.png', stars: 4, selected: false },
            { name: 'stephen shaw', image: 'assets/avatar/stephenshaw.png', stars: 4.5, selected: false },
            { name: 'xuxue feng', image: 'assets/avatar/xuxuefeng.png', stars: 5, selected: false },
        ]

    }

    returnStars(stars: number) {
        const arrayStars = [];

        const half = stars % 1;
        stars = stars - half;
        let regular = 5 - stars;
        const solid = 5 - regular;

        for (let index = 0; index < solid; index++) {
            arrayStars.push({class: 'fa-solid fa-star'});
        }

        if (half > 0) {
            arrayStars.push({class: 'fa-regular fa-star-half-stroke'});
            regular--;
        }

        for (let index = 0; index < regular; index++) {
            arrayStars.push({class: 'fa-regular fa-star'});
        }
        return arrayStars;

    }

    selectUser(item: any) {
        item.selected = !item.selected;
    }

}
