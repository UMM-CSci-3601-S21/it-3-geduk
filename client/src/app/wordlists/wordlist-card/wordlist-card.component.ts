import { WordList } from './../../datatypes/wordlist';
import { Component, Input } from '@angular/core';
import { WordListService } from '../../services/wordlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wordlist-card',
  templateUrl: './wordlist-card.component.html',
  styleUrls: ['./wordlist-card.component.scss']
})
export class WordlistCardComponent {

  @Input() wordlist: WordList;
  @Input() disableButton = false;
  @Input() id: string;
  deleteClicked: boolean;
  isShown: boolean;

  constructor(private service: WordListService, private router: Router) { }

  deleteWordList() {
    const c = this.service.deleteWordList(this.wordlist, this.id).subscribe(res=> {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigate(['packs/' + this.id]);
    });
    return c;
  }

  toggleConfirmation() {
    this.deleteClicked = !this.deleteClicked;
  }

}
