import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateUserInterface, Teacher, User} from '../interfaces/app.interface';
import {config} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) {}

  public getUsers(): Observable<CreateUserInterface[]> {
    return this.httpClient.get<CreateUserInterface[]>(config.API.USER_CREATE);
  }

  public getTeacherCount(): Observable<number> {
    return this.httpClient.get<number>(config.API.TEACHERS_GET_COUNT);
  }

  public getTeachers(
    substring: string = '',
    department: string = '',
    faculty: string = '',
    limit: number = 5,
    offset: number = 0, ): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(`
    ${config.API.TEACHERS_GET_QUERY}?limit=${limit}&search=${substring}&offset=${offset}&department=${department}&faculty=${faculty}`);
  }

  public createUser(user: CreateUserInterface): Observable<CreateUserInterface> {
    return this.httpClient.post<CreateUserInterface>(config.API.USER_CREATE, user);
  }

  public removeUser(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${config.API.USER_CREATE}/${id}`);
  }

  public updateUser(user: any): Observable<any> {
    return this.httpClient.put<any>(config.API.USER_UPDATE, user);
  }

  public updateUserData(userData: any): Observable<any> {
    return this.httpClient.put<any>(config.API.USER_DATA_UPDATE, userData);
  }
}
