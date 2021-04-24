import {ActionObject} from "../reduxTypes"
import { UPDATE_COURSES } from "../actions"

const initialState = {
    courses: {}
}

export default function reducer(state = initialState, action: ActionObject) {
    const {type, payload} = action
    switch(type){
        case UPDATE_COURSES:
            return {...state, courses: payload}
        default: return state
    }
}