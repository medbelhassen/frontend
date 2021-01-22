import { Member } from "./member.model";

export interface Enseignant extends Member{
    etablissement: string;
    grade: string;
}