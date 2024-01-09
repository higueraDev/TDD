import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: NativeDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_NATIVE_DATE_FORMATS,
    },
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  checkIn :Date;
  checkOut :Date;
  minCheckInDate = new Date();
  maxCheckInDate = new Date('12/30/2024');
  maxCheckOutDate = new Date('12/31/2024');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private notificationService: NotificationService,
    public matDialogRef: MatDialogRef<BookComponent>
  ) {}

  calculateTotal(checkin, checkout, price) {
    if (!checkin || !checkout || !price) return 0;

    const checkinNumber = new Date(checkin).getTime();
    if (!checkinNumber) return 0;

    const checkoutNumber = new Date(checkout).getTime();
    if (!checkoutNumber) return 0;

    const diff = checkoutNumber - checkinNumber;
    const nights = diff / (1000 * 60 * 60 * 24);

    if (nights < 0) return 0;

    return price * nights;
  }

  bookHome() {
    this.dataService.book$().subscribe(() => {
      this.notificationService.open();
      this.matDialogRef.close();
    });
  }

  get minCheckOutDate() {
    if(!this.checkIn)return new Date()
    const dateString = this.checkIn.toLocaleDateString().split('/')
    return new Date(`${dateString[0]}'/'${Number(dateString[1]) + 1}'/'${dateString[2]}`)     
  }
}
