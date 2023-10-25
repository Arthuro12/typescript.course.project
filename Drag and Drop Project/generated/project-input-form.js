var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { boundThis } from "./decorators/decorators.js";
import { validate } from "./toolbox/validation-toolbox.js";
class ProjectInfoForm {
    constructor() {
        this.template = document.getElementById("project-input");
        this.targetElement = document.getElementById("app");
        const clone = document.importNode(this.template.content, true);
        this.form = clone.firstElementChild;
        this.form.setAttribute("id", "project-info-form");
        this.inputTitle = this.form.querySelector("#title");
        this.txtDescription = this.form.querySelector("#description");
        this.inputPeopleNumber = this.form.querySelector("#people");
        this.renderForm();
        this.configure();
    }
    clearProjectInputsForm() {
        this.inputTitle.value = "";
        this.inputPeopleNumber.value = "";
        this.txtDescription.value = "";
    }
    configure() {
        this.form.addEventListener("submit", this.submitEventListener);
    }
    getUserInputs() {
        const title = this.inputTitle.value;
        const peopleNumber = +this.inputPeopleNumber.value;
        const description = this.txtDescription.value;
        const titleValidation = {
            value: title,
            required: true,
            minLength: 5,
            maxLength: 20,
        };
        const peopleNumberValidation = {
            value: peopleNumber,
            required: true,
            minValue: 1,
            maxValue: 10,
        };
        const descriptionValidation = {
            value: description,
            required: true,
            minLength: 20,
            maxLength: 40,
        };
        if (!validate(titleValidation) ||
            !validate(peopleNumberValidation) ||
            !validate(descriptionValidation)) {
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
    renderForm() {
        this.targetElement.insertAdjacentElement("afterbegin", this.form);
    }
    submitEventListener(event) {
        event.preventDefault();
        const userInput = this.getUserInputs();
        this.clearProjectInputsForm();
    }
}
__decorate([
    boundThis
], ProjectInfoForm.prototype, "submitEventListener", null);
export { ProjectInfoForm };
