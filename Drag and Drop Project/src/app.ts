import { ProjectInfoForm } from "./project-info-form.js";
import { ProjectListRenderer } from "./project-list-renderer.js";

// const newProject = new ProjectInfoForm();
const projectForm = ProjectInfoForm.getInstance();
const activProjects = new ProjectListRenderer("activ");
const finishedProjects = new ProjectListRenderer("finished");
