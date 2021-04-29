import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WordList } from 'src/app/datatypes/wordlist';
import { ContextPackService } from 'src/app/services/contextPack-service/contextpack.service';
import { SubmitService } from 'src/app/services/submit.service';
import { ContextPack } from '../../datatypes/contextPacks';

@Component({
  selector: 'app-cp-card',
  templateUrl: './context-pack-card.component.html',
  styleUrls: ['./context-pack-card.component.scss']
})
export class ContextPackCardComponent implements OnInit {

  @Input() contextPack: ContextPack;
  @Input() simple?= false;
  @Output() delete = new EventEmitter();

  count: number;
  deleteClicked = false;
  constructor(
    private contextPackService: ContextPackService,
    private snackBar: MatSnackBar,
    private router: Router,
    private submitService: SubmitService
    ) { }

  ngOnInit(): void {
    this.countWords();
  }

  deletePack(event) {
    event.stopPropagation();
    this.delete.emit();
  }

  openContextPack() {
    this.router.navigate(['packs', this.contextPack._id]);
  }
  countWords() {
    let count = 0;
    if(this.contextPack && this.contextPack.wordlists) {this.contextPack.wordlists.forEach(list =>
      count += list.adjectives.length + list.nouns.length + list.verbs.length + list.misc.length
    );}
    this.count = count;
  }
  toggle(event){
    event.stopPropagation();
    this.deleteClicked = !this.deleteClicked;
  }

  setEnableOrDisable(element,contextPack: ContextPack){
    console.log(element);
    if(contextPack !== null){
      if(element.textContent === 'disable'){
        element.textContent = 'enable';
        contextPack.enabled = false;
      }
      else{
        element.textContent = 'disable';
        contextPack.enabled = true;
      }
      this.submitService.submit(contextPack);
      return(contextPack.enabled.toString());
    }
  }
}
