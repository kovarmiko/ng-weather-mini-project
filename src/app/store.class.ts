import {Observable, BehaviorSubject} from 'rxjs';

export class LocationStore<T> {

    private state$: BehaviorSubject<T>;

    protected constructor (initialState: T) {
        this.state$ = new BehaviorSubject(initialState);
    }

    protected getLocations(): T {
        return this.state$.getValue();
    }

    protected getState(): Observable<T> {
      return this.state$.asObservable();
    }

    protected setState(nextState: T): void {
        this.state$.next(nextState);
    }
}