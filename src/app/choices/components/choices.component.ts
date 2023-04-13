import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { Shared } from 'src/shared';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
})
export class ChoicesComponent implements OnInit {

  constructor(private router: Router, private shared: Shared) {}

  ngOnInit(): void {

  }

  opcion(opt: number) {
    this.router.navigateByUrl('/reservation');
  }

}
