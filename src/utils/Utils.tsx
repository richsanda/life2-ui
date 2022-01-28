import React from "react";
import moment from "moment";
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
            month: 1,
            count: 0
        };
        results.push(header);
        for (var m = 1; m < 13; m++) {
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

function startOfMonth(year: number, month: number): string {

    month = month - 1; // moment lib is 0-based; backend is 1-based
    return moment().year(year).month(month).clone().startOf('month').format('YYYY-MM-DD');
}

function endOfMonth(year: number, month: number): string {

    month = month - 1; // moment lib is 0-based; backend is 1-based
    return moment().year(year).month(month).clone().endOf('month').format('YYYY-MM-DD');
}

function prettyDate(datestr: string) {
    return datestr ? moment(datestr).format("MMM DD, YYYY").toLowerCase() : "";
}

function bodyify(text) {
    if (!text) return null;
    return renderHTML("<div><br/>" + text.replace(/(?:\r\n|\r|\n)/g, "<br/>") + "</div>");
}

function preify(text) {
    if (!text) return "<div>&nbsp;</div>";
    return renderHTML("<div>&nbsp;</div><div>" + text + "</div>");
}

const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

export { rangeOfYearMonthsWithCounts, startOfMonth, endOfMonth, prettyDate, bodyify, preify }