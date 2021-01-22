import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {PublicationModel} from "../../models/publication.model";
import {PublicationService} from "../../services/publication.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../@root/confirm-dialog/confirm-dialog.component";
import {takeUntil} from "rxjs/operators";
import {OutilModel} from "../../models/outil.model";
import {OutilService} from "../../services/outil.service";

@Component({
  selector: 'app-outil-list',
  templateUrl: './outil-list.component.html',
  styleUrls: ['./outil-list.component.scss']
})
export class OutilListComponent implements OnInit {

  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id',"nom","description",'date', 'source','actions'];

  dataSource: OutilModel[] = [];

  constructor(
    private outilService: OutilService,
    private dialog: MatDialog
  ) {
  }


  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.fetchDataSource();
  }

  private fetchDataSource(): void {

    this.outilService.getAllTools().then(data => {
      // @ts-ignore
      this.dataSource = data._embedded.outils;
      console.log(data);
    });
  }
  onRemove(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.outilService.removeToolById(id).then(() => this.fetchDataSource());
      }
    });
  }

}
