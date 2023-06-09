import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  cards: any[] = [];
  visible: boolean = false;
  exampleDirections = [
    {
      instruction: 'Sal de la ubicación actual y dirígete hacia el este',
      distance: '100 m',
    },
    {
      instruction: 'Gira a la derecha en la siguiente intersección',
      distance: '200 m',
    },
    // Agrega más indicaciones aquí
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.generateCards();
  }

  generateCards(): void {
    for (let i = 0; i < 8; i++) {
      this.cards.push({
        date: this.randomDate(new Date(2022, 0, 1), new Date()).toLocaleDateString(),
        startLocation: `Lugar ${Math.floor(Math.random() * 100)}`,
        destination: `Destino ${Math.floor(Math.random() * 100)}`,
        cost: `$${Math.floor(Math.random() * 500) + 50}`,
      });
    }
  }

  randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  openDirectionsModal(): void {
    this.visible = true;
  }

  navigateToCar(): void {
    console.log('Navegando al auto...');
    this.openDirectionsModal();
  }

  startTrip(): void {
    console.log('Iniciando viaje...');
    this.router.navigateByUrl('/driving');
  }
}
