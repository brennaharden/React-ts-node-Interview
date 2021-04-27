import React, {FC, useState} from 'react'
import { FacultyObj } from '../dataTypes'

interface PropTypes {
    modalFocal: FacultyObj,
    removeFaculty: (id: number) => void,
    saveChanges: (e: React.MouseEvent, newStatus: string, startDate: string, endDate: string) => void
}

const Focal: FC<PropTypes> = (props) => {
    const {id, nameFirst, nameLast, department} = props.modalFocal
    const [newStatus, setNewStatus] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    return (
        <div className="focal">
            <h1>{nameFirst} {nameLast}</h1>
            <h2>{department} Department</h2>
            <div className="change-container">
                <select className="dropdown" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewStatus(e.target.value)}>
                    <option value="true">ACTIVE</option>
                    <option value="false">SABBATICAL</option>
                </select>
                <div className={`${newStatus === "false" ? "dates-container" : "none"}`}>
                    <label className="label2" htmlFor="start">Leave Date</label>
                    <input id="start" type="date" value={startDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}></input>
                    <label className="label2" htmlFor="end">Returning Date</label>
                    <input id="end" type="date" value={endDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}></input>
                </div>
            </div>
            <div className="button-container">
                <button onClick={(e) => props.saveChanges(e, newStatus, startDate, endDate)}>Save Changes</button>
                <button id="remove-button" onClick={() => props.removeFaculty(id)}>Remove from Faculty</button>
            </div>
        </div>
    )
}

export default Focal