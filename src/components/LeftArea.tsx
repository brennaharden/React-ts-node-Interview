import axios from "axios";
import React, { FC, useState, useEffect } from "react";
import {useDispatch} from 'react-redux'
import {updateCourses} from '../redux/actions'
import Modal from './Modal'

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

const LeftArea: FC<Faculty> = (props) => {

    const emptyFaculty= {
        id: -1,
        nameFirst: '',
        nameLast: '',
        department: '',
        courseIds: [],
        active: true
    }
    const [courses, setCourses] = useState<Courses>({})
    const [display, setDisplay] = useState(false)
    const [{id, nameFirst, nameLast, department, courseIds, active}, setModalFocal] = useState<FacultyObj>(emptyFaculty)
    const dispatch = useDispatch()    

useEffect((): void => {
    axios.get('/api/courses')
    .then((res) => {
        setCourses(res.data)
        dispatch(updateCourses(res.data))
    })
}, [dispatch])

const openModal = (elem: FacultyObj) => {
    console.log(elem)
    setDisplay(true)
    setModalFocal(elem)
}
const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDisplay(false)
    setModalFocal(emptyFaculty)
}

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
                        <li key={course}>{courses[course].courseName}</li>
                    )
                })}
            </ul>
            <button onClick={() => openModal(elem)}>Change Status</button>
        </div>
    )
})

const focal = (
    <div>
        <h1>{nameFirst} {nameLast}</h1>
        <h2>{department} Department</h2>
        <div className="change-container">
            <select className="dropdown">
                <option>ACTIVE</option>
                <option>SABBATICAL</option>
            </select>
            <div className="dates-container">
                <label htmlFor="start">Leave Date</label>
                <input id="start" type="date"></input>
                <label htmlFor="end">Returning Date</label>
                <input id="end" type="date"></input>
            </div>
        </div>
        <button>Save Changes</button>
    </div>
)

return <div>
    <h1>Active Faculty</h1>
    {facultyMap}
    <Modal display={display} close={closeModal}>
        {focal}
    </Modal>
    </div>
};

export default LeftArea;
