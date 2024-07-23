import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private AppUrl = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  // Get all clients
  getClients(): Observable<any> {
    return this.http.get(this.AppUrl + 'clients');
  }

  // Get client by id
  getClientById(id: string): Observable<any> {
    return this.http.get(this.AppUrl + 'clients/' + id);
  }

  // Get client by doc_number
  getClientByDocNumber(doc_number: string): Observable<any> {
    return this.http.get(this.AppUrl + 'clients/doc/' + doc_number);
  }

  // Create client
  createClient(client: any): Observable<any> {
    return this.http.post(this.AppUrl + 'clients', client);
  }

}
