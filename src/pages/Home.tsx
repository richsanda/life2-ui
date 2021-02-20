import React, { useEffect } from "react";
import Counts from "../components/Home/Counts";
import Inputs from "../components/Home/Inputs";
import Results from "../components/Home/Results";
import Feature from "../components/Home/Feature";

const Home = () => {
    return (
        <>
            <Inputs />
            <Counts />
            <Results />
            <Feature />
        </>
    );
};

export default Home;
