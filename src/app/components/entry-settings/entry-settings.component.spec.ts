import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrySettingsComponent } from './entry-settings.component';

describe('EntrySettingsComponent', () => {
  let component: EntrySettingsComponent;
  let fixture: ComponentFixture<EntrySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
