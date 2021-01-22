import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {OutilModel} from '../models/outil.model';

@Injectable({
  providedIn: 'root'
})
export class OutilService {
  private path = `${environment.gatewayEndpoint}/outil-service`;
  // @ts-ignore
  // public placeholderPublicat: Member[] = GLOBAL._DB.members;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllTools(): Promise<OutilModel[]> {
    return this.httpClient.get<OutilModel[]>(`${this.path}/outils`).toPromise();
  }

  getToolById(id: string): Promise<OutilModel> {
    return this.httpClient.get<OutilModel>(`${this.path}/outils/${id}`).toPromise();
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveTool(outil: any): Promise<OutilModel> {
    if (!!outil.id) {
      return this.updateTool(outil.id, outil);
    } else {
      return this.createTool(outil);
    }
  }

  createTool(outil: any): Promise<OutilModel> {
    // console.log(member);
    return this.httpClient.post<OutilModel>(`${this.path}/outils`, outil).toPromise();
  }

  updateTool(id: string, outil: any): Promise<OutilModel> {
    return this.httpClient.put<OutilModel>(`${this.path}/outils/${id}`, outil).toPromise();
  }


  removeToolById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`${this.path}/outils/${id}`).toPromise();
    // this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    // return new Promise(resolve => resolve());
  }

}
