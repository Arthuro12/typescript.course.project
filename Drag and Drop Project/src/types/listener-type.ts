import { IProjectInfo } from "./project-info";

export type Listener<T> = (items: T[]) => void;
