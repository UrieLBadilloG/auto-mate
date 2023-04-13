import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as moment from 'moment';

import { MapDirectionsService } from '@angular/google-maps';
import { Router } from '@angular/router';
import { Shared } from 'src/shared';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
})
export class ReservationComponent implements OnInit {

    apiKey: string = environment.apiKey;
    apiLoaded: Observable<boolean>;
    testInit: boolean = false;
    textFieldReady: boolean = false;
    options: google.maps.MapOptions = {
        center: { lat: 48.8584, lng: 2.2945 },
        zoom: 4,
        streetViewControl: false,
        mapTypeControl: false

    };

    showDirections: boolean = false;
    directionsResults$: Observable<google.maps.DirectionsResult | undefined>;
    directionsOptions: google.maps.DirectionsRendererOptions = {
        markerOptions: {
            draggable: false,
            clickable: false,
            icon: { url: './assets/map/marker.png' }
        }
    }

    markerOptions: google.maps.MarkerOptions = { draggable: false };
    markerPositions: google.maps.LatLngLiteral[] = [];

    markerCarsOptions: google.maps.MarkerOptions = {
        draggable: false,
        clickable: true,
        icon: { url: './assets/map/car.png' }
    };
    markerCars: google.maps.LatLngLiteral[] = [];

    location: any = { lat: 48.8584, lng: 2.2945 };
    tempLocation: any = null;
    currentLocation: string = '';
    toLocation: string = '';

    date: any;
    time: any;

    display: boolean = false;
    displayDetails: boolean = false;
    carpool: boolean = false;

    directionsRequest: any;
    tripDetails: any = {
        start_address: '',
        end_address: '',
        distance: '',
        duration: '',
        price: ''
    };

    paymentMethods: any[] = [
        { label: 'Tarjeta', icon: 'fa-solid fa-money-check', type: 1 },
        { label: 'PayPal', icon: 'fa-brands fa-paypal', type: 2 },
        { label: 'Google Pay', icon: 'fa-brands fa-google-pay', type: 3 },
        { label: 'Apple Pay', icon: 'fa-brands fa-apple-pay', type: 4 },
    ];

    payment: any = {
        name: '',
        lastName: '',
        creditCard: '',
        expirationDate: '',
        pin: '',
        type: 1
    };

    constructor(httpClient: HttpClient, private mapDirectionsService: MapDirectionsService, private router: Router, private shared: Shared) {
        this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?libraries=places&key=${this.apiKey}`, 'callback')
            .pipe(
                map(() => {
                    setTimeout(() => {
                        this.ready();
                    }, 400);
                    return true
                }),
                catchError(() => of(false)),
            )
    }

    ngOnInit(): void {
        this.testInit = true;
        this.getCurrentLocation().then((position: any) => {
            // console.log('position', position);
            this.location = { lat: position.coords.latitude, lng: position.coords.longitude };
            /* this.options.center = { ...this.location };
            this.options.zoom = 17; */

            this.options = {
                center: { ...this.location },
                zoom: 17,
                streetViewControl: false,
                mapTypeControl: false
            };

            setTimeout(() => {
                this.getStreetAddress();
                this.ready();
            }, 400);
            this.markerPositions.push({ ...this.location });
        });

        this.date = new Date();
        this.time = moment().format('hh:mm');
    }

    ready() {
        if (this.apiLoaded && this.testInit && !this.textFieldReady) {
            try {
                const { lat, lng } = this.location;
                var defaultBounds = new google.maps.LatLngBounds(
                    new google.maps.LatLng(lat, lng));


                const inputOrigin: any = document.getElementById('origin');
                // console.log('in', inputOrigin)
                const searchBox1 = new google.maps.places.SearchBox(inputOrigin, {
                    bounds: defaultBounds
                });


                const inputDestination: any = document.getElementById('destination');
                // console.log('in', inputDestination)
                const searchBox2 = new google.maps.places.SearchBox(inputDestination, {
                    bounds: defaultBounds
                });

                this.textFieldReady = true;

            } catch (error) {
                console.log('grave error', error)
            }
        }
    }

    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    setCurrentLocation() {
        this.getCurrentLocation().then((position: any) => {
            // console.log('position', position);
            this.location = { lat: position.coords.latitude, lng: position.coords.longitude };

            this.options = {
                center: { ...this.location },
                zoom: 16,
                streetViewControl: false,
                mapTypeControl: false
            };

            this.getStreetAddress();
            this.markerPositions = [{ ...this.location }];
        });
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
                    'Error al obtener la dirección de la calle más cercana: ',
                    error
                );
            }
        }
        this.options = {
            center: { ...this.location },
            zoom: 16,
            streetViewControl: false,
            mapTypeControl: false
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
                    /* console.log({
                        address: results[0].formatted_address,
                        location: results[0].geometry.location.toJSON(),
                    }); */
                } else {
                    console.log('No se encontraron resultados.');
                }
            } else {
                console.log('Geocoder falló debido a:', status);
            }
        });
    }

    autoComplete() {
        try {
            const autocompleteService = new google.maps.places.AutocompleteService();
            // console.log('peticion', { input: this.toLocation })

            autocompleteService.getPlacePredictions({ input: this.toLocation }, (result, status) => {
                /* console.log('resultado', result);
                console.log('estado', status); */
            })
        } catch (error) {
            console.log('error autoComplete', error)
        }

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
                        reject('No se encontraron resultados.');
                    }
                } else {
                    reject('Geocoder falló debido a: ' + status);
                }
            });
        });
    }

    handleMarkerClick(location: any) {
        const latLng = location.latLng;
        const loc = { lat: latLng.lat(), lng: latLng.lng() };
        // console.log('Vamos a salir de aqui', loc);
        this.location = { ...loc };
        this.getStreetAddress();
    }

    calcularRuta() {
        const searchTextField: any = document.getElementById('destination')
        this.toLocation = searchTextField.value;
        // console.log('calcularRuta', this.toLocation);


        if (this.currentLocation === '' || this.toLocation === '') {
            return;
        }

        this.markerPositions = [];
        this.markerCars = [];

        const request: google.maps.DirectionsRequest = {
            destination: this.currentLocation,
            origin: this.toLocation,
            travelMode: google.maps.TravelMode.DRIVING
        };

        this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => {

            this.directionsRequest = response.result;
            // console.log('response.result', response.result);
            this.showDirections = true;
            return response.result
        }));

    }

    pagarViaje() {
        this.display = true;
    }

    detalles() {
        const detail: any = this.directionsRequest.routes[0].legs[0];

        this.tripDetails = {
            start_address: detail.start_address,
            end_address: detail.end_address,
            distance: detail.distance.text,
            duration: detail.duration.text,
            price: (detail.distance.value * detail.duration.value) * .0000225
        }

        if (this.carpool) {
            this.shared.tripDetails = { ...this.tripDetails };
            this.router.navigateByUrl('/match');
        } else {
            this.displayDetails = true;
        }
    }

}
