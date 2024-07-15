// src/App.tsx

import React from 'react';
import { HabitsProvider } from './contexts/HabitsProvider';
import { TodoProvider } from './contexts/TodoProvider';
import RouteHandler from './routes/RouteHandler';
import AuthProvider from './contexts/AuthProvider';
import { EnergyProvider } from './contexts/EnergyProvider';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <EnergyProvider>
        <HabitsProvider>
          <TodoProvider>
            <RouteHandler/>
          </TodoProvider>
        </HabitsProvider>
      </EnergyProvider>
    </AuthProvider>
  );
};

export default App;
