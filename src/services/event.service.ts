import {Injectable} from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {Member} from '../models/member.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {PublicationModel} from '../models/publication.model';
import {EventModel} from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private path = `${environment.gatewayEndpoint}/evenement-service`;
  // @ts-ignore
  // public placeholderPublicat: Member[] = GLOBAL._DB.members;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllEvents(): Promise<EventModel[]> {
    return this.httpClient.get<EventModel[]>(`${this.path}/evenements`).toPromise();
  }

  getEventById(id: string): Promise<EventModel> {
    return this.httpClient.get<EventModel>(`${this.path}/evenements/${id}`).toPromise();
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveEvent(event: any): Promise<EventModel> {
    if (!!event.id) {
      return this.updateEvent(event.id, event);
    } else {
      return this.createEvent(event);
    }
  }

  createEvent(event: any): Promise<EventModel> {
    // console.log(member);
    return this.httpClient.post<EventModel>(`${this.path}/evenements`, event).toPromise();
  }

  updateEvent(id: string, event: any): Promise<EventModel> {
    return this.httpClient.put<EventModel>(`${this.path}/evenements/${id}`, event).toPromise();
  }


  removeEventById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`${this.path}/evenements/${id}`).toPromise();
    // this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    // return new Promise(resolve => resolve());
  }

}
