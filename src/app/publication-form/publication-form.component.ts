import { Component, OnInit } from '@angular/core';
import {Member} from '../../models/member.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PublicationModel} from '../../models/publication.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../services/member.service';
import {PublicationService} from '../../services/publication.service';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit {
  currentItemId: string;
  item: PublicationModel;
  form: FormGroup;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private publicationService: PublicationService,) {

  }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.publicationService.getPublicationById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
      }).catch(() => {
        this.initForm(null);
      });
    } else {
      this.initForm(null);
    }
  }


  private initForm(item: PublicationModel): void {
    this.form = new FormGroup({
      titre: new FormControl(item?.titre, [Validators.required]),
      type: new FormControl(item?.type, [Validators.required]),
      dateApparition: new FormControl(item?.dateApparition, [Validators.required]),
      lien: new FormControl(item?.lien, [Validators.required]),
      sourcePdf: new FormControl(item?.sourcePdf, [Validators.required]),
    });
  }
  onSubmit(): void {
    const objectToSubmit: PublicationModel = {...this.item, ...this.form.value};
    console.log(this.form.value);
    this.publicationService.savePublication(objectToSubmit).then(() => {
      this.router.navigate(['./publications']);
    });
  }
}
