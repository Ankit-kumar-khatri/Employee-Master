import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { DataFormat } from './dataFormat';

@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  constructor() { }

  createDb() {
    let users: DataFormat[] = [
      {
        id: 101,
        empname: 'Ankit Khatri',
        address: 'Noida 57',
        mobile: 909092167,
        dob: '2000-09-16',
        remarks: 'First employee',
      },
    ];
    return { userData: users };
  }
}
