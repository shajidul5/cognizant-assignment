import { Injectable } from "@angular/core";
import { HttpEvent, HttpResponse } from "@angular/common/http";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from "@angular/common/http";

import { RequestCacheService } from './request-cache.service';
import { Observable, of } from 'rxjs';
import { tap } from "rxjs/operators";

const TTL = 10;

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const cachedResponse = this.cache.get(req.url);
    return cachedResponse
      ? of(cachedResponse)
      : this.sendRequest(req, next);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
        tap(
            event => {
              //logging the http response to browser's console in case of a success
              if (event instanceof HttpResponse) {
                console.log("api call success :", event);
                this.cache.set(req.url, event, TTL);
              }
            },
            error => {
              //logging the http response to browser's console in case of a failuer
              if (event instanceof HttpResponse) {
                console.log("api call error :", event);
              }
            }
          )
    );
  }
}

