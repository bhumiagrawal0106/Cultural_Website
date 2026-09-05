import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error('[ErrorBoundary]', error);
  }

  render() {
    const { error } = this.state;
    const { fallback, children } = this.props;
    if (error) {
      return typeof fallback === 'function' ? fallback(error) : fallback || null;
    }
    return children;
  }
}
