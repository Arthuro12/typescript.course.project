import { isValidString } from "./toolbox/validation-toolbox.js";

export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  template: HTMLTemplateElement;
  targetElement: T;
  attachedElement: U;

  constructor(
    templateId: string,
    targetId: string,
    insertAtBeginning: boolean,
    newElementId?: string
  ) {
    this.template = document.getElementById(templateId)! as HTMLTemplateElement;
    this.targetElement = document.getElementById(targetId) as T;
    const clone: DocumentFragment = document.importNode(
      this.template.content,
      true
    );
    this.attachedElement = clone.firstElementChild! as U;
    if (isValidString(newElementId)) {
      this.attachedElement.setAttribute("id", `${newElementId}`);
    }

    this.attach(insertAtBeginning);
  }

  private attach(insertAtBeginning: boolean) {
    this.targetElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.attachedElement
    );
  }
}

export interface Component<T extends HTMLElement, U extends HTMLElement> {
  configure?(): void;
  renderContent?(): void;
}
