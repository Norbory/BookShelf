import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    NgIf, 
    RouterModule,
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  @Input() id: number | undefined = 0;
  @Input() isbn: string | undefined;
  @Input() nombre: string | undefined;
  @Input() autor: string | undefined;
  @Input() stock: number | undefined = 0;
  @Input() price: number | undefined = 0;
  @Input() url: string | undefined;
  @Input() addPreorder: Function = () => {};
}
