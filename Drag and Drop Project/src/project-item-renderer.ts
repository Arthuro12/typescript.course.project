import { Component } from "./component.js";

import { Draggable } from "./types/draggable";
import { IProjectInfo } from "./types/project-info";

import { bindThis } from "./decorators/decorators.js";
import { ProjectState } from "./types/project-state-enum.js";

export class ProjectItemRender
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: IProjectInfo;
  private _peopleNumberText: string;
  constructor(targetId: string, project: IProjectInfo) {
    super("single-project", targetId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  get peopleNumberText(): string {
    return this._peopleNumberText;
  }

  set peopleNumberText(val: string) {
    if (this.project.peopleNumber === 1) {
      this._peopleNumberText = val.replace("Persons", "Person");
    } else {
      this._peopleNumberText = val;
    }
  }

  configure(): void {
    this.attachedElement.addEventListener("dragstart", this.dragStartHandler);
    this.attachedElement.addEventListener("dragend", this.dragEndHandler);
  }

  @bindThis
  dragEndHandler(_: DragEvent) {
    this.project.state = ProjectState.Finished;
  }

  @bindThis
  dragStartHandler(e: DragEvent) {
    e.dataTransfer?.setData("text/plain", this.project.id);
    e.dataTransfer.effectAllowed = "move";
  }

  renderContent(): void {
    this.peopleNumberText = " Persons assigned";
    this.attachedElement.querySelector("h2").textContent = this.project.title;
    this.attachedElement.querySelector("h3").textContent = `${
      this.project.peopleNumber.toString() + this.peopleNumberText
    }`;
    this.attachedElement.querySelector("p").textContent =
      this.project.description;
  }
}
