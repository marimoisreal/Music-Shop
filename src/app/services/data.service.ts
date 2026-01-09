import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecordEntry } from '../models/record.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private records = 'https://69610ecde7aa517cb797ea5b.mockapi.io/records';

  constructor(private http: HttpClient) { }

  getRecords(): Observable<RecordEntry[]> {
    return this.http.get<RecordEntry[]>(this.records);
  }
  getRecordById(id: any): Observable<any> {
    return this.http.get<any>(`${this.records}/${id}`);
  }

  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(`${this.records}/genres`);
  }


  addRecord(record: RecordEntry): Observable<RecordEntry> {
    return this.http.post<RecordEntry>(this.records, record);
  }


  updateRecord(id: any, record: any): Observable<any> {
    return this.http.put<any>(`${this.records}/${id}`, record);
  }


  deleteRecord(id: any): Observable<any> {
    return this.http.delete(`${this.records}/${id}`);
  }
}