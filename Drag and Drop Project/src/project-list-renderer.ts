import { ProjectMixin } from "./mixins/project-mixin.js";
import { applyMixin } from "./mixins/project-mixin.js";

import { IProjectInfo } from "./types/project-info.js";

import { projectStateManager } from "./project-state-manager.js";
import { ProjectState } from "./types/project-state-enum.js";

class ProjectListRenderer {
  private assignedProjects: IProjectInfo[];
  private sectionProject: HTMLElement;
  constructor(private state: "activ" | "finished") {
    applyMixin(ProjectListRenderer, [ProjectMixin]);
    this.template = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    const clone: DocumentFragment = document.importNode(
      this.template.content,
      true
    );
    this.targetElement = document.getElementById("app") as HTMLDivElement;
    this.sectionProject = clone.firstElementChild! as HTMLElement;
    this.sectionProject.setAttribute("id", `${this.state}-projects`);
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
      this.renderProjects();
    });

    this.renderSection();
    this.renderContent();
  }

  public getProjectByState(projectList: IProjectInfo[]) {
    return projectList.filter((project: IProjectInfo) => {
      if (this.state === "activ") {
        return project.state === ProjectState.Activ;
      } else {
        return project.state === ProjectState.Finished;
      }
    });
  }

  private renderProjects() {
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

  private renderContent() {
    const listId = `${this.state}-projects-list`;
    this.sectionProject.querySelector("ul")!.id = listId;
    this.sectionProject
      .querySelector("header")!
      .querySelector("h2")!.textContent =
      this.state.toUpperCase() + " PROJECTS";
  }

  private renderSection() {
    this.targetElement.insertAdjacentElement("beforeend", this.sectionProject);
  }
}

interface ProjectListRenderer extends ProjectMixin {}

export { ProjectListRenderer };
