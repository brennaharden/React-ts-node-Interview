import { Action, Action2 } from "./reduxTypes"

export const UPDATE_FACULTY = 'UPDATE_FACULTY'
export const UPDATE_COURSES = 'UPDATE_COURSES'

export const updateFaculty: Action = (payload: []) => {
    return {
        type: UPDATE_FACULTY,
        payload
    }
}

export const updateCourses: Action2 = (payload: {}) => {
    return {
        type: UPDATE_COURSES,
        payload
    }
}