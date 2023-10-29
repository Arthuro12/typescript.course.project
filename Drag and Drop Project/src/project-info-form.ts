import { ProjectMixin } from "./mixins/project-mixin.js";
import { applyMixin } from "./mixins/project-mixin.js";

import { IProjectInfo } from "./types/project-info.js";
import { ValidationRules } from "./types/validable-type.js";
import { ProjectState } from "./types/project-state-enum.js";

import { boundThis } from "./decorators/decorators.js";
import { validate } from "./toolbox/validation-toolbox.js";

import { projectStateManager } from "./project-state-manager.js";

class ProjectInfoForm {
  private static instance: ProjectInfoForm;

  private form: HTMLFormElement;
  private inputPeopleNumber: HTMLInputElement;
  private inputTitle: HTMLInputElement;

  private txtDescription: HTMLTextAreaElement;

  private constructor() {
    applyMixin(ProjectInfoForm, [ProjectMixin]);
    this.template = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.targetElement = document.getElementById("app")! as HTMLDivElement;
    const clone = document.importNode(this.template.content, true);
    this.form = clone.firstElementChild as HTMLFormElement;
    this.form.setAttribute("id", "project-info-form");
    this.inputTitle = this.form.querySelector("#title") as HTMLInputElement;
    this.txtDescription = this.form.querySelector(
      "#description"
    ) as HTMLTextAreaElement;
    this.inputPeopleNumber = this.form.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.renderForm();
    this.configure();
  }

  private clearProjectInputsForm() {
    this.inputTitle.value = "";
    this.inputPeopleNumber.value = "";
    this.txtDescription.value = "";
  }

  private configure() {
    this.form.addEventListener("submit", this.submitEventListener);
  }

  public static getInstance() {
    if (ProjectInfoForm.instance != null) {
      return ProjectInfoForm.instance;
    }
    ProjectInfoForm.instance = new ProjectInfoForm();
    return ProjectInfoForm.instance;
  }

  private getUserInputs(): IProjectInfo {
    const title: string = this.inputTitle.value;
    const peopleNumber: number = +this.inputPeopleNumber.value;
    const description: string = this.txtDescription.value;
    const titleValidation: ValidationRules = {
      value: title,
      required: true,
      minLength: 5,
      maxLength: 20,
    };
    const peopleNumberValidation: ValidationRules = {
      value: peopleNumber,
      required: true,
      minValue: 1,
      maxValue: 10,
    };
    const descriptionValidation: ValidationRules = {
      value: description,
      required: true,
      minLength: 20,
      maxLength: 40,
    };
    if (
      !validate(titleValidation) ||
      !validate(peopleNumberValidation) ||
      !validate(descriptionValidation)
    ) {
      alert("Invalid input, please try again!");
      //@ts-ignore
      return;
    }
    console.log({
      title,
      peopleNumber,
      description,
    });
    return {
      title,
      peopleNumber,
      description,
    };
  }

  private renderForm() {
    this.targetElement.insertAdjacentElement("afterbegin", this.form);
  }

  @boundThis
  private submitEventListener(event: Event) {
    event.preventDefault();
    const userInput: IProjectInfo = this.getUserInputs();
    if (typeof userInput === "object" && userInput != null) {
      const { title, peopleNumber, description } = userInput;
      projectStateManager.addProject(
        title,
        peopleNumber,
        description,
        ProjectState.Activ
      );
      this.clearProjectInputsForm();
    }
  }
}

interface ProjectInfoForm extends ProjectMixin {}

export { ProjectInfoForm };
