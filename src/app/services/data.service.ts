import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecordEntry } from '../models/record.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getRecords(): Observable<RecordEntry[]> {
    return this.http.get<RecordEntry[]>(`${this.apiUrl}/records`);
  }

  getRecordById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/records/${id}`);
  }
  // Get genres from list 
  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/genres`);
  }

  // Add new record 
  addRecord(record: RecordEntry): Observable<RecordEntry> {
    return this.http.post<RecordEntry>(`${this.apiUrl}/records`, record);
  }

  // Update existing record
  updateRecord(id: number, record: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/records/${id}`, record);
  }

  deleteRecord(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/records/${id}`)
  }
}