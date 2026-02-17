import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.loadingState(true)

    const reqClone = request.clone({
      setHeaders:{
        "auth":"Token From Local Storage",
        "content-type":"application/json"
      }
    })
    return next.handle(reqClone)
    .pipe(
      delay(500),
      finalize(()=>{
        this.loaderService.loadingState(false)
      })
    )
  }
}
