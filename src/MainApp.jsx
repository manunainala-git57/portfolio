// MainApp.jsx
import React, { useState, useEffect, Suspense } from 'react';
import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';
import './App.css'; // Make sure this exists and includes new styles

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error('Error fetching routes:', err));
  }, []);

  return (
    <div className="MainApp">
      <NavBarWithRouter />
      <main className="main">
        <Suspense fallback={<FallbackSpinner />}>
          
          {data?.sections?.map((route) => {
            if (!route.component || !route.path) return null;

            const SectionComponent = React.lazy(() =>
              import(`./components/${route.component}.jsx`)
            );

            return (
              <section
                id={route.path.replace('/', '')}
                className="section"
                key={route.headerTitle}
              >
                <SectionComponent header={route.headerTitle} />
              </section>
            );
          })}
        </Suspense>
      </main>
    </div>
  );
}

export default MainApp;
