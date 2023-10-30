import { Component } from "./component.js";

import { IProjectInfo } from "./types/project-info";
import { ValidationRules } from "./types/validable-type";
import { ProjectState } from "./types/project-state-enum.js";

import { boundThis } from "./decorators/decorators.js";
import { validate } from "./toolbox/validation-toolbox.js";

import { projectStateManager } from "./project-state-manager.js";

class ProjectInfoForm extends Component<HTMLDivElement, HTMLFormElement> {
  private static instance: ProjectInfoForm;
  private inputPeopleNumber: HTMLInputElement;
  private inputTitle: HTMLInputElement;

  private txtDescription: HTMLTextAreaElement;

  private constructor() {
    super("project-input", "app", true, "project-info-form");
    this.configure();
  }

  private clearProjectInputsForm() {
    this.inputTitle.value = "";
    this.inputPeopleNumber.value = "";
    this.txtDescription.value = "";
  }

  configure() {
    this.template = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.inputTitle = this.attachedElement.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.txtDescription = this.attachedElement.querySelector(
      "#description"
    ) as HTMLTextAreaElement;
    this.inputPeopleNumber = this.attachedElement.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.attachedElement.addEventListener("submit", this.submitEventListener);
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

export { ProjectInfoForm };
