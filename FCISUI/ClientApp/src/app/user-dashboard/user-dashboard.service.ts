import { Injectable } from '@angular/core';
import {
  Observable,
  BehaviorSubject
} from 'rxjs';
import { Person } from '../api/models';
import { DataService } from '../api/data.service';

@Injectable({
    providedIn: 'root'
  })
  export class UserDashboardService {

    private _people$:BehaviorSubject<Person[]>;

    constructor(private dataService:DataService) {
        this._people$ =  new BehaviorSubject<Person[]>([]);
        this.dataService.people().subscribe((people)=>{
            this._people$.next(people);
        });
    }

    get people$():Observable<Person[]> {
        return this._people$.asObservable();
    }

    addPerson(person:Person) {
        this.dataService.addPerson(person).subscribe((person)=>{
            this._people$.next([...this._people$.value, person]);
        });
    }

    editPerson(person:Person) {
        // TODO
    }

    deletePerson(id:number) {
        // TODO
    }
  }