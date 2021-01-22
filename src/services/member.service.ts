import {Injectable} from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {Member} from '../models/member.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private path = `${environment.gatewayEndpoint}/membre-service`;
  // @ts-ignore
  public placeholderMembers: Member[] = GLOBAL._DB.members;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllMembers(): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`${this.path}/membres`).toPromise();
  }

  getMemberById(id: string): Promise<Member> {
    return this.httpClient.get<Member>(`${this.path}/membres/${id}`).toPromise();
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveEtudiant(member: any): Promise<Member> {
    if (!!member.id) {
      return this.updateEtudiant(member.id, member);
    } else {
      return this.createEtudiant(member);
    }
  }
  saveEnseignant(member: any): Promise<Member> {
    if (!!member.id) {
      return this.updateEnseignant(member.id, member);
    } else {
      return this.createEnseignant(member);
    }
  }
  createEtudiant(member: any): Promise<Member> {
    return this.httpClient.post<Member>(`${this.path}/membres/etudiant`, member).toPromise();
  }
  createEnseignant(member:any): Promise<Member>{
    return this.httpClient.post<Member>(`${this.path}/membres/enseignant`, member).toPromise();
  }

  updateEtudiant(id: string, member: any): Promise<Member> {
    return this.httpClient.put<Member>(`${this.path}/membres/etudiant/${id}`, member).toPromise();
  }
  updateEnseignant(id: string, member: any): Promise<Member> {
    return this.httpClient.put<Member>(`${this.path}/membres/enseignant/${id}`, member).toPromise();
  }


  removeMemberById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`${this.path}/member/delete/${id}`).toPromise();
    // this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    // return new Promise(resolve => resolve());
  }
  affecter(ide: string, iden: string): Promise<Member>{
    const params = {
      idetd: ide,
      idens: iden,
    };
    return this.httpClient.put<Member>(`${this.path}/membres/etudiant`, {},{params}).toPromise();
  }

}
