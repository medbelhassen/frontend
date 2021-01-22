import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OutilModel} from "../../models/outil.model";
import {OutilService} from "../../services/outil.service";

@Component({
  selector: 'app-outil-form',
  templateUrl: './outil-form.component.html',
  styleUrls: ['./outil-form.component.scss']
})
export class OutilFormComponent implements OnInit {

  currentItemId: string;
  item: OutilModel;
  form: FormGroup;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private outilService: OutilService) {

  }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.outilService.getToolById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
      }).catch(() => {
        this.initForm(null);
      });
    } else {
      this.initForm(null);
    }
  }


  private initForm(item: OutilModel): void {
    this.form = new FormGroup({
      nom: new FormControl(item?.nom, [Validators.required]),
      description: new FormControl(item?.description, [Validators.required]),
      date: new FormControl(item?.date, [Validators.required]),
      source: new FormControl(item?.source, [Validators.required]),
    });
  }
  onSubmit(): void {
    const objectToSubmit: OutilModel = {...this.item, ...this.form.value};
    console.log(this.form.value);
    this.outilService.saveTool(objectToSubmit).then(() => {
      this.router.navigate(['./outils']);
    });
  }


}
