import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class EntriesService {

  constructor(private http: HttpClient) { }

  getEntriesByType(projectName: string, type: string) {
    return this.http.get(environment.baseUrl + '/secure/projects/settings/entries/' + projectName + '/' + type);
  }
}
