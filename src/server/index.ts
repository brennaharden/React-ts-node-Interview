import express from "express";
import { json } from "body-parser";
import {facultyController} from "./controllers/facultyController";

const app = express();
app.use(json());

app.get('/api/faculty', facultyController.getFaculty)
app.get('/api/courses', facultyController.getCourses)

app.listen(9000, () => {
    console.log(`Server running on port ${9000}`);
});
