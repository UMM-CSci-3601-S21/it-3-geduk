import { ContextPackService } from './../../services/contextPack-service/contextpack.service';
import { WordListService } from 'src/app/services/wordlist.service';
import { Component, OnInit } from '@angular/core';
import { WordList } from 'src/app/datatypes/wordlist';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextPack } from 'src/app/datatypes/contextPacks';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubmitService } from 'src/app/services/submit.service';

@Component({
  selector: 'app-display-wordlist',
  templateUrl: './display-wordlist.component.html',
  styleUrls: ['./display-wordlist.component.scss']
})
export class DisplayWordlistComponent implements OnInit {
  title = 'Word Lists';
  name = '';
  list: WordList[] = [];
  pack: ContextPack;
  wordcount = 0;
  id: string;
  deleteClicked = false;

  constructor(
    private route: ActivatedRoute,
    private service: WordListService,
    private cpservice: ContextPackService,
    private router: Router,
    private contextPackService: ContextPackService,
    private snackBar: MatSnackBar,
    private submitService: SubmitService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
    });
    this.cpservice.getPack(this.id).subscribe(cp=>{
      this.pack = cp;
      // console.log(this.pack);
      this.list = cp.wordlists;
      this.name = cp.name;
      this.countWords();
    });
  }

  countWords() {
    let count = 0;
    if (this.list && this.list.length > 0) {
      this.list.forEach(w => {
        count += w.adjectives.length + w.nouns.length + w.verbs.length + w.misc.length;
      });
    }
    this.wordcount = count;
  }

  delete(){
    this.cpservice.deletePack(this.pack._id).subscribe((r)=>{
      this.router.navigate(['']);
    });
  }

  setEnableOrDisable(element,contextPack: ContextPack){
    if(contextPack !== null){
      console.log(element);
      if(element.textContent === 'disable'){
        element.textContent = 'enable';
        contextPack.enabled = false;
        console.log(contextPack.enabled);
      }
      else{
        element.textContent = 'disable';
        contextPack.enabled = true;
        console.log(contextPack.enabled);
      }
      this.submitService.submit(contextPack);
      return(contextPack.enabled.toString());
    }
  }

  save() {
    this.pack.name = this.name.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '').trim();
    this.submitService.submit(this.pack);
  }
}
