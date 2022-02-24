import React, { useState } from "react";
import { ArtifactSearchRequest } from "../../models";
import ArtifactAPI from "../../hooks/artifactApi";
import { startOfMonth, endOfMonth } from "../../utils/Utils";
import { artifactSearch } from "../../utils/requestTemplates.json";

const MonthBox = (props) => {

    const { searchText, monthBox, selected, index, maxBoxCount, setSearchResponse, source } = props;
    const { count, year, month, header} = monthBox;
    const after = startOfMonth(year, month);
    const before = endOfMonth(year, month)
    const request: ArtifactSearchRequest = {
        ...artifactSearch,
        "after" : after,
        "before" : before,
        "text" : searchText,
        "source" : source
    }

    const opacity = !header && count != 0 ? 0.1 + count * 1.2  / maxBoxCount : 1;

    const monthBoxClick = async () => {

        ArtifactAPI.artifactSearch(request)
            .then((response) => {
                setSearchResponse(response);
            })
            .catch(() => {
                alert("error");
            });
    };

    let className = index == selected ? 'selected-month-box' : count && !header ? 'month-box' : 'plain-month-box';
    return (
        <div
            className={`${className}`}
            style={{ opacity: opacity? opacity : 1}}
            key={`${year}.${month}.${count}`}
            onClick={monthBoxClick}
            title={`${month}.${year}: ${count}`}
        >
            {header && year.toString().substr(2, 3) || ''} 
        </div>
    )

}

export default MonthBox;