import { Component, OnInit } from '@angular/core';
import { BookCardComponent } from "../../UI/book-card/book-card.component";
import { RouterModule } from '@angular/router';
import * as data from '../../data/books.json' 
import { NgFor, NgIf } from '@angular/common';
import { Book } from '../..//types/book';
// import { BookServices } from '../../services/book-services.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [NgFor, NgIf, BookCardComponent, RouterModule],
})
export class DashboardComponent implements OnInit{
  constructor() { }

  ngOnInit() {
  }

  books: Book[] = (data as any).default;
}