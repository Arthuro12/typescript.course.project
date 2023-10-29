// import { v4 as uuidv4 } from "uuid";

import { IProjectInfo } from "./types/project-info";
import { ProjectInfo } from "./project-info.js";
import { ProjectState } from "./types/project-state-enum.js";
import { Listener } from "./types/listener-type";

export class ProjectStateManager {
  private static instance: ProjectStateManager;

  private listeners: Listener[] = [];
  //@ts-ignore
  private projects: IProjectInfo[] = [];
  // private projects: any[] = [];

  private constructor() {}

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addProject(
    title: string,
    peopleNumber: number,
    description: string,
    state: ProjectState
  ): void {
    const newProject: IProjectInfo = new ProjectInfo(
      //uuidv4(),
      Math.random().toString(),
      title,
      peopleNumber,
      description,
      state
    );
    console.log(this.projects);

    this.projects.push(newProject);

    for (const listenerFn of this.listeners) {
      // listenerFn(JSON.parse(JSON.stringify(this.projects)));
      listenerFn(this.projects.slice());
    }
  }

  public static getInstance() {
    if (ProjectStateManager.instance != null) {
      return ProjectStateManager.instance;
    }
    ProjectStateManager.instance = new ProjectStateManager();
    return ProjectStateManager.instance;
  }
}

export const projectStateManager = ProjectStateManager.getInstance();
