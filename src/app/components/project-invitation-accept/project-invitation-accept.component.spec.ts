import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInvitationAcceptComponent } from './project-invitation-accept.component';

describe('ProjectInvitationAcceptComponent', () => {
  let component: ProjectInvitationAcceptComponent;
  let fixture: ComponentFixture<ProjectInvitationAcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInvitationAcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInvitationAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
