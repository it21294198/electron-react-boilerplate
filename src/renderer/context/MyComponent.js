import React from 'react';

// Import the context and provider
import AppStateContext from './AppStateContext';
import AppStateProvider from './AppStateProvider';

// Create a hook to access the context
const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

// Use the context in a component
const MyComponent = () => {
  const { state, actions } = useAppState();

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={actions.increment}>Increment</button>
      <button onClick={actions.decrement}>Decrement</button>
    </div>
  );
};

export { AppStateProvider, useAppState, MyComponent };
