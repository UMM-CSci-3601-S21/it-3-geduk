import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
