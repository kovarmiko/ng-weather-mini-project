import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CACHE_TTL } from './config';

export type CacheEntry = { data: unknown; timestamp: number };

@Injectable({
  providedIn: 'root',
})
export class CachingHttpService implements HttpInterceptor {
  private cache: { [url: string]: CacheEntry } = {};

  constructor(@Inject(CACHE_TTL) private cacheTTL: number) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.handle(req, next);
  }

  setCacheTTL(ttl: number): void {
    this.cacheTTL = ttl;
    localStorage.setItem('cache-ttl', JSON.stringify(ttl));
  }

  getCacheTTL(): number {
    const storedCacheConfig = JSON.parse(localStorage.getItem('cache-ttl'));

    if (storedCacheConfig) {
      this.cacheTTL = storedCacheConfig;
    }

    return this.cacheTTL;
  }

  private handle(req: HttpRequest<unknown>, next: HttpHandler) {
    // Check if the request should be cached
    if (req.method !== 'GET' || req.headers.get('no-cache')) {
      return next.handle(req);
    }

    const cachedEntry: CacheEntry =
      this.cache[req.urlWithParams] ||
      JSON.parse(localStorage.getItem(req.urlWithParams));

    if (cachedEntry && this.isCacheValid(cachedEntry.timestamp)) {
      // If cached data is available and still within TTL, return it as an observable
      return of(new HttpResponse({ body: cachedEntry.data }));
    } else {
      // If data is not cached or expired, make the HTTP request
      return next.handle(req).pipe(
        tap((event) => {
          // Cache the response in localStorage with timestamp
          if (event instanceof HttpResponse) {
            const entry = { data: event.body, timestamp: Date.now() };
            this.cache[req.urlWithParams] = entry;
            localStorage.setItem(req.urlWithParams, JSON.stringify(entry));
          }
        }),
        catchError((error) => {
          return of(error);
        })
      );
    }
  }

  private isCacheValid(timestamp: CacheEntry['timestamp']): boolean {
    return Date.now() - timestamp < this.cacheTTL;
  }
}
