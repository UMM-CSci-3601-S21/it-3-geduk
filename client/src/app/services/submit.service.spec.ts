import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SubmitService } from './submit.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';


describe('SubmitService', () => {
  let service: SubmitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: MatSnackBar },
        { provide: Overlay }
      ]
    });
    service = TestBed.inject(SubmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
