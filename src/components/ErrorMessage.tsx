import React from "react";

type ErrorMessageProps = {
  title?: string;
  body?: string;
};
const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = (props) => {
  const { title = "An error occured", body = "Something went wrong!" } = props;
  return (
    <div className="container" style={{ width: "90%", margin: "5% auto" }}>
      <div className="spark-message spark-message--lg spark-message--error spark-panel">
        <div className="spark-panel__content">
          <i aria-hidden="true" className="spark-message__icon spark-icon-ban spark-icon--fill"></i>
          <div className="spark-message__content">
            <h4 className="spark-message__heading">{title}</h4>
            <p>{body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
