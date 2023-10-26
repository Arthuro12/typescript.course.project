import { ProjectMixin } from "./mixins/project-mixin.js";
import { applyMixin } from "./mixins/project-mixin.js";

import { ProjectItem } from "./project-item.js";

class ProjectListRenderer {
  // private projectList: HTMLLIElement;
  // private projectListTemplate: HTMLTemplateElement;
  private sectionProject: HTMLElement;
  //private targetElement: HTMLDivElement;
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
    const headerProject = this.sectionProject.querySelector("header");
    const ulProjects = this.sectionProject!.querySelector("ul");
    this.renderSection();
    this.renderContent();
    console.log(this.targetElement);
  }

  renderContent() {
    const listId = `${this.state}-projects-list`;
    this.sectionProject.querySelector("ul")!.id = listId;
    this.sectionProject
      .querySelector("header")!
      .querySelector("h2")!.textContent =
      this.state.toUpperCase() + " PROJECTS";
  }

  renderSection() {
    this.targetElement.insertAdjacentElement("beforeend", this.sectionProject);
  }
}

interface ProjectListRenderer extends ProjectMixin {}

export { ProjectListRenderer };
