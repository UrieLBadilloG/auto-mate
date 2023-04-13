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
  videoPlaying: boolean = false;

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
    this.videoPlaying = true;
    setTimeout(() => {
        const player = this.videoPlayer.nativeElement as HTMLVideoElement;
        player.currentTime = 222;
        player.play();
    }, 400);
  }
  getVideoPath(): string {
    return 'assets/driving.mp4';
  }

}
