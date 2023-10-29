import { IProjectInfo } from "./types/project-info";
import { ProjectState } from "./types/project-state-enum";

class ProjectInfo implements IProjectInfo {
  private _id: string;
  private _title: string;
  private _peopleNumber: number;
  private _description: string;
  private _state: ProjectState;
  constructor(
    id: string,
    title: string,
    peopleNumber: number,
    description: string,
    state: ProjectState
  ) {
    this._id = id;
    this._title = title;
    this._peopleNumber = peopleNumber;
    this._description = description;
    this._state = state;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get peopleNumber() {
    return this._peopleNumber;
  }

  get description() {
    return this._description;
  }

  get state() {
    return this._state;
  }

  set id(id: string) {
    this._id = id;
  }

  set title(title: string) {
    this._title = title;
  }

  set peopleNumber(peolpleNumber: number) {
    this._peopleNumber = peolpleNumber;
  }

  set description(description: string) {
    this._description = description;
  }

  set state(state: ProjectState) {
    this._state = state;
  }
}

export { ProjectInfo };
