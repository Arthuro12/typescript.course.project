import { ProjectState } from "./project-state-enum";

interface IProjectInfo {
  id?: string;
  title: string;
  peopleNumber: number;
  description: string;
  state?: ProjectState;
}

export { IProjectInfo };
