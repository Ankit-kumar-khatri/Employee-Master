import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataFormat } from './dataFormat';

@Injectable({
  providedIn: 'root',
})
export class UserService {
 private API_BASE_PATH: string = 'http://localhost:4200/api/';
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.API_BASE_PATH + 'userData');
  }

  getUserById(id: number) {
    return this.http.get(`${this.API_BASE_PATH}userData/${id}`);
  }

  addUser(user: DataFormat) {
    return this.http.post(`${this.API_BASE_PATH}userData`, user);
  }

  updateUser(user: DataFormat) {
    return this.http.put(`${this.API_BASE_PATH}userData/${user.id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.API_BASE_PATH}userData/${id}`);
  }
}
