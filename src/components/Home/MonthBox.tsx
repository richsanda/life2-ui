import React, { useContext } from "react";
import { ArtifactCountsResponse, ArtifactSearchRequest } from "../../models";
import CorrespondenceApi from "../../hooks/correspondenceApi";
import searchRequest from "../../utils/requestTemplates.json";
import ArtifactContext from "../../contexts/ArtifactContext";
import { startOfMonth, endOfMonth } from "../../utils/Utils";

const MonthBox = (props) => {

    const [artifactsContext, setArtifactsContext] = useContext(ArtifactContext);
    const { searchRequest, from, to } = artifactsContext;

    const { monthBox, selected, index, maxBoxCount } = props;
    const { count, year, month, header} = monthBox;
    const after = startOfMonth(year, month);
    const before = endOfMonth(year, month)
    const request: ArtifactSearchRequest = {
        ...searchRequest,
        "after" : after,
        "before" : before,
        "from" : from,
        "to" : to
    }

    const monthBoxClick = async () => {

        CorrespondenceApi.artifactSearch(request)
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

    let className = count != 0 && !header ? 'month-box' : 'plain-month-box';
    let background = index == selected && 'rgba(155, 0, 0, 0.5)' || 'rgba(155,155,155,' + count / maxBoxCount * 1.25 + ')' || 'rgba(155,155,155,0)';
    let border = index == selected && '1px solid red' || count > 0 && '1px solid gray' || '1px solid white'
    return (
        <div
            className={`${className}`}
            style={{ background: `${background}`, border: `${border}` }}
            key={`${year}.${month}.${count}`}
            onClick={monthBoxClick}
        >
            {header && year.toString().substr(2, 3) || ''} 
            {/* !monthBox.header && monthBox.count */}
        </div>
    )

}

export default MonthBox;