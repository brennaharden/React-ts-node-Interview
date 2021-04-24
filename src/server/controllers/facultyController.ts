const faculty = require('../faculty.json')
const courses = require('../courses.json')
import {Request, Response} from 'express'

export const facultyController = {
    getFaculty: (req: Request, res: Response) => {
        res.status(200).send(faculty)
    },
    getCourses: (req: Request, res: Response) => {
        res.status(200).send(courses)
    }
}

