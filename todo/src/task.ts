import { getRandomString } from "./utils";
import { ID_LENGTH } from "./constant";

export interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  toggleCompleted: () => void;
}

export class Task implements ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  constructor(title = "", description = "", completed = false) {
    this.id = getRandomString(ID_LENGTH);
    this.title = title;
    this.description = description;
    this.completed = completed;
  }

  toggleCompleted = () => {
    this.completed = !this.completed;
  };
}
