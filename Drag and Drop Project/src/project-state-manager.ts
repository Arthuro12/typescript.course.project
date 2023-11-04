// import { v4 as uuidv4 } from "uuid";
import { ProjectInfo } from "./project-info.js";
import { State } from "./state.js";

import { IProjectInfo } from "./types/project-info";
import { ProjectState } from "./types/project-state-enum.js";

export class ProjectStateManager extends State<IProjectInfo> {
  private static instance: ProjectStateManager;
  //@ts-ignore
  private projects: IProjectInfo[] = [];

  private constructor() {
    super();
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

    this.projects.push(newProject);

    this.updateListener();
  }

  public static getInstance() {
    if (ProjectStateManager.instance != null) {
      return ProjectStateManager.instance;
    }
    ProjectStateManager.instance = new ProjectStateManager();
    return ProjectStateManager.instance;
  }

  moveProject(projectId: string, newState: ProjectState): void {
    const movedProject: IProjectInfo = this.projects.find((curProject) => {
      return curProject.id === projectId;
    });

    if (movedProject != null) {
      movedProject.state = newState;
      this.updateListener();
    }
  }

  updateListener() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

export const projectStateManager = ProjectStateManager.getInstance();
