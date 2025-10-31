export interface CompetationModel {
CompetationId?: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}
export interface RegisterModel {
  userId?: number;
  fullName: string;
  email: string;
  password: string;
  collageName: string;
  role: string
}

export interface Project{
  submissionId? : number;
  userId?: number;
  CompetationId?: number;
  projectTitle: string;
  description:string;
  githublink:string;
  submissionDate:string;
  status:string;
  rank:number;
}