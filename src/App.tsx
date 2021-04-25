import React, {FC, useEffect, useState} from "react";
import {useDispatch} from 'react-redux'
import { updateFaculty } from './redux/actions'
import axios from 'axios'
import "./styling/App.css";

import Header from "./components/Header";
import LeftArea from "./components/LeftArea";
import RightArea from "./components/RightArea";

const App: FC = () => {
    const [faculty, setFaculty] = useState([])
    const dispatch = useDispatch()
    useEffect((): void => {
        axios.get('/api/faculty')
        .then((res) => {
            setFaculty(res.data)
            dispatch(updateFaculty(res.data))
        })
    }, [dispatch])
    console.log(faculty)
    return (
        <div className="app">
            <Header />
            <section className="main-area">
                <LeftArea faculty={faculty}/>
                <RightArea />
            </section>
        </div>
    );
};

export default App;
