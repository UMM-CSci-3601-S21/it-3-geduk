import { MockWordListService } from '../../../testing/wordlist.service.mock';
import { WordListService } from 'src/app/services/wordlist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule, ParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { COMMON_IMPORTS } from 'src/app/app-routing.module';
import { DisplayWordlistComponent } from './display-wordlist.component';
import { MockCPService } from 'src/testing/context-pack.service.mock';
import { ContextPackService } from 'src/app/services/contextPack-service/contextpack.service';
import { of } from 'rxjs';
import { ContextPack } from 'src/app/datatypes/contextPacks';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubmitService } from 'src/app/services/submit.service';

describe('DisplayWordlistComponent', () => {
  let component: DisplayWordlistComponent;
  let fixture: ComponentFixture<DisplayWordlistComponent>;
  let service: MockCPService;
  const routerSpy = {navigate: jasmine.createSpy('navigate')};
  const matsnackbarSpy = {open: jasmine.createSpy('open')};
  const paramMap = new Map();
  paramMap.set('id', 'moo');


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayWordlistComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, RouterModule.forRoot([]), COMMON_IMPORTS],
      providers: [{ provide: WordListService, useValue: new MockWordListService() },
      { provide: ContextPackService, useValue: new MockCPService() },
      {provide: Router, useValue: routerSpy},
      {provide: MatSnackBar,useValue: matsnackbarSpy},
      {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of(paramMap)
        }
      },
      { provide: SubmitService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayWordlistComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ContextPackService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should count', () => {
    component.list = [
      {
        name: '',
        enabled: true,
        adjectives: [{ word: '', forms: [] }],
        verbs: [{ word: '', forms: [] }],
        nouns: [{ word: '', forms: [] }],
        misc: [{ word: '', forms: [] }]
      }];
    component.countWords();
    expect(component.wordcount).toBe(4);
  });

  it('should delete a cp', () => {
    component.pack = {
      _id: 'boo',
      schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
      name: 'bovines',
      icon: 'image.png',
      enabled: true,
      wordlist: MockCPService.testList
    };
    service.addPack(component.pack);
    component.delete();
    expect(service.includes(component.pack)).toBe(false);
  });
  it('should navigate', () => {
    component.pack = {
      _id: 'boo',
      schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
      name: 'bovines',
      icon: 'image.png',
      enabled: true,
      wordlist: MockCPService.testList
    };
    expect(component.saveAndRoute(component.pack));
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/packs/boo/export']);
    });

  it('should save', () => {
    component.pack = {
      _id: 'moo',
      schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
      name: 'bovines',
      icon: 'image.png',
      enabled: true,
      wordlist: MockCPService.testList,
    };
    component.name = 'cows';
    component.save();
    expect(component).toBeTruthy();
  });

  it('should change the value of the button and wordlist value for enable. It would then update the context pack'+
   'with the new version', () => {
    const element = {
      textContent: 'disable'
    };
    console.log(element);
    spyOn(component,'submit');
    expect(component.setEnableOrDisable(element,component.pack)).toEqual('false');
  });


  it('should submit the context pack', () => {

    const response: ContextPack = component.pack;


    spyOn(ContextPackService.prototype, 'updateContextPack').and.returnValue(of(response));
    expect(component.submit(component.pack));



    expect (matsnackbarSpy.open).toHaveBeenCalledWith( 'Felines Pack is Updated', null, Object({ duration: 2000 }) );
  });

});
