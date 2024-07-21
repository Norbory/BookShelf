import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Book } from '../..//types/book';
import { BookServices } from '../../services/book-services.service';
import * as data from '../../data/books.json' 
import { NgFor, NgIf } from '@angular/common';
import { BookCardComponent } from "../../UI/book-card/book-card.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, BookCardComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
    throw new Error('Method not implemented');
  }

  title = 'Books';

  books: Book[] = (data as any).default;
}