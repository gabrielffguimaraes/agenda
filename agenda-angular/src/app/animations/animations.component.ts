import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.css'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in')),
    ])
  ]
})
export class AnimationsComponent implements OnInit {
  show = false;
  constructor() { }

  get stateName() {
    return this.show ? 'show' : 'hide';
  }
  toogle() {
    event.stopPropagation();
    event.preventDefault();
    this.show = !this.show;
  }
  ngOnInit(): void {
  }

}
