import { Component } from "./component.js";
import { ProjectItemRender } from "./project-item-renderer.js";

import { IProjectInfo } from "./types/project-info";

import { ProjectState } from "./types/project-state-enum.js";

import { projectStateManager } from "./project-state-manager.js";
import { DragTarget } from "./types/drag-target";
import { bindThis } from "./decorators/decorators.js";

class ProjectListRenderer
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  private assignedProjects: IProjectInfo[];
  constructor(private state: "activ" | "finished") {
    super("project-list", "app", false, `${state}-projects`);
    projectStateManager.addListener((projectList: IProjectInfo[]) => {
      let renderedProjectList: IProjectInfo[] = [];
      let projectsToRender: IProjectInfo[] = [];
      projectsToRender = this.getProjectsByState(projectList);
      this.assignedProjects = projectsToRender;
      this.configure();
      this.renderUlListProjects();
    });
    this.renderContent();
  }

  configure(): void {
    this.attachedElement.addEventListener("dragover", this.dragOverHandler);
    this.attachedElement.addEventListener("dragleave", this.dragLeaveHandler);
    this.attachedElement.addEventListener("drop", this.dropHandler);
  }

  @bindThis
  dragLeaveHandler(_: DragEvent): void {
    const ulElement = this.attachedElement.querySelector("ul");
    ulElement.classList.remove("droppable");
  }

  @bindThis
  dragOverHandler(e: DragEvent): void {
    e.preventDefault();
    const ulElement = this.attachedElement.querySelector("ul");
    ulElement.setAttribute("class", "droppable");
  }

  @bindThis
  dropHandler(e: DragEvent): void {
    const finishedProjectId: string = e.dataTransfer.getData("text/plain");
    projectStateManager.moveProject(
      finishedProjectId,
      this.state === "activ" ? ProjectState.Activ : ProjectState.Finished
    );
  }

  public getProjectsByState(projectList: IProjectInfo[]): IProjectInfo[] {
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
    this.attachedElement.querySelector("ul")!.id = listId;
    this.attachedElement
      .querySelector("header")!
      .querySelector("h2")!.textContent =
      this.state.toUpperCase() + " PROJECTS";
  }

  private renderUlListProjects(): void {
    const liElement = document.getElementById(`${this.state}-projects-list`);
    liElement.innerHTML = "";
    for (const currProject of this.assignedProjects) {
      new ProjectItemRender(
        this.attachedElement.querySelector("ul").id,
        currProject
      );
    }
  }
}

export { ProjectListRenderer };
