import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserRequest } from '../../models/user-request';

@Injectable({
  providedIn: 'root',
})
export class User {
  private readonly apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  createUser(userData: UserRequest) {
    return this.http.post<any>(`${this.apiUrl}/users`, userData);
  }

  getAllUsers() {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getUsersByName(name: string) {
    return this.http.get<any[]>(`${this.apiUrl}/users/name/${name}`);
  }

  getUserById(idUser: string) {
    return this.http.get<UserRequest>(`${this.apiUrl}/users/${idUser}`)
  }

  updateUser(idUser: string, userData: UserRequest) {
    return this.http.put(`${this.apiUrl}/users/${idUser}`, userData);
  }

  deleteUser(idUser: string) {
    return this.http.delete(`${this.apiUrl}/users/${idUser}`);
  }

  getAllEngineers() {
    return this.http.get<any[]>(`${this.apiUrl}/users/role/engineer`);
  }
}
