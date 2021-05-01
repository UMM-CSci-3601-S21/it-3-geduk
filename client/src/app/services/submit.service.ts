import { Injectable } from '@angular/core';
import { ContextPackService } from './contextPack-service/contextpack.service';
import { ContextPack } from '../datatypes/contextPacks';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {

  constructor(
    private contextPackService: ContextPackService,
    private snackBar: MatSnackBar
    ) { }

  submit(cp: ContextPack) {
    this.contextPackService.updateContextPack(cp, cp._id).subscribe(contextpack => {

      this.snackBar.open(cp.name[0].toUpperCase()+cp.name.substring(1,cp.name.length).toLowerCase()+ ' Pack is Updated' , null, {
        duration: 2000,
      });
    }, err => {
      this.snackBar.open('Failed to update the pack', 'OK', {
        duration: 5000,
      });
    });
  }
}
