import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private _dialogRef: MatDialogRef<any>
  constructor(private dialog: MatDialog){}

  open(component, info): void {
    this._dialogRef = this.dialog.open(component, info);
  }
}
