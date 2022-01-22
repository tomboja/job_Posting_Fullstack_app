import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

export class Job {
  #id!: string
  #title!: string;
  #salary!: Number;
  #description!: string;
  #location!: object;
  #skills!: string[];
  #experiance!: string;
  #postDate!: Date;

  constructor(id: string, title: string, salary: Number, description: string, location: object, skills: string[], experiance: string, postDate: Date) {
    this.#id = id
    this.#title = title
    this.#salary = salary
    this.#description = description
    this.#location = location
    this.#skills = skills
    this.#experiance = experiance
    this.#postDate = postDate
  }

  get _id() {return this.#id}
  get title() {return this.#title}
  get salary() {return this.#salary}
  get description() {return this.#description}
  get location() {return this.#location}
  get skills() {return this.#skills}
  get experiance() {return this.#experiance}
  get postDate() {return this.#postDate}
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {

  jobs: Job[] = []

  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.jobsService
      .getJobs()
      .then((response) => this._setJobs(response))
    .catch((error) => this._handleError(error))
  }
  private _handleError(error: any): any {
    console.log('Error occured ', error)
  }
  private _setJobs(response: Job[]): any {
    console.log('JOCSSS ', response)
    this.jobs = response
  }
}
