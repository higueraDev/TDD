import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DialogService } from '../../services/dialog.service';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-homes',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './homes.component.html',
  styleUrl: './homes.component.scss',
})
export class HomesComponent {
  homes$;

  constructor(
    private dataService: DataService,
    private dialogService: DialogService
  ) {
    this.homes$ = this.dataService.getHomes$();
  }

  openDialog(home) {
    const dialogInfo = {
      width: '300px',
      data: home,
    };
    this.dialogService.open(BookComponent, dialogInfo);
  }
}
