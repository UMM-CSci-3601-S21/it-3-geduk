import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  apiUrl = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json';
  apiKey = '94e92282-3952-43b4-bde3-f54f1e0fc4fb';

  constructor(private httpClient: HttpClient) { }

  getType(word: string, onLoaded: (type: string) => any, onFailed?: (type: string) => any) {
    return this.httpClient.get<any>(this.generateLink(word)).subscribe(json => {
      const type = json[0].fl;
      onLoaded(type);
    }, error => {
      onFailed(error);
    });
  }
  generateLink(word: string): string {
    return `${this.apiUrl}/${word}?key=${this.apiKey}`;
  }
}
