import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import "../css/About.css";

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
      <div data-aos="fade-right" data-aos-duration="800">
        <Header title={header} />
      </div>

      <div className="about-container">
        {data ? (
          <>
            <div
              className="about-text"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              <ReactMarkdown>{data.about}</ReactMarkdown>
            </div>

            <div
              className="about-image-wrapper"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="1000"
            >
              <img src={data.imageSource} alt="profile" className="about-image" />
            </div>
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
