import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class NodeSelectService {

  private subject = new Subject<any>();

  constructor() { }

  sendSelect(id: string) {
    this.subject.next({ id });
  }

  clearSelect() {
    this.subject.next(null);
  }

  getSelect(): Observable<any> {
    return this.subject.asObservable();
  }

}
