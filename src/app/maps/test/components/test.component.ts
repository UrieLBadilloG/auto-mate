import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
})
export class TestComponent implements OnInit {

    apiKey: string = environment.apiKey;
    apiLoaded: Observable<boolean>;
    options: google.maps.MapOptions = {
        center: { lat: 48.8584, lng: 2.2945 },
        zoom: 4,
        streetViewControl: false,
        mapTypeControl: false

    };

    markerOptions: google.maps.MarkerOptions = { draggable: false };
    markerPositions: google.maps.LatLngLiteral[] = [];

    markerCarsOptions: google.maps.MarkerOptions = {
        draggable: false,
        clickable: true,
        icon: { url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png' }
    };
    markerCars: google.maps.LatLngLiteral[] = [];

    location: any = { lat: 48.8584, lng: 2.2945 };
    tempLocation: any = null;
    currentLocation: string = '';
    toLocation: string = '';

    date: any;
    time: any;

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
            this.location = { lat: position.coords.latitude, lng: position.coords.longitude };
            /* this.options.center = { ...this.location };
            this.options.zoom = 17; */

            this.setCurrentLocation();
            setTimeout(() => {
                this.getStreetAddress();
            }, 400);
            this.markerPositions.push({ ...this.location });
        });

        this.date = new Date();
        this.time = moment().format('hh:mm');


    }

    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    setCurrentLocation() {
        this.options = {
            center: { ...this.location },
            zoom: 17,
            streetViewControl: false,
            mapTypeControl: false
        }
    }

    buscarAutos() {
        const locations = [];
        for (let i = 0; i < 5; i++) {
            const randomCoordinate = this.getRandomCoordinate({ ...this.location }, 500);
            try {
                this.getNearestStreetAddress(randomCoordinate).then((nearestStreet: any) => {
                    // locations.push(nearestStreet.location);
                    this.markerCars.push({ ...nearestStreet.location });
                }).catch(error => {
                    console.log('buscarAutos error', error)
                });

            } catch (error) {
                console.error(
                    "Error al obtener la dirección de la calle más cercana: ",
                    error
                );
            }
        }
    }

    getRandomCoordinate = (center, radius) => {
        const y0 = center.lat;
        const x0 = center.lng;
        const rd = radius / 111300; // meters

        const u = Math.random();
        const v = Math.random();
        const w = rd * Math.sqrt(u);
        const t = 2 * Math.PI * v;
        const x = w * Math.cos(t);
        const y = w * Math.sin(t);

        const newX = x / Math.cos(y0);

        return { lat: y + y0, lng: newX + x0 };
    };


    private getStreetAddress() {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: { ...this.location } }, (results, status) => {
            // eslint-disable-next-line no-undef
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    this.currentLocation = results[0].formatted_address;
                    console.log({
                        address: results[0].formatted_address,
                        location: results[0].geometry.location.toJSON(),
                    });
                } else {
                    console.log('No se encontraron resultados.');
                }
            } else {
                console.log('Geocoder falló debido a:', status);
            }
        });
    }

    getNearestStreetAddress(latLng: any) {
        return new Promise((resolve, reject) => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: latLng }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        resolve({
                            address: results[0].formatted_address,
                            location: results[0].geometry.location.toJSON(),
                        });
                    } else {
                        reject("No se encontraron resultados.");
                    }
                } else {
                    reject("Geocoder falló debido a: " + status);
                }
            });
        });
    }

    handleMarkerClick(location: any) {
        console.log('Vamos a salir de aqui', location);
    }

}
