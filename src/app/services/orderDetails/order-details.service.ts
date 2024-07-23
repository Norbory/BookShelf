import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetails } from '../../types/orderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  private AppUrl = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  // Get all orders details
  getOrdersDetails(): Observable<any> {
    return this.http.get(this.AppUrl + 'orderDetails');
  }

  // Get order by id
  getOrderDetailById(id: string): Observable<any> {
    return this.http.get(this.AppUrl + 'orderDetails/' + id);
  }

  // Create order
  createOrderDetail(order: OrderDetails): Observable<any> {
    return this.http.post(this.AppUrl + 'orderDetails', order);
  }
}