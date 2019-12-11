import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {EntriesService} from '../../services/entries.service';
import {Swal} from '../../shared/utilities/swal';
import {FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-entry-settings',
  templateUrl: './entry-settings.component.html',
  styleUrls: ['./entry-settings.component.css']
})
export class EntrySettingsComponent implements OnInit {

  projectName: string;

  entryType: string;

  currentEntries: any;

  newEntryForm: any;

  updateEntryForm: any;

  modalReference = null;

  entryToUpdate: any;

  backgroundColor: any;

  textColor: any;

  length: number;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private entriesService: EntriesService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal) { }


  ngOnInit() {
    this.projectName = this.route.snapshot.paramMap.get('project');
    this.entryType = this.route.snapshot.paramMap.get('type');
    this.entriesService.getEntriesByType(this.projectName, this.entryType).subscribe((data) => {
      this.currentEntries = data;
      this.length = Object.keys(data).length;
    });
    this.newEntryForm = this.formBuilder.group({
      value: [ '', [ Validators.required ] ],
      textColor: [ '', ],
      backgroundColor: [ '', ],
      entryType: [ '' ]
    });

    this.updateEntryForm = this.formBuilder.group({
      id: [''],
      value: [ '', [ Validators.required ] ],
      textColor: [ '', [ Validators.required ]  ],
      backgroundColor: [ '', [ Validators.required ]  ],
      entryType: [ '' ]
    });
  }

  delete(entryId: string ) {
      this.http.delete<any>(environment.baseUrl + '/secure/projects/settings/entries/' + entryId)
        .subscribe(res => {
          Swal.swalSuccessMessageWithReload(res.message, location);
        }, error => {
          Swal.swalErrorMessage(error.message);
        });
  }

  open(content) {
    this.backgroundColor = '#818181';
    this.textColor = '#818181';
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  update(edit, status) {
    this.entryToUpdate = status;
    this.backgroundColor = this.entryToUpdate.backgroundColor;
    this.textColor = this.entryToUpdate.textColor;
    this.updateEntryForm.controls.id.setValue(this.entryToUpdate.id);
    this.updateEntryForm.controls.value.setValue(this.entryToUpdate.value);
    this.updateEntryForm.controls.textColor.setValue(this.entryToUpdate.textColor);
    this.updateEntryForm.controls.backgroundColor.setValue(this.entryToUpdate.backgroundColor);
    this.updateEntryForm.controls.entryType.setValue(this.entryToUpdate.entryType);
    this.modalReference = this.modalService.open(edit, { ariaLabelledBy: 'updateEntry' });
  }

  onSubmit() {
    this.newEntryForm.controls.backgroundColor.setValue(this.backgroundColor);
    this.newEntryForm.controls.textColor.setValue(this.textColor);
    this.newEntryForm.controls.entryType.setValue(this.entryType);
    if ( this.newEntryForm.valid ) {
      this.http.post<any>(environment.baseUrl + '/secure/projects/settings/entries/' + this.projectName, this.newEntryForm.value)
        .subscribe(
          (result) => {
            Swal.swalSuccessMessageWithReload(result.message, location);
            this.modalReference.close();
          },
          error => {
            Swal.swalRegistrationFailWithMessage(error.error[0].message);
          }
        );
      swal.fire({
        showConfirmButton: true
      });
    }
  }

  onUpdateSubmit(id: any) {
    this.updateEntryForm.controls.backgroundColor.setValue(this.backgroundColor);
    this.updateEntryForm.controls.textColor.setValue(this.textColor);
    this.http.put<any>(environment.baseUrl + '/secure/projects/settings/entries/' + id, this.updateEntryForm.value)
        .subscribe(
          (result) => {
            Swal.swalSuccessMessageWithReload(result.message, location);
          },
          error => {
            Swal.swalRegistrationFailWithMessage(error.error[0].message);
          }
        );
    swal.fire({
        showConfirmButton: true
      });

  }
}
