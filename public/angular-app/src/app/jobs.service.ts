import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from './jobs/jobs.component';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  #url: string = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  public getJobs(): Promise<Job[]> {
    const url: string = this.#url + 'jobs';
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Job[])
      .catch(this._handleError);
  }

  public getOne(jobId: string): Promise<Job> {
    const url: string = this.#url + 'jobs/' + jobId;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Job)
      .catch(this._handleError);
  }

  private _handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
