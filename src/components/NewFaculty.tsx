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
        <h3>Complete the following form to create a new faculty member:</h3>
        <input value={nameFirst} placeholder="First Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameFirst(e.target.value)}></input>
        <input value={nameLast} placeholder="Last Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameLast(e.target.value)}></input>
        <input value={department} placeholder="Department" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDepartment(e.target.value)}></input>
        <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCourseIds([...courseIds, +e.target.value])}>
            {courseMap}
        </select>
        <button onClick={createNewFaculty}>Submit</button>
    </div>
    )
}

export default NewFaculty