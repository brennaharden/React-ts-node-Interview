import React from "react";
import conexedLogo from "../Conexed-logo.png";

const Header = () => (
    <header className="main-header">
        <section className="logo-holder">
            <img className="conexed-logo" src={conexedLogo} alt="ConexEd"/>
        </section>
        <div className="intro-box">
            <p className="header-intro">React Typescript Test</p>
        </div>
    </header>
);

export default Header;
