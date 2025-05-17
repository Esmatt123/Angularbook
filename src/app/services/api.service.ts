import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://angularbook-hdbufdg9g3cubadc.swedencentral-01.azurewebsites.net'; // Change this URL to your API's URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/api/account/login`, body); // Use the correct API URL here
  }


  registerUser(email: string, password: string, displayName: string,  userName: string, ){
    const user = { email, password, displayName,  userName, }
    return this.http.post(`${this.apiUrl}/api/account/register`, user);
  }
}