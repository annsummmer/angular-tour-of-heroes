import { Injectable } from '@angular/core';
import { Hero } from 'src/app/hero';
import { Observable, of, pipe } from 'rxjs';
import { MessageService } from 'src/app/message.service';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // URL to web api

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', [])),
      );
  }

  getHero(heroId: number) {
    const url = `${this.heroesUrl}/${heroId}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${heroId}`)),
        catchError(this.handleError<Hero>(`getHero id=${heroId}`))
      );
  }

  updateHero(hero: Hero): Observable<Hero> {

    return this.http.put<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(name: Hero): Observable<Hero> {

    return this.http.post<Hero>(this.heroesUrl, name, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added new hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero): Observable<Hero> {

    return this.http.delete<Hero>(`${this.heroesUrl}/${hero.id}`, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`deleted hero w/ id=${hero.id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );

  }

  searchHeros(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
