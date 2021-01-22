import {Injectable} from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {Member} from '../models/member.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {PublicationModel} from '../models/publication.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private path = `${environment.gatewayEndpoint}/publication-service`;
  // @ts-ignore
  // public placeholderPublicat: Member[] = GLOBAL._DB.members;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllPublication(): Promise<PublicationModel[]> {
    return this.httpClient.get<PublicationModel[]>(`${this.path}/publications`).toPromise();
  }

  getPublicationById(id: string): Promise<PublicationModel> {
    return this.httpClient.get<PublicationModel>(`${this.path}/publications/${id}`).toPromise();
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  savePublication(publication: any): Promise<PublicationModel> {
    if (!!publication.id) {
      return this.updatePublication(publication.id, publication);
    } else {
      return this.createPublication(publication);
    }
  }

  createPublication(publication: any): Promise<PublicationModel> {
    // console.log(member);
    return this.httpClient.post<PublicationModel>(`${this.path}/publications`, publication).toPromise();
  }

  updatePublication(id: string, publication: any): Promise<PublicationModel> {
    return this.httpClient.put<PublicationModel>(`${this.path}/publications/${id}`, publication).toPromise();
  }


  removePublicationById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`${this.path}/publications/${id}`).toPromise();
    // this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    // return new Promise(resolve => resolve());
  }

}
