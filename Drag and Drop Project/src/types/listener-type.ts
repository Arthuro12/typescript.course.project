import { IProjectInfo } from "./project-info";

export type Listener = (projects: IProjectInfo[]) => void;
