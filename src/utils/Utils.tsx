import moment from "moment";
import React from "react";
import { ArtifactCountsResponse } from "../models";

function rangeOfYearMonthsWithCounts(start: number, end: number, results: ArtifactCountsResponse[]): [ArtifactCountsResponse[], number] {

    var countsByKey = {};
    let max: number = 0.01;

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
    return datestr ? moment(datestr).format("D MMM YY").toLowerCase() : "";
}

function dateDiff(date1: Date, date2: Date) {
    if (!date1 || !date2) return 0;
    return moment(date2).diff(moment(date1));
}

function timelineFill(timelineStart: Date, timelineEnd: Date, fillStart: Date, fillEnd: Date) {
    let total = dateDiff(timelineStart, timelineEnd);
    let start = dateDiff(timelineStart, fillStart);
    let width = dateDiff(fillStart, fillEnd);
    if (! start) return [0, 0];
    start = Math.round(100 * start / total);
    if (! width) return [start, 1]
    width = Math.round(Math.max(100 * width / total, 1));
    return [start, width];
}

const noteExpression = /[#@!$]\[([a-zA-Z0-9._: -]*)\]\([a-zA-Z0-9._: -]*\)/g;

function prettyNote(str : string) {
    return str ? str.replace(noteExpression, (exp, text) => `[${text}]`) : ""
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

const updateToken = () => {
    const username = "rich";
    const password = "yahdude4747";
    sessionStorage.setItem("token", Buffer.from(`${username}:${password}`).toString('base64'));
}

export { rangeOfYearMonthsWithCounts, startOfMonth, endOfMonth, prettyDate, timelineFill, prettyNote, bodyify, preify, updateToken }