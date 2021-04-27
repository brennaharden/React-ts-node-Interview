import React, {FC, useState} from 'react'
import axios from 'axios'
import { useAppSelector } from '../redux/hooks'
import { useDispatch } from 'react-redux'
import { Courses, NumArray } from '../dataTypes'
import { updateFaculty } from '../redux/actions'

interface PropsType {
    close: (e: React.MouseEvent) => void
}

const NewFaculty: FC<PropsType> = (props) => {
    
    const { courses }: {courses: Courses} = useAppSelector((state) => state.courses)
    const [nameFirst, setNameFirst] = useState('')
    const [nameLast, setNameLast] = useState('')
    const [department, setDepartment] = useState('')
    const [courseIds, setCourseIds] = useState<NumArray>([])
    const dispatch = useDispatch()

    const createNewFaculty = (e: React.MouseEvent) => {
        const body = {
            nameFirst,
            nameLast,
            department,
            courseIds
        }
        axios.post('/api/faculty/new', body)
            .then(res => {
                dispatch(updateFaculty(res.data))
            })
            .catch(err => console.log(err))
        props.close(e)
    }

    const courseMap = Object.keys(courses).map((id: string) => {
        return (
            <option key={id} value={id}>{courses[id].courseName} Section {courses[id].section}</option>
        )
    })

    return (
    <div>
        <h1>Create New</h1>
        <h3 className="subtitle">Complete the following form to add a new faculty member.</h3>
        <div className="input-container">
            <div className="input-stack">
                <label htmlFor="first-name">First Name</label>
                <input id="first-name" value={nameFirst} placeholder="e.g. Jane" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameFirst(e.target.value)}></input>
            </div>
            <div className="input-stack">
                <label htmlFor="last-name">Last Name</label>
                <input id="last-name" value={nameLast} placeholder="e.g. Fairfax" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameLast(e.target.value)}></input>
            </div>
        </div>
        <div className="input-container">
            <div className="input-stack">
                <label htmlFor="department">Department</label>
                <input id="department" value={department} placeholder="e.g. Physics" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDepartment(e.target.value)}></input>
            </div>
            <div className="select-stack">
                <label htmlFor="courses">Select course by section:</label>
                <select id="courses" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCourseIds([...courseIds, +e.target.value])}>
                    {courseMap}
                </select>
            </div>
        </div>
        <button onClick={createNewFaculty}>Submit</button>
    </div>
    )
}

export default NewFaculty