import { Component, OnInit } from '@angular/core';
import {PublicationModel} from "../../models/publication.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PublicationService} from "../../services/publication.service";
import {EventService} from "../../services/event.service";
import {EventModel} from "../../models/event.model";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  currentItemId: string;
  item: EventModel;
  form: FormGroup;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private eventService: EventService, ) {

  }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.eventService.getEventById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
      }).catch(() => {
        this.initForm(null);
      });
    } else {
      this.initForm(null);
    }
  }


  private initForm(item: EventModel): void {
    this.form = new FormGroup({
      titre: new FormControl(item?.titre, [Validators.required]),
      date: new FormControl(item?.date, [Validators.required]),
      lieu: new FormControl(item?.lieu, [Validators.required]),
    });
  }
  onSubmit(): void {
    const objectToSubmit: PublicationModel = {...this.item, ...this.form.value};
    console.log(this.form.value);
    this.eventService.saveEvent(objectToSubmit).then(() => {
      this.router.navigate(['./evenements']);
    });
  }

}
