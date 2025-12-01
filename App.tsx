import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Assessment } from './pages/Assessment';
import { Results } from './pages/Results';
import { Scenarios } from './pages/Scenarios';
import { JourneyMapPage } from './pages/JourneyMapPage';
import { TechStack } from './pages/TechStack';
import { OperationsCenter } from './pages/OperationsCenter';
import { UserProvider } from './store/UserContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/results" element={<Results />} />
            <Route path="/scenarios" element={<Scenarios />} />
            <Route path="/scenarios/:id" element={<Scenarios />} /> {/* Reusing list for simplicity in demo */}
            <Route path="/journey-map" element={<JourneyMapPage />} />
            <Route path="/tech-stack" element={<TechStack />} />
            <Route path="/operations-center" element={<OperationsCenter />} />
          </Routes>
        </Layout>
      </HashRouter>
    </UserProvider>
  );
};

export default App;