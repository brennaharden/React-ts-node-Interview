import axios from "axios";
import React, { FC, useState, useEffect } from "react";
import {useDispatch} from 'react-redux'
import {updateCourses} from '../redux/actions'
import "../styling/leftarea.css"

interface Faculty {
    faculty: FacultyObj[]
}

interface FacultyObj {
    id: number;
    nameFirst: string;
    nameLast: string;
    department: string;
    courseIds: number[];
    active: boolean;
}

interface Courses {
    [key: string]: {
        courseName: string;
        section: number;
        studentRegistry: number[];
    }
}

// interface CourseObj {
    
// }
const LeftArea: FC<Faculty> = (props) => {
    const [courses, setCourses] = useState<Courses>({})
    const dispatch = useDispatch()    

useEffect((): void => {
    axios.get('/api/courses')
    .then((res) => {
        setCourses(res.data)
        dispatch(updateCourses(res.data))
    })
}, [dispatch])

const filteredFaculty = props.faculty.filter((elem: FacultyObj) => {
    return elem.active === true
})

const facultyMap = filteredFaculty.map((elem: FacultyObj) => {
    return (
        <div key={elem.id} className="card">
            <h2>{elem.nameFirst} {elem.nameLast}</h2>
            <h3>{elem.department} Department</h3>
            <h3>Courses:</h3>
            <ul>
                {elem.courseIds.map((course: number) => {
                    return (
                        <li>{courses[course].courseName}</li>
                    )
                })}
            </ul>
        </div>
    )
})

return <div>
    <h1>Active Faculty</h1>
    {facultyMap}
    </div>
};

export default LeftArea;
