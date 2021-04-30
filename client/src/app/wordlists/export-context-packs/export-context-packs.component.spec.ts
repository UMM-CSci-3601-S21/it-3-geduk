import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Word } from 'src/app/datatypes/word';
import { WordList } from 'src/app/datatypes/wordlist';

import { ExportContextPacksComponent } from './export-context-packs.component';

describe('ExportContextPacksComponent', () => {
  let component: ExportContextPacksComponent;
  let fixture: ComponentFixture<ExportContextPacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportContextPacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportContextPacksComponent);
    component = fixture.componentInstance;
    const noun: Word = {
      word: 'you',
      forms: ['you', 'yoyo', 'yos', 'yoted']
    };
    const adjective: Word = {
      word: 'green',
      forms: ['green', 'greener']
    };
    const verb: Word = {
      word: 'ran',
      forms: ['ran', 'running']
    };
    const misc: Word = {
      word: 'langerhans',
      forms: ['langerhans', 'langerhan']
    };
    const testNouns: Word[] = [noun];
    const testVerbs: Word[] = [verb];
    const testAdjectives: Word[] = [adjective];
    const testMisc: Word[] = [misc];
    const emptyWordlist ={

    };

    const testWordListBig: WordList[] = [{
      name: 'howdy',
      enabled: true,
      nouns: testNouns,
      verbs: testVerbs,
      adjectives: testAdjectives,
      misc: testMisc
    },
  {
      name: 'partner',
      enabled: true,
      nouns: testNouns,
      verbs: testVerbs,
      adjectives: testAdjectives,
      misc: testMisc
  }];

     component.contextpack = {
      _id: 'pat_id',
      enabled: true,
      name: 'happy',
      wordlists: testWordListBig
    };



    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a download element when given a json', () => {
    expect(component.downloadJson(component.contextpack, component.contextpack.name).toString()).toContain('happy');

  });
  it('should convert a json into a correctly formatted json', () => {
    expect(component.convertToBetterJson(component.contextpack).$schema).
    toEqual('https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json');
    expect(component.convertToBetterJson(component.contextpack).id).toBeUndefined();
  });
  describe('Toggle Button', ()=>{
    it('should toggle the boolean status', ()=>{
      expect(component.toggleShow()).toBeTruthy();
    });
  });
  describe('Check if pack is valid', ()=>{
    it('should check if pack is valid', ()=>{
      expect(component.checkValid(component.contextpack)).toEqual(true);
      const falseName = component.contextpack;
      falseName.name = null;
      expect(component.checkValid(falseName)).toEqual(false);
      const falseEnable = component.contextpack;
      falseEnable.enabled = null;
      expect(component.checkValid(falseEnable)).toEqual(false);
      const falseWordlist = component.contextpack;
      falseWordlist.wordlist = null;
      expect(component.checkValid(falseWordlist)).toEqual(false);
    });
  });





});
