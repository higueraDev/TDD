import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

const homesMock = [
  {
    title:'Home 1',
    image: 'assets/listing.jpg',
    description: 'New York'
  },
  {
    title:'Home 2',
    image: 'assets/listing.jpg',
    description: 'Boston'
  },
  {
    title:'Home 3',
    image: 'assets/listing.jpg',
    description: 'Chicago'
  },
]

describe('DataService', () => {
  let service: DataService;
  const httpClient = jasmine.createSpyObj('HttpClient', ['get'])
  httpClient.get.and.returnValue(of(homesMock))

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ],
      providers: [{
        provide: HttpClient, useValue: httpClient
      }]
    });
    service = TestBed.inject(DataService);
  });

  it('should return the list of homes', () => {
    const spy = jasmine.createSpy('spy')
    service.getHomes$().subscribe(spy)

    expect(spy).toHaveBeenCalledWith(homesMock);

    expect(httpClient.get).toHaveBeenCalledWith('assets/homes.json')
  });
});
