import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

const request = new XMLHttpRequest();
request.open('GET', '../../../assets/homes.json', false);
request.send(null);
const homeMock = JSON.parse(request.responseText)[0];

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  const el = (selector: string) =>
    fixture.nativeElement.querySelector(selector);
  const dataService = jasmine.createSpyObj('DataService', ['book$']);
  dataService.book$.and.returnValue(of(null))
  const notificationService = jasmine.createSpyObj('NotificationService', [
    'open',
  ]);

  const matDialogRef = jasmine.createSpyObj('MatDialogRef',['close'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookComponent, NoopAnimationsModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: homeMock,
        },
        {
          provide: DataService,
          useValue: dataService,
        },
        {
          provide: NotificationService,
          useValue: notificationService,
        },
        {
          provide: MatDialogRef,
          useValue: matDialogRef,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should show Title', () => {
    const title = el("[data-test='title']");
    expect(title.textContent).toContain('Book ' + homeMock.title);
  });

  it('Should show Price', () => {
    const price = el("[data-test='price'] span");
    expect(price.textContent).toContain('$' + homeMock.price);
  });

  it('Should show Check in Date', () => {
    const checkinDate = el("[data-test='check-in']");
    expect(checkinDate).toBeTruthy();
  });

  it('Should show Check out Date', () => {
    const checkinDate = el("[data-test='check-out']");
    expect(checkinDate).toBeTruthy();
  });

  it('Should show Total', () => {
    const checkinDate = el("[data-test='check-in'] input");
    checkinDate.value = '12/01/23';
    checkinDate.dispatchEvent(new Event('input'));

    const checkoutDate = el("[data-test='check-out'] input");
    checkoutDate.value = '12/04/23';
    checkoutDate.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const total = el("[data-test='total']");

    const totalMock = (3 * homeMock.price).toString();

    expect(total.textContent).toContain('Total: $' + totalMock);
  });

  it('Should book home after clicking Book button', () => {
    const button = el("[data-test='book-button'] button");
    button.click();

    expect(dataService.book$).toHaveBeenCalled();
  });

  it('Should close dialog and show notification after clicking Book button', () => {
    const button = el("[data-test='book-button'] button");
    button.click();

    expect(notificationService.open).toHaveBeenCalled();
    expect(matDialogRef.close).toHaveBeenCalled();
  });
});
