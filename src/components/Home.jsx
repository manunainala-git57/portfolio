import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { Fade } from 'react-awesome-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';
import './../App.css'; // make sure your .section styles live here


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

  return (
    <section id="home" className="section home-section">
      {data ? (
        <Fade direction="up" cascade triggerOnce>
          <div style={styles.mainContainer}>
            <h1 style={styles.nameStyle}>{data.name}</h1>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
            <Social />
          </div>
        </Fade>
      ) : (
        <FallbackSpinner />
      )}
    </section>
  );
}

export default Home;