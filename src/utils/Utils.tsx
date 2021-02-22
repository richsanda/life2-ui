import { ArtifactCountsResponse } from "../models";

function rangeOfYearMonthsWithCounts(start: number, end: number, results: ArtifactCountsResponse[]): [ArtifactCountsResponse[], number] {

    var countsByKey = {};
    let max: number = 1;

    for (var i = 0; i < results.length; i++) {
        let r = results[i];
        countsByKey[`${r.year}.${r.month}`] = r.count
        max = Math.max(max, r.count)
    }

    results = [];
    for (var y = start; y <= end; y++) {
        let header: ArtifactCountsResponse = {
            header: true,
            year: y,
            month: -1,
            count: 0
        };
        results.push(header);
        for (var m = 0; m < 12; m++) {
            var month = {
                header: false,
                year: y,
                month: m,
                count: countsByKey[`${y}.${m}`]
            }
            results.push(month);
        }
    }

    return [results, max];
}


export { rangeOfYearMonthsWithCounts }