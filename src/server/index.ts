import express from "express";
import { json } from "body-parser";
import {facultyController} from "./controllers/facultyController";

const app = express();
app.use(json());

app.get('/api/faculty', facultyController.getFaculty)
app.get('/api/courses', facultyController.getCourses)
app.post('/api/faculty/new', facultyController.addToFaculty)
app.put('/api/faculty/status', facultyController.changeStatus)
app.delete('/api/faculty/remove/:id', facultyController.removeFromFaculty)

app.listen(9000, () => {
    console.log(`Server running on port ${9000}`);
});
