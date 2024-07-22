import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  id!: number;
  isbn!: string;
  nombre!: string;
  autor!: string;
  stock!: number;
  price!: number;
  url!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.isbn = params['isbn'];
      this.nombre = params['nombre'];
      this.autor = params['autor'];
      this.stock = params['stock'];
      this.price = params['price'];
      this.url = params['url'];
    });
  }
}
