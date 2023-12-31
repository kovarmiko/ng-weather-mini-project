import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export type Intent =
  | 'LOCATION_ADDED'
  | 'LOCATION_REMOVED'
  | 'LOCATIONS_READ_FROM_LOCALSTORAGE'
  | 'HTTP_CACHE_LIFESPAN';

export type NotificationPayload = string | string[] | number;

export type Notification<T extends NotificationPayload> = {
  intent: Intent;
  payload: T;
};

// declare Subject as a scoped variable
const notifications$ = new Subject<Notification<NotificationPayload>>();

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notify(intent: Intent, payload: NotificationPayload): void {
    notifications$.next({ intent, payload });
  }

  observe<T extends NotificationPayload>(
    intent: Intent | false = false
  ): Observable<Notification<T>> {
    const tailoredNotification$ = notifications$.pipe(
      filter((notification: Notification<T>) => {
        // skip filtering if intent parameter is the default or false
        if (!intent) {
          return true;
        }
        // only emit relevant values
        return notification.intent === intent;
      })
    );

    return tailoredNotification$;
  }
}
