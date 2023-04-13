import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-driving',
  templateUrl: './driving.component.html',
  styleUrls: ['./driving.component.css']
})
export class DrivingComponent implements OnInit {
  @Input() engineOnText: {on: string, off: string} = {on: 'Apagar Auto', off: 'Encender Auto'};
  @Input() doorOpenText: {open: string, close: string} = {open: 'Abrir Auto', close: 'Cerrar Auto'};

  engineOn: boolean = false;
  doorOpen: boolean = false;

  @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  toggleEngine(): void {
    this.engineOn = !this.engineOn;
  }

  toggleDoor(): void {
    this.doorOpen = !this.doorOpen;
  }

  playVideo(): void {
    const player = this.videoPlayer.nativeElement as HTMLVideoElement;
    player.currentTime = 222;
    player.play();
  }
}
