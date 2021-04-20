import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WordList } from 'src/app/datatypes/wordlist';
import { ContextPackService } from 'src/app/services/contextPack-service/contextpack.service';
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
  constructor(private contextPackService: ContextPackService, private snackBar: MatSnackBar,private router: Router) { }

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
    if(contextPack !== null){
      if(element.target.textContent === 'disable'){
        element.target.textContent = 'enable';
        contextPack.enabled = false;
        console.log(contextPack.enabled);
      }
      else{
        element.target.textContent = 'disable';
        contextPack.enabled = true;
        console.log(contextPack.enabled);
      }
      this.submit(contextPack);
      return(contextPack.enabled.toString());}}

      submit(cp: ContextPack) {
        this.contextPackService.updateContextPack(cp, cp._id).subscribe(contextpack => {

          this.snackBar.open(cp.name[0].toUpperCase()+cp.name.substring(1,cp.name.length).toLowerCase()+ ' Pack is Updated ' , null, {
            duration: 2000,
          });
        }, err => {
          this.snackBar.open('Failed to update the pack', 'OK', {
            duration: 5000,
          });
        });}
}
