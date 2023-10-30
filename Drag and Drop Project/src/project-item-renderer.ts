import { Component } from "./component.js";

import { IProjectInfo } from "./types/project-info";

export class ProjectItemRender extends Component<
  HTMLUListElement,
  HTMLLIElement
> {
  private project: IProjectInfo;
  constructor(targetId: string, project: IProjectInfo) {
    super("single-project", targetId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  configure(): void {}

  renderContent(): void {
    this.attachedElement.querySelector("h2").textContent = this.project.title;
    this.attachedElement.querySelector(
      "h3"
    ).textContent = `Number of participants: ${this.project.peopleNumber.toString()}`;
    this.attachedElement.querySelector("p").textContent =
      this.project.description;
  }
}
