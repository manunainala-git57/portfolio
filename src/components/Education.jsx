import React, { useEffect, useState, useContext } from 'react';
import { Chrono } from 'react-chrono';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import '../css/education.css';

function Education(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [width, setWidth] = useState('50vw');
  const [height, setHeight] = useState('400px'); // Fixed height for Chrono
  const [mode, setMode] = useState('VERTICAL_ALTERNATING');

  useEffect(() => {
    fetch(endpoints.education, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);

    // Responsiveness adjustments based on screen size
    if (window?.innerWidth < 576) {
      setMode('VERTICAL');
      setWidth('90vw');
      setHeight('600px'); // Taller for smaller screens
    } else if (window?.innerWidth >= 576 && window?.innerWidth < 768) {
      setWidth('90vw');
      setHeight('500px'); // Medium height for tablet screens
    } else if (window?.innerWidth >= 768 && window?.innerWidth < 1024) {
      setWidth('75vw');  // Laptop / small desktop
      setHeight('500px'); // Medium height for laptop screens
    } else {
      setWidth('60vw');  // Large screen / desktop
      setHeight('600px'); // Tall height for larger screens
    }
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div style={{ width }} className="section-content-container">
            <Container>
              <div style={{ width, height }} className="chrono-container">
                <Chrono
                  useReadMore={false}
                  items={data.education}
                  cardHeight={100}
                  mode={mode}
                  theme={{
                    primary: theme.accentColor,
                    secondary: theme.accentColor,
                    cardBgColor: theme.chronoTheme.cardBgColor,
                    cardForeColor: theme.chronoTheme.cardForeColor,
                    titleColor: theme.chronoTheme.titleColor,
                  }}
                >
                  <div className="chrono-icons">
                    {data.education.map((education) => (education.icon ? (
                      <img
                        key={education.icon.src}
                        src={education.icon.src}
                        alt={education.icon.alt}
                      />
                    ) : null))}
                  </div>
                </Chrono>
              </div>
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner />}
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
