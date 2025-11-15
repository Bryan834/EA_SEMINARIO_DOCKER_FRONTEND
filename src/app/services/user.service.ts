import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}/user`; 
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  addUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.apiUrl, user, { headers });
  }

  updateUser(user: User): Observable<User> {
    if (!user._id) throw new Error('Falta _id del usuario a actualizar');
    return this.http.put<User>(`${this.apiUrl}/${user._id}`, user).pipe(
      tap(response => {
        const userData = (response as any).user;
        if (userData) {
          localStorage.setItem('currentUser', JSON.stringify(userData));
        }
      }
      )
    );
  }

  deleteUserById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addEventToUser(userId: string, eventId: string): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<User>(`${this.apiUrl}/${userId}/addEvent`, { eventId }, { headers });
  }
}