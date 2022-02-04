import React, { useContext } from "react";
import { ArtifactCountsResponse, ArtifactSearchRequest } from "../../models";
import ArtifactAPI from "../../hooks/artifactApi";
import searchRequest from "../../utils/requestTemplates.json";
import ArtifactContext from "../../contexts/ArtifactContext";
import { startOfMonth, endOfMonth } from "../../utils/Utils";

const MonthBox = (props) => {

    const [artifactsContext, setArtifactsContext] = useContext(ArtifactContext);
    const { searchRequest, from, to } = artifactsContext;

    const { searchText, monthBox, selected, index, maxBoxCount } = props;
    const { count, year, month, header} = monthBox;
    const after = startOfMonth(year, month);
    const before = endOfMonth(year, month)
    const request: ArtifactSearchRequest = {
        ...searchRequest,
        "after" : after,
        "before" : before,
        "from" : from,
        "to" : to,
        "text" : searchText
    }

    const opacity = !header && count != 0 ? 0.1 + count * 1.2  / maxBoxCount : 1;

    const monthBoxClick = async () => {

        ArtifactAPI.artifactSearch(request)
            .then((response) => {
                setArtifactsContext({
                    ...artifactsContext,
                    "searchResponse": response
                });
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
            title={`${count}`}
        >
            {header && year.toString().substr(2, 3) || ''} 
        </div>
    )

}

export default MonthBox;