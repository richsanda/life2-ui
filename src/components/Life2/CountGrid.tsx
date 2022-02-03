import React, { useContext, useState } from "react";
import { rangeOfMonths } from "../../utils/data.json";
import ArtifactContext from "../../contexts/ArtifactContext";
import MonthBox from "./MonthBox"
import '../../styles/styles.css'

const CountGrid = () => {

    const [artifactsContext, setArtifactsContext] = useContext(ArtifactContext);
    const { searchRequest, countsResponse, maxBoxCount, monthSelected } = artifactsContext;

    return (
        <div className="grid" id="counts">
            <div className="plain-month-box">&nbsp;</div>
            {rangeOfMonths.map((m, index) => {
                return (
                    <div key={index} className="plain-month-box" data-ng-repeat="m in rangeOfMonths">{m}</div>
                );
            })}
            {countsResponse.map((monthBox, index) => {
                return (
                    <MonthBox 
                    key={`${monthBox.year}.${monthBox.month}`} 
                    monthBox={monthBox} 
                    selected={false} 
                    maxBoxCount={maxBoxCount} />
                )
            })}
        </div>
    );
};

export default CountGrid;