import React from "react";
import { useAppSelector } from '../redux/hooks'

interface FacultyObj {
    id: number;
    nameFirst: string;
    nameLast: string;
    department: string;
    courseIds: number[];
    active: boolean;
}

const RightArea = () => {

    const { faculty }: {faculty: any[]} = useAppSelector((state) => state.faculty)
    console.log(faculty)

    const sabbaticalGroup = faculty.filter((elem: FacultyObj) => {
        return elem.active === false
    })

    const facultyMap = sabbaticalGroup.map((elem: FacultyObj) => {
        return (
            <div key={elem.id} className="card">
                <h2>{elem.nameFirst} {elem.nameLast}</h2>
                <h3>{elem.department} Department</h3>
                {/* <h3>Courses:</h3>
                <ul>
                    {elem.courseIds.map((course: number) => {
                        return (
                            <li>{courses[course].courseName}</li>
                        )
                    })}
                </ul> */}
            </div>
        )
    })
return <div>
    <h1>On Sabbatical</h1>
    {facultyMap}
</div>;

}

export default RightArea;
