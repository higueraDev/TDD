import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackBar : MatSnackBar) {}

  open() {
    this._snackBar.open('Home booked!', null, {
      duration: 2000
    })
  }
}
