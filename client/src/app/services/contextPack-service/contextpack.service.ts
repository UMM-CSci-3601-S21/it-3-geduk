import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { ContextPack } from '../../datatypes/contextPacks';


@Injectable({
  providedIn: 'root'
})
export class ContextPackService {
  readonly contextPackUrl: string = environment.apiUrl + 'packs';

  private data: ContextPack;

  constructor(private httpClient: HttpClient) { }


  getPacks(): Observable<ContextPack[]> {
    return this.httpClient.get<ContextPack[]>(this.contextPackUrl, {
      params: new HttpParams(),
    });
  }

  getPack(id: string): Observable<ContextPack> {
    console.log(id);
    return this.httpClient.get<ContextPack>(this.contextPackUrl + '/' + id);
  }

  addPack(newPack: { name: string; icon: string; enabled: boolean; wordlists?: any[] }): Observable<string> {
    console.log(newPack);
    return this.httpClient.post<{ id: string }>(this.contextPackUrl, newPack).pipe(map(res => res.id));
  }

  addedPack(newPack): Observable<string> {
    console.log(newPack);
    return this.httpClient.post<{ id: string }>(this.contextPackUrl, newPack).pipe(map(res => res.id));
  }
  deletePack(id: string): Observable<string> {
    return this.httpClient.delete<{ id: string }>(this.contextPackUrl + '/' + id).pipe(map(res => res.id));
  }
  setData(data: ContextPack){
    this.data = data;
    localStorage.setItem('data',JSON.stringify(this.data));
    return(this.data.name + ' is set in the local storage');
  }
}
