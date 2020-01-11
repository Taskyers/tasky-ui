import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Swal} from '../../shared/utilities/swal';
import swal from "sweetalert2";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  projectKey: any;
  taskDetails: any;
  comments: any;
  length: any;
  taskName: any;
  taskKey: any;
  statuses: any;
  types: any;
  priorities: any;
  resolutions: any;
  newCommentForm: any;
  updateCommentForm: any;
  commentToUpdate: any;
  modalReference = null;
  content: any;


  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectKey = this.route.snapshot.paramMap.get('key');
    this.http.get<any>(environment.baseUrl + '/secure/tasks/' + this.projectKey)
      .subscribe((data) => {
        this.taskDetails = data;
        this.taskName = data.name;
        this.taskKey = data.key;
        this.comments = data.comments;
      });
    this.http.get<any>(environment.baseUrl + '/secure/tasks/' + this.projectKey + '/statuses')
      .subscribe((data) => {
        this.statuses = data;
      });
    this.http.get<any>(environment.baseUrl + '/secure/tasks/' + this.projectKey + '/types')
      .subscribe((data) => {
        this.types = data;
      });
    this.http.get<any>(environment.baseUrl + '/secure/tasks/' + this.projectKey + '/priorities')
      .subscribe((data) => {
        this.priorities = data;
      });
    this.http.get<any>(environment.baseUrl + '/secure/tasks/' + this.projectKey + '/resolutions')
      .subscribe((data) => {
        this.resolutions = data;
      });

    this.newCommentForm = this.formBuilder.group({
      content: [ '', [ Validators.required ] ]
    });

    this.updateCommentForm = this.formBuilder.group({
      id: [ '' ],
      content: [ '', [ Validators.required ] ]
    });
  }

  async delete(commentId: string) {
    if ( await Swal.swalDelete('Are you sure to remove this comment?') ) {
      this.http.delete<any>(environment.baseUrl + '/secure/tasks/comments/' + commentId)
        .subscribe(res => {
          Swal.swalSuccessMessageWithReload(res.message, location);
        }, error => {
          Swal.swalErrorMessage(error.message);
        });
    }
  }

  open(content) {
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  update(edit, comment) {
    this.commentToUpdate = comment;
    this.content = this.commentToUpdate.content;
    this.updateCommentForm.controls.id.setValue(this.commentToUpdate.id);
    this.updateCommentForm.controls.content.setValue(this.commentToUpdate.content);
    this.modalReference = this.modalService.open(edit, { ariaLabelledBy: 'updateEntry' });
  }

  onSubmit() {
    const body = new FormData();
    body.append('content', this.newCommentForm.get('content').value);
    if ( this.newCommentForm.valid ) {
      this.http.post<any>(environment.baseUrl + '/secure/tasks/comments/' + this.taskDetails.id, body)
        .subscribe(
          (result) => {
            Swal.swalSuccessMessageWithReload(result.message, location);
            this.modalReference.close();
          },
          error => {
            Swal.swalRegistrationFailWithMessage(error.error[ 0 ].message);
          }
        );
      swal.fire({
        showConfirmButton: true
      });
    }
  }

  onUpdateSubmit(id: any) {
    const body = new FormData();
    body.append('content', this.updateCommentForm.get('content').value);
    this.http.patch<any>(environment.baseUrl + '/secure/tasks/comments/' + id, body)
      .subscribe(
        (result) => {
          Swal.swalSuccessMessageWithReload(result.message, location);
        },
        error => {
          Swal.swalRegistrationFailWithMessage(error.error[ 0 ].message);
        }
      );
    swal.fire({
      showConfirmButton: true
    });

  }
}
