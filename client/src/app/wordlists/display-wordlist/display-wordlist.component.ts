import { WordListService } from 'src/app/services/wordlist.service';
import { Component, OnInit } from '@angular/core';
import { WordList } from 'src/app/datatypes/wordlist';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-wordlist',
  templateUrl: './display-wordlist.component.html',
  styleUrls: ['./display-wordlist.component.scss']
})
export class DisplayWordlistComponent implements OnInit {
  title = 'Word Lists';
  list: WordList[] = [];
  wordcount = 0;
  id: string;

  constructor(private route: ActivatedRoute, private service: WordListService,  private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      this.id =  pmap.get('id');
    });
    this.service.getWordList(this.id).subscribe(list=>{
      this.list = list;
      this.countWords();
      console.log(list);
    });
  }

  countWords(){
    let count = 0;
    if(this.list && this.list.length > 0){
      this.list.forEach(w => {
        count += w.adjectives.length + w.nouns.length + w.verbs.length + w.misc.length;
      });
    }
    this.wordcount = count;
  }




}