import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { WordList } from 'src/app/datatypes/wordlist';
import { ContextPackCardComponent } from './context-pack-card.component';
import { ContextPackService } from 'src/app/services/contextPack-service/contextpack.service';
import { MockCPService } from 'src/testing/context-pack.service.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DisplayContextPacksComponent } from '../display-contextPacks/display-context-packs.component';
import { Router } from '@angular/router';
import { MatSnackBar, matSnackBarAnimations } from '@angular/material/snack-bar';
import { ContextPack } from 'src/app/datatypes/contextPacks';
import { of } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';
import { matSelectAnimations } from '@angular/material/select';
import { SubmitService } from 'src/app/services/submit.service';


describe('CpCardComponent', () => {
  let cpCard: ContextPackCardComponent;
  let fixture: ComponentFixture<ContextPackCardComponent>;

  const matsnackbarSpy = { open: jasmine.createSpy('open') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        HttpClientTestingModule, RouterTestingModule.withRoutes([
          { path: '', component: DisplayContextPacksComponent }
            ])],
      declarations: [ ContextPackCardComponent ],
      providers: [
        { provide: ContextPackService, useValue: new MockCPService() },
        { provide: MatSnackBar, useValue: matsnackbarSpy },
        { provide: Overlay },
        { provide: SubmitService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const testList: Array<WordList> = MockCPService.testList;
    fixture = TestBed.createComponent(ContextPackCardComponent);
    cpCard = fixture.componentInstance;
    cpCard.contextPack = {
      _id: 'computer',
      schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
      name: 'Iron Man',
      icon: 'image.png',
      enabled: true,
      wordlist: testList,
      wordlists: testList
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(cpCard).toBeTruthy();
  });

  it('should delete a context pack', () => {
    expect(cpCard).toBeTruthy();
    expect(cpCard.deletePack({ stopPropagation: () => { } })).toBeUndefined();
  });

  it('count the words', () => {
    cpCard.contextPack = {
      _id: 'computer',
      schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
      name: 'Iron Man',
      icon: 'image.png',
      enabled: true,
      wordlist: [],
      wordlists: MockCPService.testList
    };
    cpCard.countWords();
    expect(cpCard.count).toBe(10);
  });

  it('should change the value of the button and wordlist value for enable. It would then update the context pack' +
    'with the new version', () => {

      const element = {
        textContent: 'disable'
      };
      console.log(element);
      cpCard.contextPack = {
        _id: 'computer',
        schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
        name: 'Iron Man',
        icon: 'image.png',
        enabled: true,
        wordlist: [],
        wordlists: MockCPService.testCPs[0].wordlist
      };
      spyOn(cpCard, 'submit');
      expect(cpCard.setEnableOrDisable(element, cpCard.contextPack)).toEqual('false');
      expect(cpCard.setEnableOrDisable(element, cpCard.contextPack)).toEqual('true');
    });


  it('should submit the context pack', () => {

    const response: ContextPack = cpCard.contextPack;


    spyOn(ContextPackService.prototype, 'updateContextPack').and.returnValue(of(response));
    expect(cpCard.submit(cpCard.contextPack));


    expect(matsnackbarSpy.open).toHaveBeenCalledWith('Iron man Pack is Updated ', null, Object({ duration: 2000 }));
  });
});
