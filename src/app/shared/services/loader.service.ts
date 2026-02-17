import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  emitLoaderState:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  emitLoaderState$:Observable<boolean> = this.emitLoaderState.asObservable()

  loadingState(state:boolean){
    this.emitLoaderState.next(state)
  }
}
