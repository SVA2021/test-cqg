import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {CardT, mockData} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private readonly http = inject(HttpClient);

  getCards(): Observable<CardT[]> {
    return of(mockData);
  }

  getDepsById(id: string): Observable<string[]> {
    return of(this.getDepsInMockData(id));
  }

  private readonly getDepsInMockData = (id: string): string[] => {
    return mockData.find(c => c.id === id)?.dependencies ?? [];
  }

}
