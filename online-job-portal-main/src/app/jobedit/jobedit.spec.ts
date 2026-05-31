import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jobedit } from './jobedit';

describe('Jobedit', () => {
  let component: Jobedit;
  let fixture: ComponentFixture<Jobedit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jobedit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jobedit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
