import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
})
export class TestComponent implements OnInit {

    apiKey: string = environment.apiKey;
    apiLoaded: Observable<boolean>;
    options: google.maps.MapOptions = {
        center: { lat: 48.8584, lng: 2.2945 },
        zoom: 4
    };

    markerOptions: google.maps.MarkerOptions = { draggable: false };
    markerPositions: google.maps.LatLngLiteral[] = [];

    constructor(httpClient: HttpClient) {
        this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`, 'callback')
            .pipe(
                map(() => true),
                catchError(() => of(false)),
            );
    }

    ngOnInit(): void {
        this.getCurrentLocation().then((position: any) => {
            console.log('position', position);
            this.options.center = { lat: position.coords.latitude, lng: position.coords.longitude };
            this.options.zoom = 17;

            this.markerPositions.push({ lat: position.coords.latitude, lng: position.coords.longitude });
        });


    }

    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

}
