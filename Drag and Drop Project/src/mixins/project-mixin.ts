export class ProjectMixin {
  constructor(
    private _template: HTMLTemplateElement,
    private _targetElement: HTMLElement
  ) {}

  set targetElement(target: HTMLElement) {
    this._targetElement = target;
  }

  set template(template: HTMLTemplateElement) {
    this._template = template;
  }

  get targetElement() {
    return this._targetElement;
  }

  get template() {
    return this._template;
  }
}

export function applyMixin(derivedClass: any, mixinClasses: any[]) {
  mixinClasses.forEach((currMixinClass) => {
    Object.getOwnPropertyNames(currMixinClass.prototype).forEach(
      (currPropertyName) => {
        Object.defineProperty(
          derivedClass.prototype,
          currPropertyName,
          Object.getOwnPropertyDescriptor(
            currMixinClass.prototype,
            currPropertyName
          ) || Object.create(null)
        );
      }
    );
  });
}
