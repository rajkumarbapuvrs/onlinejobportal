import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowJobDetails } from './show-job-details';

describe('ShowJobDetails', () => {
  let component: ShowJobDetails;
  let fixture: ComponentFixture<ShowJobDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowJobDetails]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShowJobDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
