const faculty = require('../faculty.json')
const courses = require('../courses.json')
import {Request, Response} from 'express'
// import { FacultyObj } from '../../dataTypes'
let id = 7

interface FacultyObj {
    id: number;
    nameFirst: string;
    nameLast: string;
    department: string;
    courseIds: number[];
    active: boolean;
    startDate?: string;
    endDate?: string;
}

export const facultyController = {
    getFaculty: (req: Request, res: Response) => {
        res.status(200).send(faculty)
    },
    getCourses: (req: Request, res: Response) => {
        res.status(200).send(courses)
    },
    addToFaculty: (req: Request, res: Response) => {
        const {nameFirst, nameLast, department, courseIds} = req.body
        const newFaculty = {
            id,
            nameFirst,
            nameLast,
            department,
            courseIds,
            active: true
        }
        faculty.push(newFaculty)
        res.status(200).send(faculty)
        id += 1;
    },
    changeStatus: (req: Request, res: Response) => {
        const {id, active, startDate, endDate} = req.body
        const index = faculty.findIndex((elem: FacultyObj) => elem.id === +id)
        faculty[index]['active'] = active
        faculty[index]['startDate'] = startDate
        faculty[index]['endDate'] = endDate
        faculty[index]['courseIds'] = []
        res.status(200).send(faculty)
    },
    removeFromFaculty: (req: Request, res: Response) => {
        const {id} = req.params
        const index = faculty.findIndex((elem: FacultyObj) => elem.id === +id)
        faculty.splice(index, 1)
        res.status(200).send(faculty)
    }
}

