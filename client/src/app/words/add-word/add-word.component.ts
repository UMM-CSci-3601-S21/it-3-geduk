import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DictionaryService } from './../../services/dictionary-service/dictionary.service';


@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit {
  @Output() addWord = new EventEmitter();
  @Output() form = new EventEmitter();
  @Input() words = [];
  @Input() wordForm = '';

  forms = [''];
  counter = [''];
  wordName = '';
  finished = false;
  type: string;
  cleared = false;
  suggested = '';

  added = false;

  valid: boolean;
  err = false;


  constructor(private dictionary: DictionaryService) { }

  check() {
    if (this.wordName && this.type) {
      this.finished =
        this.wordName.trim().length > 0 &&
        this.wordName.trim().length <= 60 &&
        this.type.trim().length > 1 &&
        !this.words.some(word =>
          word.word === this.wordName.trim() &&
          word.forms === [this.wordName.trim(), ...this.forms.filter(e => e.trim().length !== 0)]
        );
    }
    return this.finished;
  }

  ngOnInit(): void {
  }

  add(val) {
    this.forms[this.forms.length - 1] = val;
    this.forms.push('');
    this.counter.push(val);
    this.cleared = false;
  }

  removeForm(i: number) {
    this.forms.splice(i, 1);
    this.counter.splice(i, 1);
    if (this.forms.length === 0) { this.forms = ['']; }
  }

  suggest() {
    const typed = this.wordName;
    const regEx = /^(.*?)\,/g;
    const firstWord = this.wordName.split(regEx);
    setTimeout(() => {
      if (this.wordName && typed === this.wordName) {
        this.dictionary.getType(firstWord[0], type => {
          if (type === 'adjective' || type === 'verb' || type === 'noun') {
            this.type = `${type}s`;
            this.suggested = type;
          } else {
            this.type = 'misc';
            this.suggested = 'misc';
          }
          this.check();
        }, err => console.log(err)
        );
      }
    }, 1000);
  }

  save() {
    const splitInput = this.wordName.split(', ');

    splitInput.forEach(val => this.forms.push(val));

    this.addWord.emit({
      name: splitInput[0],
      forms: [...new Set([...this.forms.filter(e => e.length !== 0)])],// This line removes repetitions and inserts main word
      type: this.type
    });
    this.wordName = '';
    this.forms = [''];
    this.counter = [''];
    this.added = false;
    this.finished = false;
    this.suggested = '';
    this.type = '';
    this.cleared = true;
  }
}
