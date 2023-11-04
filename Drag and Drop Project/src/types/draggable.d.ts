export interface Draggable {
  dragEndHandler: (e: DragEvent) => void;
  dragStartHandler: (e: DragEvent) => void;
}
