import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {PublicationModel} from "../../models/publication.model";
import {PublicationService} from "../../services/publication.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../@root/confirm-dialog/confirm-dialog.component";
import {takeUntil} from "rxjs/operators";
import {EventModel} from "../../models/event.model";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id','titre', 'date' ,'lieu',];

  dataSource: EventModel[] = [];

  constructor(
    private eventService: EventService,
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

    this.eventService.getAllEvents().then(data => {
      // @ts-ignore
      this.dataSource = data._embedded.evenements;
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
        this.eventService.removeEventById(id).then(() => this.fetchDataSource());
      }
    });
  }

}
