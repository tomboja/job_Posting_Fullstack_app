import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JobsService } from '../jobs.service';
import { Job } from '../jobs/jobs.component';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  job!: Job;

  constructor(private jobService: JobsService, private route: ActivatedRoute) {}
  _handleError(error: any): any {
    console.log('Error occured');
  }

  _setJobData(response: Job): any {
    console.log('REsponse: ', response);
    this.job = response;
  }
  ngOnInit(): void {
    const jobId = this.route.snapshot.params['jobId'];
    console.log('JobId ', jobId);

    this.jobService
      .getOne(jobId)
      .then((response) => this._setJobData(response))
      .catch((error) => this._handleError(error));
  }
}
