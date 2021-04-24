import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { default as faculty } from './reducers/facultyReducer'
import { default as courses } from './reducers/coursesReducer'

const rootReducer = combineReducers({
    faculty, courses
})
export const store = createStore(rootReducer, composeWithDevTools())

