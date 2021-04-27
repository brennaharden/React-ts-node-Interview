import React from "react";
import { useAppSelector } from '../redux/hooks'
import { FacultyObj } from '../dataTypes'

const RightArea = () => {

    const { faculty }: {faculty: any[]} = useAppSelector((state) => state.faculty)

    const sabbaticalGroup = faculty.filter((elem: FacultyObj) => {
        return elem.active === false
    })

    const facultyMap = sabbaticalGroup.map((elem: FacultyObj) => {
        return (
            <div key={elem.id} className="card inactive">
                <h2>{elem.nameFirst} {elem.nameLast}</h2>
                <h3>{elem.department} Department</h3>
                <h3>Leave Date</h3>
                <p>{elem.startDate}</p>
                <h3>Return Date</h3>
                <p>{elem.endDate}</p>
            </div>
        )
    })
return <div>
    <h1 className="title">On Sabbatical</h1>
    {facultyMap}
</div>;

}

export default RightArea;
