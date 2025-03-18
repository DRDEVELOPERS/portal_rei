// app/components/ErrorBoundary.js
"use client";

import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: null,
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="font-bold mb-2">Algo deu errado!</h2>
          <p className="text-gray-700 mb-4">
            {/* Safe access using optional chaining */}
            {this.state.error?.message || "Erro desconhecido no aplicativo"}
          </p>
          <button
            onClick={this.reset}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Tentar novamente
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
