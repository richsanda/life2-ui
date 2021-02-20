import React from "react";

const Inputs = () => {
    return (
        <p className="input">

            <button ng-click="counts()"><i>go !</i></button>

    &nbsp;&nbsp;&nbsp;&nbsp;from: <input type="text" data-ng-model="from" ng-keypress="enter($event)" />
    to: <input type="text" data-ng-model="to" ng-keypress="enter($event)" />


        </p>
    );
};

export default Inputs;