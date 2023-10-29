import { Component } from "./component.js";

import { IProjectInfo } from "./types/project-info.js";

import { ProjectState } from "./types/project-state-enum.js";

import { projectStateManager } from "./project-state-manager.js";

class ProjectListRenderer extends Component<HTMLDivElement, HTMLElement> {
  private assignedProjects: IProjectInfo[];
  constructor(private state: "activ" | "finished") {
    super("project-list", "app", false, `${state}-projects`);
    projectStateManager.addListener((projectList: IProjectInfo[]) => {
      let renderedProjectList: IProjectInfo[] = [];
      let projectsToRender: IProjectInfo[] = [];
      if (projectList.length > 1) {
        renderedProjectList = projectList.slice(projectList.length - 1);
        projectsToRender = this.getProjectByState(renderedProjectList);
      } else {
        projectsToRender = this.getProjectByState(projectList);
      }
      this.assignedProjects = projectsToRender;
      this.renderUlListProjects();
    });

    this.renderContent();
  }

  configure(): void {}

  public getProjectByState(projectList: IProjectInfo[]) {
    return projectList.filter((project: IProjectInfo) => {
      if (this.state === "activ") {
        return project.state === ProjectState.Activ;
      } else {
        return project.state === ProjectState.Finished;
      }
    });
  }

  renderContent(): void {
    const listId = `${this.state}-projects-list`;
    console.log(listId);
    this.attachedElement.querySelector("ul")!.id = listId;
    this.attachedElement
      .querySelector("header")!
      .querySelector("h2")!.textContent =
      this.state.toUpperCase() + " PROJECTS";
  }

  private renderUlListProjects() {
    const ulElementProjects: HTMLUListElement = document.getElementById(
      `${this.state}-projects-list`
    ) as HTMLUListElement;
    for (const currProject of this.assignedProjects) {
      const liProjectTitle = document.createElement("li");
      const foundProject = this.assignedProjects.filter(
        (curAssignedProject: IProjectInfo) => {
          return curAssignedProject.id === currProject.id;
        }
      );
      if (foundProject != null) {
        liProjectTitle.textContent = currProject.title;
        ulElementProjects.appendChild(liProjectTitle);
      }
    }
  }
}

// interface ProjectListRenderer extends ProjectMixin {}

export { ProjectListRenderer };
