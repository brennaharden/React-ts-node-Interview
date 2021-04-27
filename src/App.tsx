import React, { FC, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { useAppSelector } from './redux/hooks'
import { updateFaculty } from './redux/actions'
import axios from 'axios'
import "./styling/App.css";

import Header from "./components/Header";
import LeftArea from "./components/LeftArea";
import RightArea from "./components/RightArea";


const App: FC = () => {
    const { faculty }: {faculty: any[]} = useAppSelector((state) => state.faculty)
    const dispatch = useDispatch()
    useEffect((): void => {
        axios.get('/api/faculty')
        .then((res) => {
            dispatch(updateFaculty(res.data))
        })
    }, [dispatch])
   
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
