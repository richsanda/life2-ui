import { rangeOfMonths } from "../../utils/data.json";
import MonthBox from "./MonthBox"
import '../../styles/styles.css'

const CountGrid = (props) => {

    const { searchText, countsResponse, maxBoxCount, setSearchResponse } = props;

    return (
        <div className="grid" id="counts">
            <div className="plain-month-box">&nbsp;</div>
            {rangeOfMonths.map((m, index) => {
                return (
                    <div key={`${index}`} className="plain-month-box">{m}</div>
                );
            })}
            {countsResponse.map((monthBox, index) => {
                return (
                    <MonthBox 
                    searchText={searchText}
                    key={`${monthBox.year}.${monthBox.month}.${index}`} 
                    monthBox={monthBox} 
                    selected={false} 
                    maxBoxCount={maxBoxCount}
                    setSearchResponse={setSearchResponse} />
                )
            })}
        </div>
    );
};

export default CountGrid;