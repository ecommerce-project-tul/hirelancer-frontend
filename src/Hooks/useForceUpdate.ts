import React from 'react';

export const useForceUpdate = () => {
  return React.useReducer(() => ({}), {})[1] as () => void;
};
