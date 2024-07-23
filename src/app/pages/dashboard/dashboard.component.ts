import { Component, OnInit } from '@angular/core';
import { BookCardComponent } from "../../UI/book-card/book-card.component";
import { RouterModule } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Book } from '../..//types/book';
import { Client } from '../../types/client';
import { BrnSheetContentDirective, BrnSheetTriggerDirective } from '@spartan-ng/ui-sheet-brain';
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetDescriptionDirective,
  HlmSheetFooterComponent,
  HlmSheetHeaderComponent,
  HlmSheetTitleDirective,
} from '@spartan-ng/ui-sheet-helm';

import { HlmAvatarImageDirective, HlmAvatarComponent, HlmAvatarFallbackDirective } from '@spartan-ng/ui-avatar-helm';
import { BookServices } from '../../services/book/book-services.service';
import { ClientService } from '../../services/client/client.service';
import { Preorder } from '../../types/preorder';
import { PreorderItemComponent } from '../../UI/Preorder/preorder-item/preorder-item.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [
    NgClass,
    NgFor, 
    NgIf, 
    BookCardComponent,
    PreorderItemComponent,
    RouterModule,
    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetDescriptionDirective,
    HlmSheetFooterComponent,
    HlmSheetHeaderComponent,
    HlmSheetTitleDirective,
    BrnSheetContentDirective,
    BrnSheetTriggerDirective,
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective
  ],
})
export class DashboardComponent implements OnInit{
  constructor(
    private _BookServices: BookServices,
    private _ClientService: ClientService
  ) { }

  ngOnInit() {
    this.getBooks();
    this.getClientById('1');
  }

  // Variables
  booksDB: Book[] = [];
  clientDB: Client[] = [];
  preorder: Preorder[] = [];
  response: string = '';
  total: number = 0;
  // Get all books
  getBooks() {
    this._BookServices.getBooks().subscribe(
      (data: Book[]) => {
        this.booksDB = data;
      },
      (error) => {
        console.log(error);
      }    
    );
  }

  // Update book
  updateBook(id:string, stock: number) {
    this._BookServices.updateBook(id,stock).subscribe(
      (data: string) => {
        this.response = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Get client by id
  getClientById(id: string) {
    this._ClientService.getClientById(id).subscribe(
      (data: Client[]) => {
        this.clientDB = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addPreorderWrapper(book_id: number, quantity: number) {
    const book: Book = this.booksDB.find(book => book.book_id === book_id)!;
    return () => {this.addPreorder(book, quantity)};
  };

  // Add preorder
  addPreorder(book: Book, quantity: number) {
    let preorder: Preorder = {
      Book: book,
      quantity: quantity
    };
    if (this.preorder.findIndex(preorder => preorder.Book.book_id === book.book_id) === -1) {
      this.preorder.push(preorder);
      this.total = this.preorder.reduce((acc, preorder) => acc + preorder.quantity*preorder.Book.current_price, 0);
    }
  }

  // Remove preorder wrapper
  removePreorderWrapper(book_id: number) {
    return () => {this.removePreorder(book_id)};
  }

  // Remove preorder
  removePreorder(book_id: number) {
    let index = this.preorder.findIndex(preorder => preorder.Book.book_id === book_id);
    if (index !== -1){
      this.preorder.splice(index, 1);
      this.total = this.preorder.reduce((acc, preorder) => acc + preorder.quantity*preorder.Book.current_price, 0);
    }
  }

}