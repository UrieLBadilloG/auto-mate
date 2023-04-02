import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
})
export class GenerateRouteComponent implements OnInit {

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

    location: any = { lat: 48.8584, lng: 2.2945 };

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

            this.markerPositions.push({ ...this.location });
        });


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
        /* const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
          // eslint-disable-next-line no-undef
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              resolve(results[0].geometry.location.toJSON());
            } else {
              reject("No se encontraron resultados.");
            }
          } else {
            reject("Geocoder falló debido a: " + status);
          }
        }); */
    }

    getNearestStreetAddress() {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: { ...this.location } }, (results, status) => {
            // eslint-disable-next-line no-undef
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[0]) {
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

}
