import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);  // Log to confirm the routes are correctly fetched
        setData(res);
      })
      .catch((err) => err);
  }, []);

  return (
    <div className="MainApp">
      <NavBarWithRouter />
      <main className="main">
        {/* Suspense should wrap the Routes, not be inside it */}
        <Suspense fallback={<FallbackSpinner />}>
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* Dynamic Routes */}
            {data &&
              data.sections.map((route) => {
                console.log(`./components/${route.component}.jsx`);
                const SectionComponent = React.lazy(() =>
                  import(`./components/${route.component}.jsx`)
                );
                
                return (
                  <Route
                    key={route.headerTitle}
                    path={route.path}
                    element={<SectionComponent header={route.headerTitle} />}
                  />
                );
              })}
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default MainApp;
