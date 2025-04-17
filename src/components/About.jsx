import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import "../css/About.css"

function About({ header }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.about)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <section id="about" className="section">
      <Header title={header} />
      <div className="about-container">
        {data ? (
          <>
            <Fade direction="left" triggerOnce>
              <div className="about-text">
                <ReactMarkdown>{data.about}</ReactMarkdown>
              </div>
            </Fade>
            <Fade direction="right" triggerOnce>
              <div className="about-image-wrapper">
                <img src={data.imageSource} alt="profile" className="about-image" />
              </div>
            </Fade>
          </>
        ) : (
          <FallbackSpinner />
        )}
      </div>
    </section>
  );
}

About.propTypes = { header: PropTypes.string.isRequired };
export default About;
