import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Swal} from '../../shared/utilities/swal';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent implements OnInit {

  token: string;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router) {
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.http.patch<any>(environment.baseUrl + '/secure/settings/user/email/' + this.token, null)
      .subscribe(result => {
        Swal.swalSuccessMessageWithRouting(result.message, this.router, '');
      }, error => {
        Swal.swalErrorMessage(error.message);
      });
  }

}
