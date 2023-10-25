import { ProjectInfo } from "./types/project-input.js";
import { ValidationRules } from "./types/validable-type.js";

import { boundThis } from "./decorators/decorators.js";
import { validate } from "./toolbox/validation-toolbox.js";

class ProjectInfoForm {
  private form: HTMLFormElement;
  private inputPeopleNumber: HTMLInputElement;
  private inputTitle: HTMLInputElement;
  private targetElement: HTMLDivElement;
  private template: HTMLTemplateElement;
  private txtDescription: HTMLTextAreaElement;

  constructor() {
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

  private getUserInputs(): ProjectInfo {
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
    const userInput: ProjectInfo = this.getUserInputs();
    this.clearProjectInputsForm();
  }
}

export { ProjectInfoForm };