// src/App.tsx

import React from 'react';
import { HabitsProvider } from './contexts/HabitsProvider';
import { TodoProvider } from './contexts/TodoProvider';
import RouteHandler from './routes/RouteHandler';
import AuthProvider from './contexts/AuthProvider';

const App: React.FC = () => {
  return (
   <AuthProvider>
      <HabitsProvider>
        <TodoProvider>
          <RouteHandler/>
        </TodoProvider>
      </HabitsProvider>
    </AuthProvider>
  );
};

export default App;
