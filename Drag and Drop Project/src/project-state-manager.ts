import { v4 as uuidv4 } from "uuid";
import { ProjectInfo } from "./types/project-info.js";

export class ProjectStateManager {
  private static instance: ProjectStateManager;

  private listeners: any[] = [];
  //@ts-ignore
  private projects: ProjectInfo & { id: string }[] = [];
  // private projects: any[] = [];

  private constructor() {}

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, peopleNumber: number, description: string): void {
    const newProject: ProjectInfo & { id: string } = {
      id: uuidv4(),
      title: title,
      peopleNumber: peopleNumber,
      description: description,
    };

    this.projects.push(newProject);

    for (const listenerFn of this.listeners) {
      listenerFn(JSON.parse(JSON.stringify(this.projects)));
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
