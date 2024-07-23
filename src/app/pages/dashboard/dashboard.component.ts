import { Component, OnInit } from '@angular/core';
import { BookCardComponent } from "../../UI/book-card/book-card.component";
import { RouterModule } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Book } from '../..//types/book';
import { BrnSheetContentDirective, BrnSheetTriggerDirective } from '@spartan-ng/ui-sheet-brain';
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetDescriptionDirective,
  HlmSheetFooterComponent,
  HlmSheetHeaderComponent,
  HlmSheetTitleDirective,
} from '@spartan-ng/ui-sheet-helm';
import { BookServices } from '../../services/book-services.service';

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
    RouterModule,
    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetDescriptionDirective,
    HlmSheetFooterComponent,
    HlmSheetHeaderComponent,
    HlmSheetTitleDirective,
    BrnSheetContentDirective,
    BrnSheetTriggerDirective,
  ],
})
export class DashboardComponent implements OnInit{
  constructor(private _BookServices: BookServices) { }

  ngOnInit() {
    this.getBooks();
  }

  booksDB: Book[] = [];

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



}