import { Component, OnInit } from '@angular/core';

import { ContextPack } from 'src/app/datatypes/contextPacks';


@Component({
  selector: 'app-export-context-packs',
  templateUrl: './export-context-packs.component.html',
  styleUrls: ['./export-context-packs.component.scss']
})
export class ExportContextPacksComponent implements OnInit {
  pack = JSON.parse(localStorage.getItem('data'));
  isShown = false;
  constructor() { }

  ngOnInit(): void {


  }
  toggleShow() {
    this.isShown = ! this.isShown;
    return this.isShown;
    }
    downloadJson(myJson: ContextPack, topic: string){
      myJson = this.convertToBetterJson(myJson);
      const sJson = JSON.stringify(myJson, null, 2);
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/json;charset=UTF-8,' + encodeURIComponent(sJson));
      element.setAttribute('download', topic + '.json');
      element.style.display = 'none';
      document.body.appendChild(element);
      document.body.removeChild(element);
      return element;
}

  convertToBetterJson(jsonBetter: ContextPack){
    const obj: any =
      {
      $schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
      name: jsonBetter.name,
      icon: jsonBetter.icon,
      enabled: jsonBetter.enabled,
      wordlists: jsonBetter.wordlists
      };
      return obj;
  }

  checkValid(contextPack: ContextPack){
    let test = true;
    if(contextPack.name === null){
      test = false;
    }
    if(contextPack.enabled === null){
      test = false;
    }
    if(contextPack.wordlist === null){
      test = false;
    }
    return test;
  }

}
