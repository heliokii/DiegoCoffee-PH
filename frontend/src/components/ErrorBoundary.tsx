import React, { Component, ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[200px] items-center justify-center p-6">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-800">
            <p className="font-medium">Something went wrong.</p>
            <p className="mt-2 text-sm">Refresh the page or try again later.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
