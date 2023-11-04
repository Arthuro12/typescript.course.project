export interface DragTarget {
  dragLeaveHandler: (e: DragEvent) => void;
  dragOverHandler: (e: DragEvent) => void;
  dropHandler: (e: DragEvent) => void;
}
