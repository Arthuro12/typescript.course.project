export class DragAndDrop {
  private draggableElement: HTMLUListElement;
  private dropZone: HTMLUListElement;
  constructor(sourceElemntId: string, targetElementId: string) {
    this.draggableElement = document.querySelector(`#${sourceElemntId}`);
    this.draggableElement.draggable = true;
    this.dropZone = document.querySelector(`#${targetElementId}`);
  }

  configure(): void {
    this.draggableElement.addEventListener("drag", this.drag.bind(this));
    this.dropZone.addEventListener("dragover", this.dragOver.bind(this));
    this.dropZone.addEventListener("drop", this.drop.bind(this));
  }

  private drag(e: Event): void {
    e.preventDefault();
  }

  private dragOver(e: Event): void {
    e.preventDefault();
  }

  private drop(e: Event): void {
    this.draggableElement.parentNode.removeChild(this.draggableElement);
    this.dropZone.insertAdjacentElement("afterbegin", this.draggableElement);
  }
}
