import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavUpdateService {
  heading: BehaviorSubject<any> = new BehaviorSubject({
    headingLink: '',
    headingString: '',
    titleLink: '',
    titleString: ''
  });
  constructor() { }

  updateHeading(headingString, headingLink, titleString, titleLink)
  {
    this.heading.next({
      headingLink: headingLink,
      headingString: headingString,
      titleLink: titleLink,
      titleString: titleString
    });
  }

  liveUpdate(): Observable<any> {
    return this.heading.asObservable();
  }
}
