import React, { useState, useEffect, Suspense } from 'react';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import endpoints from './constants/endpoints';
import './App.css';

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error('Error fetching routes:', err));
    
    AOS.init({
      duration: 1000,
      once: true,
    }); // Initialize AOS
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
                data-aos="fade-up" //  Add animation here
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
