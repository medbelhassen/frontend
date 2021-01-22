import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Member} from '../../models/member.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../services/member.service';
import {Etudiant} from "../../models/etudiant.model";
import {Enseignant} from "../../models/enseignant.model";

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  currentItemId: string;
  item: Member;
  form: FormGroup;
  formEtudiant: FormGroup;
  formEnseignant: FormGroup;
  index = 0;
  verification = false;
  action1 = false;
  action2 = false;
  x1: any;
  liste: Member[] = [];
  liste1: Member[] = [];
  selected: Member;
  x: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,
  ) {
  }

  ngOnInit(): void {
    this.getall();
    this.memberService.getAllMembers().then(x => {
      console.log("HEHEHEHEHEHE",x);
      let x1;
      for (x1 of x) {
        if (!x1.encadrant){
          this.liste.push(x1);
        }
      }
    });
    console.log("the list is here", this.liste);
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.memberService.getMemberById(this.currentItemId).then(item => {
        this.item = item;
        console.log(this.item);
        this.verification = true;
        // if (!!this.item.encadrant){
        // this.memberService.getMemberById(this.item.encadrant_id).then(x => {
        //   this.selected = x;
        // });}
        this.initForm(item);
      }).catch(() => {
        this.initForm(null);
      });
    } else {
      this.initForm1(null);
    }
  }

  initForm(item: Member): void {
    if (!!this.item.encadrant){
      this.action1 = true;
      this.formEtudiant = new FormGroup({
        sujet: new FormControl(item?.sujet),
        diplome: new FormControl(item?.diplome),
        encadrant_id: new FormControl(item?.encadrant_id,[Validators.required]),
        cin: new FormControl(item?.cin, [Validators.required]),
        nom: new FormControl(item?.nom, [Validators.required]),
        prenom: new FormControl(item?.prenom, [Validators.required]),
        dateNaissance: new FormControl(item?.dateNaissance,[Validators.required]),
        // datenaissance: new FormControl(item?.datenaissance,[Validators.required]),
        email: new FormControl(item?.email,[Validators.required]),
        photo: new FormControl(item?.photo),
        cv: new FormControl(item?.cv, [Validators.required]),
        // grade: new FormControl(item?.grade, [Validators.required]),
    });
    }
    else if (!this.item.encadrant) {
      this.index = 1;
      this.action2 = true;
      this.formEnseignant = new FormGroup({
        cin: new FormControl(item?.cin, [Validators.required]),
        nom: new FormControl(item?.nom, [Validators.required]),
        prenom: new FormControl(item?.prenom,[Validators.required]),
        dateNaissance: new FormControl(item?.dateNaissance,[Validators.required]),
        // datenaissance: new FormControl(item?.datenaissance,[Validators.required]),
        email: new FormControl(item?.email,[Validators.required]),
        photo: new FormControl(item?.photo),
        etablissement: new FormControl(item?.etablissement,[Validators.required]),
        grade: new FormControl(item?.grade,[Validators.required]),
        cv: new FormControl(item?.cv, [Validators.required]),
        // grade: new FormControl(item?.grade, [Validators.required]),
      });
    }
  }
  initForm1(item: Member): void {
    // if (!!this.item.encadrant){
      this.formEtudiant = new FormGroup({
        sujet: new FormControl(item?.sujet),
        diplome: new FormControl(item?.diplome),
        encadrant_id: new FormControl(item?.encadrant_id,[Validators.required]),
        cin: new FormControl(item?.cin, [Validators.required]),
        nom: new FormControl(item?.nom, [Validators.required]),
        prenom: new FormControl(item?.prenom, [Validators.required]),
        dateNaissance: new FormControl(item?.dateNaissance,[Validators.required]),
        // datenaissance: new FormControl(item?.datenaissance,[Validators.required]),
        email: new FormControl(item?.email,[Validators.required]),
        photo: new FormControl(item?.photo),

        cv: new FormControl(item?.cv, [Validators.required]),
        // grade: new FormControl(item?.grade, [Validators.required]),
      });
    // }
    // else if (!this.item.encadrant) {
      this.formEnseignant = new FormGroup({
        cin: new FormControl(item?.cin, [Validators.required]),
        nom: new FormControl(item?.nom, [Validators.required]),
        prenom: new FormControl(item?.prenom,[Validators.required]),
        dateNaissance: new FormControl(item?.dateNaissance,[Validators.required]),
        // datenaissance: new FormControl(item?.datenaissance,[Validators.required]),
        email: new FormControl(item?.email,[Validators.required]),
        photo: new FormControl(item?.photo),
        etablissement: new FormControl(item?.etablissement,[Validators.required]),
        grade: new FormControl(item?.grade,[Validators.required]),
        cv: new FormControl(item?.cv, [Validators.required]),
        // grade: new FormControl(item?.grade, [Validators.required]),
      });
    // }
  }
  getall(): void{
    this.memberService.getAllMembers().then(x => {
      console.log("HEHEHEHEHEHE",x);
          this.liste1 = x;
        });
  }

  onSubmitEtudiant(): void {
      let y = '';
      this.form = this.formEtudiant;
      const objectToSubmit: Member = {...this.item, ...this.form.value};
      // this.x = this.memberService.getAllMembers();
      // console.log(this.liste[]);
      this.memberService.saveEtudiant(objectToSubmit);
    console.log('here', this.liste.length);
    // this.getall();
    console.log("herehereherehrerherehrehreh",this.liste1.length)
    if (this.verification === true)
      {
        y = objectToSubmit.id;
      } else if (this.verification === false)   {y = this.liste1[this.liste1.length-1].id + 1;}
    console.log(y);
    this.memberService.affecter(y, objectToSubmit.encadrant_id).then(() => {
        this.router.navigate(['./members']);
      });
  }
    onSubmitEnseignant(): void {
      this.form = this.formEnseignant;
      const objectToSubmit: Member = {...this.item, ...this.form.value};
      this.memberService.saveEnseignant(objectToSubmit).then(() => {
        this.router.navigate(['./members']);
      });
    }
}
