import { Component, Input } from '@angular/core';

@Component({
    selector: 'lazy-loader',
    template: `<img *ngIf="!loaded" src="assets/imgs/wp.png"/>
  <img [hidden]="!loaded" (load)="loaded = true" [src]="src"/>`
})
export class LazyLoader {
    @Input() src;
}