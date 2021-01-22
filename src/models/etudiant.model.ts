import { Member } from "./member.model";

export interface Etudiant extends Member{
    dateInscription: string;
    sujet: string;
    diplome: string;
	  encadrant: string;
}
