import React from "react";
import ErrorMessage from "./components/ErrorMessage";

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      errorMsg: "",
    };
  }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      errorMsg: error.message,
    };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage title="Something went wrong!" body={this.state.errorMsg} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
