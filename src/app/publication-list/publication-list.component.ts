import { Component, OnInit } from '@angular/core';
import {PublicationService} from '../../services/publication.service';
import {PublicationModel} from '../../models/publication.model';
import {Subject} from 'rxjs';
import {ConfirmDialogComponent} from '../../@root/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {

  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id','titre', 'type', 'dateApparition', 'lien', 'sourcePDF'];

  dataSource: PublicationModel[] = [];

  constructor(
    private publicationService: PublicationService,
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

    this.publicationService.getAllPublication().then(data => {
      // @ts-ignore
      this.dataSource = data._embedded.publications;
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
        this.publicationService.removePublicationById(id).then(() => this.fetchDataSource());
      }
    });
  }

}
