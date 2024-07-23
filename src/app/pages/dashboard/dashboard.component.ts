import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
// Types
import { Book } from '../..//types/book';
import { Preorder } from '../../types/preorder';
import { Client } from '../../types/client';
import { Order } from '../../types/order';
import { OrderDetails } from '../../types/orderDetails';
// UI Components
import { BookCardComponent } from "../../UI/book-card/book-card.component";
// UI Sheets
import { BrnSheetContentDirective, BrnSheetTriggerDirective } from '@spartan-ng/ui-sheet-brain';
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetDescriptionDirective,
  HlmSheetFooterComponent,
  HlmSheetHeaderComponent,
  HlmSheetTitleDirective,
} from '@spartan-ng/ui-sheet-helm';
// UI Avatar
import { HlmAvatarImageDirective, HlmAvatarComponent, HlmAvatarFallbackDirective } from '@spartan-ng/ui-avatar-helm';
import { PreorderItemComponent } from '../../UI/Preorder/preorder-item/preorder-item.component';
// UI Dialog
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';

// Services
import { BookServices } from '../../services/book/book-services.service';
import { ClientService } from '../../services/client/client.service';
// Pipes
import { BookPipe } from '../../pipes/book.pipe';
import { BookNamePipe } from '../../pipes/book-name.pipe';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order/order.service';
import { OrderDetailsService } from '../../services/orderDetails/order-details.service';

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
    HlmAvatarFallbackDirective,
    BookPipe,
    BookNamePipe,
    FormsModule,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    ReactiveFormsModule,
    HlmToasterComponent
  ],
})
export class DashboardComponent implements OnInit{
  filterISBN = '';
  filterName = '';
  constructor(
    private _BookServices: BookServices,
    private _ClientService: ClientService,
    private _OrderService: OrderService,
    private _OrderDetailsService: OrderDetailsService
  ) { }

  ngOnInit() {
    this.getBooks();
  }

  // Variables
  booksDB: Book[] = [];
  clientDB: Client[] = [];
  preorder: Preorder[] = [];
  doc_type: number = 0;
  doc_number: string = '';
  response: string = '';
  total: number = 0;
  desplegar: boolean = false;
  opcionFilter: string = 'ISBN';

  // Variables for client
  choose: boolean = false;
  client_doc_type: number = 0;

  // Form
  form = new FormGroup({
    c_doc_type: new FormControl('', Validators.required),
    c_doc_number: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^\d+$/)]),
    c_first_name: new FormControl('', Validators.required),
    c_last_name: new FormControl('', Validators.required),
    c_phone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^\d+$/)]),
    c_email: new FormControl('', [Validators.required, Validators.email]),
    doc_number: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(20), Validators.pattern(/^\d+$/)]),
    doc_type: new FormControl('', Validators.required),
  });

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

  // Create order
  createOrder() {
    let order: Order = {
      client_id: this.clientDB[0].client_id,
      total: this.total,
      doc_type: this.doc_type,
      doc_number: this.doc_number
    };
    this._OrderService.createOrder(order).subscribe(
      (data: any) => {
        if (data) {
          console.log("Order created");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Create order details
  createOrderDetails() {
    this.preorder.forEach(preorder => {
      let orderDetail: OrderDetails = {
        order_id: 1,
        book_id: preorder.Book.book_id,
        detail_price: preorder.Book.current_price,
        quantity: preorder.quantity
      };
      this._OrderDetailsService.createOrderDetail(orderDetail).subscribe(
        (data: any) => {
          if (data) {
            console.log("Order detail created");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  // Update book
  updateBook() {
    this._BookServices.updateBook(this.preorder[0].Book.stock-this.preorder[0].quantity,this.preorder[0].Book.book_id).subscribe(
      (data: string) => {
        if (data) {
          this.response = data;
        } else {
          console.log("Book not updated");
        }
      },
      (error) => {
        console.log(error);
      }
    );
    // this.preorder.forEach(pre => {
    //   this._BookServices.updateBook(pre.Book.stock - pre.quantity, pre.Book.book_id).subscribe(
    //     (data: string) => {
    //       if (data) {
    //         this.response = data;
    //       } else {
    //         console.log("Book not updated");
    //       }
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // });
  }

  // Get client by doc_number
  getClientByDocNumber(doc_number: string) {
    this._ClientService.getClientByDocNumber(doc_number).subscribe(
      (data: Client[]) => {
        this.clientDB = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Add client
  addClient() {
    const client = {doc_type: this.form.value.c_doc_type || '',}
    this.client_doc_type = client.doc_type === 'DNI' ? 1 : client.doc_type === 'RUC' ? 2 : 3;
    const newClient = {
      doc_type: this.client_doc_type,
      doc_number: this.form.value.c_doc_number || '000000000',
      first_name: this.form.value.c_first_name || 'John',
      last_name: this.form.value.c_last_name || 'Doe',
      phone: this.form.value.c_phone || '000000000',
      email: this.form.value.c_email || '',
    }
    this._ClientService.createClient(newClient).subscribe(
      (data: Client[]) => {
        this.clientDB = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Add preorder wrapper
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
      this.total = parseFloat(this.preorder.reduce((acc, preorder) => acc + preorder.quantity*preorder.Book.current_price, 0).toFixed(2));
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
      this.total = parseFloat(this.preorder.reduce((acc, preorder) => acc + preorder.quantity*preorder.Book.current_price, 0).toFixed(2));
    }
  }

  // Increase quantity wrapper
  increaseQuantityWrapper(book_id: number) {
    return () => {this.increaseQuantity(book_id)};
  }

  // Increase quantity
  increaseQuantity(book_id: number) {
    const book: Book = this.booksDB.find(book => book.book_id === book_id)!;
    let index = this.preorder.findIndex(preorder => preorder.Book.book_id === book_id);
    if (index !== -1){
      if (book.stock > this.preorder[index].quantity){
        this.preorder[index].quantity++;
        this.total = parseFloat(this.preorder.reduce((acc, preorder) => acc + preorder.quantity*preorder.Book.current_price, 0).toFixed(2));
      }
    }
  }

  // Decrease quantity wrapper
  decreaseQuantityWrapper(book_id: number) {
    return () => {this.decreaseQuantity(book_id)};
  }

  // Decrease quantity
  decreaseQuantity(book_id: number) {
    let index = this.preorder.findIndex(preorder => preorder.Book.book_id === book_id);
    if (index !== -1){
      if (this.preorder[index].quantity > 1){
        this.preorder[index].quantity--;
        this.total = parseFloat(this.preorder.reduce((acc, preorder) => acc + preorder.quantity*preorder.Book.current_price, 0).toFixed(2));
      }
    }
  }

  // Display filter options
  displayFilter() {
    this.desplegar = !this.desplegar;
  }

  // Cambiar opción de filtrado
  changeOption(option: string) {
    this.opcionFilter = option;
    this.desplegar = !this.desplegar;
  }

  // Update doc number and doc type
  updateDetails() {
    if(!this.choose){
      this.getClientByDocNumber(this.form.value.c_doc_number!);
    } else {
      this.addClient();
    }
    const details = {
      doc_type: this.form.value.doc_type || 'Boleta',
      doc_number: this.form.value.doc_number || '000000000000'
    };  
    this.doc_type = details.doc_type === 'Factura' ? 2 : 1;
    this.doc_number = details.doc_number;
  }

  // Buy books
  buybooks() {
    this.createOrder();
    this.createOrderDetails();
    this.updateBook();
    this.showToastBuy();
    this.preorder = [];
    this.total = 0;
    console.log("Books bought");
  }

  //Show toast
  showToast() {
    toast('Customer details has been updated', {
      description: 'You can now buy the books',
      action: {
        label: 'More',
        onClick: () => console.log(this.clientDB[0]),
      }
    })
  }

  // Toast for buying books
  showToastBuy() {
    toast('Books bought', {
      description: 'You can see the details in the orders section',
      action: {
        label: 'Check',
        onClick: () => console.log(this.preorder),
      }
    })
  }
}