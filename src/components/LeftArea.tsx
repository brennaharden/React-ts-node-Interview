import React, { FC, useState, useEffect} from "react";
import axios from "axios";
import {useDispatch} from 'react-redux'
import {updateCourses, updateFaculty} from '../redux/actions'
import { FacultyObj, Faculty, Courses } from '../dataTypes'
import Modal from './Modal'
import Focal from './Focal'
import NewFaculty from './NewFaculty'

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
    const [display2, setDisplay2] = useState(false)
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
    setDisplay2(false)
    setModalFocal(emptyFaculty)
}

const saveChanges = (e: React.MouseEvent, newStatus: string, startDate: string, endDate: string) => {

    const body = {
        id,
        active: newStatus === "false" ? false : true,
        startDate,
        endDate
    }

    axios.put('/api/faculty/status', body)
        .then(res => {
            dispatch(updateFaculty(res.data))

        })
        .catch(err => console.log(err))
        
    closeModal(e)
}

const removeFaculty = (id: number) => {
    axios.delete(`/api/faculty/remove/${id}`)
    .then(res => {
        dispatch(updateFaculty(res.data))
    })
    .catch(err => console.log(err))
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

return <div>
    <h1>Active Faculty</h1>
    <button onClick={() => setDisplay2(true)}>Create New Faculty Member</button>
    {facultyMap}
    <Modal display={display} close={closeModal}>
        <Focal modalFocal={{id, nameFirst, nameLast, department, courseIds, active}} removeFaculty={removeFaculty} saveChanges={saveChanges}/>
    </Modal>
    <Modal display={display2} close={closeModal}>
        <NewFaculty close={closeModal}/>
    </Modal>
    </div>
};

export default LeftArea;
