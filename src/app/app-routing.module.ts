import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MemberListComponent} from './member-list/member-list.component';
import {MemberFormComponent} from './member-form/member-form.component';
import {PublicationFormComponent} from './publication-form/publication-form.component';
import {PublicationListComponent} from './publication-list/publication-list.component';
import {OutilListComponent} from './outil-list/outil-list.component';
import {OutilFormComponent} from './outil-form/outil-form.component';
import {EventListComponent} from './event-list/event-list.component';
import {EventFormComponent} from './event-form/event-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'members',
  },
  {
    path: 'members',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MemberListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: MemberFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: MemberFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'publications',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PublicationListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: PublicationFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: PublicationFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'outils',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: OutilListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: OutilFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: OutilFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'evenements',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EventListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: EventFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: EventFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'member-form',
    pathMatch: 'full',
    component: MemberFormComponent,
  },
  {
    path: '**',
    redirectTo: 'members',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
