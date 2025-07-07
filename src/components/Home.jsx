import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';
import 'aos/dist/aos.css'; 
import './../App.css'; 
import styled from 'styled-components';



const styles = {
  nameStyle: {
    fontSize: '5em',
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const ResumeButton = styled.button`
  padding: 10px 24px;
  background-color: ${({ theme }) => theme.color};  /* In light mode, this is dark text color */
  color: ${({ theme }) => theme.background};        /* Text color is background color */
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    opacity: 0.85;
  }
`;

 return (
  <section id="home" className="section home-section">
    {data ? (
      <div style={styles.mainContainer}>
        <h1
          style={styles.nameStyle}
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          {data.name}
        </h1>

        <div
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          data-aos="zoom-in"
          data-aos-delay="300"
          data-aos-duration="1200"
        >
          <h2 style={styles.inlineChild}>
            <Typewriter
              options={{
                loop: true,
                autoStart: true,
                strings: data.roles,
              }}
            />
          </h2>
        </div>

        <div data-aos="fade-up" data-aos-delay="600">
          <Social />
        </div>

       <div data-aos="fade-up" data-aos-delay="800" style={{ marginTop: '20px' }}>
        <a
          href=  "https://drive.google.com/file/d/1azYT1fcu977SoAhEOQLxDzi6y-CFY-3U/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <ResumeButton>View Resume</ResumeButton>
        </a>
      </div>

      </div>
    ) : (
      <FallbackSpinner />
    )}
  </section>
);

}

export default Home;
