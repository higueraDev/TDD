import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesComponent } from './homes.component';
import { DataService } from '../../services/data.service';
import { DialogService } from '../../services/dialog.service';

const homesMock = [
    {
      title:'Home 1',
      image: 'assets/listing.jpg',
      location: 'New York'
    },
    {
      title:'Home 2',
      image: 'assets/listing.jpg',
      location: 'Boston'
    },
    {
      title:'Home 3',
      image: 'assets/listing.jpg',
      location: 'Chicago'
    },
  ]

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  const dialogService = jasmine.createSpyObj('DialogService', ['open'])
  const dataService = jasmine.createSpyObj('DataService', ['getHomes$']);
  dataService.getHomes$.and.returnValue(of(homesMock));

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [HomesComponent],
      providers: [{
        provide: DataService, useValue: dataService
      },
      {
        provide: DialogService, useValue: dialogService
      }
    ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show homes', () => {
    expect(fixture.nativeElement.querySelectorAll("[data-test='home']").length).toBe(3);
  });

  it('should show home info', ()=>{
    const home = fixture.nativeElement.querySelector("[data-test='home']")

    expect(home.querySelector("[data-test='title']").innerText).toBe('Home 1')
    expect(home.querySelector("[data-test='image'] img").src).toContain('listing.jpg')
    expect(home.querySelector("[data-test='location']").innerText).toBe('New York')
  })

  it('Should show Book button',()=>{
    expect(fixture.nativeElement.querySelector("[data-test='book-button']")).toBeTruthy()
  })

  it('Should use dialog service to open dialog when clicking Book button',()=>{
    const bookButton = fixture.nativeElement.querySelector("[data-test='book-button'] button")

    bookButton.click();

    expect(dialogService.open).toHaveBeenCalled()

  })
});
