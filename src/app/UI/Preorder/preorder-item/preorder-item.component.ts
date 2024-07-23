import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Book } from '../../../types/book';
@Component({
  selector: 'app-preorder-item',
  standalone: true,
  imports: [NgIf],
  templateUrl: './preorder-item.component.html',
  styleUrl: './preorder-item.component.css'
})
export class PreorderItemComponent {
  @Input() book: Book | undefined;
  @Input() quantity: number = 1;
  @Input() remove: Function = () => {};
  @Input() addBooks: Function = () => {};
  @Input() decreaseBooks: Function = () => {};
}
