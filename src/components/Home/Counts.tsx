import React, { useContext, useState } from "react";
import { rangeOfMonths } from "../../utils/data.json";
import ArtifactContext from "../../contexts/ArtifactContext";
import MonthBox from "./OldMonthBox"

const Counts = () => {

    const [artifactsContext, setArtifactsContext] = useContext(ArtifactContext);
    const { searchRequest, countsResponse, maxBoxCount, monthSelected } = artifactsContext;

    return (
        <div className="grid" id="counts">
            <div>&nbsp;</div>
            {rangeOfMonths.map((m, index) => {
                return (
                    <div key={index} className="month-name" data-ng-repeat="m in rangeOfMonths">{m}</div>
                );
            })}
            {/*   <div>&nbsp;</div><!-- empty top left corner -->
        <div class="month-name" data-ng-repeat="m in rangeOfMonths">{{ m }}</div>
         <div
                id="{{'month-box' + $index}}"
                ng-class="monthBox.count != 0 && !monthBox.header ? 'month-box' : 'plain-month-box'"
                data-ng-repeat="monthBox in monthBoxes"
                data-ng-click="monthBox.count != 0 && search($index, monthBox.year, monthBox.month)"
                ng-style="{'background-color' : $index == monthSelected && 'rgba(155, 0, 0, 0.5)' || 'rgba(155,155,155,' + monthBox.count / maxBoxCount * 1.25 + ')', 'border': $index == monthSelected && '1px solid red' || monthBox.count != 0 && !monthBox.header && '1px solid gray' || '1px solid white'}"
                title="{{!monthBox.header && prettyMonthify(monthBox.year, monthBox.month) + ' (' + monthBox.count + ')' }}">
            {{ monthBox.header && monthBox.year.toString().substr(2,3) || '' }}
        </div> */}
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

export default Counts;