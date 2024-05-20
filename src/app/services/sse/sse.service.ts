import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  constructor() {
    this.getDeliveryEvents();
  }

  getDeliveryEvents(): Observable<any> {
    return new Observable<any>((observer) => {
      const eventSource = new EventSource(
        'http://localhost:8000/delivery-events'
      );

      eventSource.onmessage = (event) => {
        observer.next(JSON.parse(event.data));
      };

      eventSource.onerror = (error) => {
        observer.error('EventSource failed: ' + error);
      };

      return () => {
        eventSource.close();
      };
    });
  }
}
