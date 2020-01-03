import React from 'react';

import { Location } from '@reach/router';

export class OnRouteChangeWorker extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.action();
    }
  }

  render() {
    return null;
  }
}

export const OnRouteChange = ({ action }) => (
  <Location>
    {({ location }) => (
      <OnRouteChangeWorker location={location} action={action} />
    )}
  </Location>
);

export const ScrollToTop = ({ children, location }) => {
  React.useLayoutEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return children;
};
