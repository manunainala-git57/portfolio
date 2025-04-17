import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../css/education.css';
import './../App.css'; // make sure your .section styles live here


function Education({ header }) {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.education)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error('Failed to fetch education data:', err));
  }, []);

  return (
    <section id="education" className="section">
      <Header title={header} />
      {data ? (
        <Fade>
          <div className="section-content-container">
            <Container>
              <VerticalTimeline layout="1-column">
                {data.education.map((edu, index) => (
                  <VerticalTimelineElement
                    key={index}
                    date={edu.title}
                    icon={
                      edu.icon?.src ? (
                        <img
                          src={edu.icon.src}
                          alt={edu.cardTitle}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: '50%',
                          }}
                        />
                      ) : null
                    }
                    iconStyle={{
                      background: theme.accentColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    contentStyle={{
                      background: theme.chronoTheme?.cardBgColor || '#fff',
                      color: theme.chronoTheme?.cardForeColor || '#333',
                    }}
                    contentArrowStyle={{
                      borderRight: `7px solid ${theme.chronoTheme?.cardBgColor || '#fff'}`,
                    }}
                  >
                    <h3 className="vertical-timeline-element-title">{edu.cardTitle}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{edu.cardSubtitle}</h4>
                    <p>{edu.cardDetailedText}</p>
                  </VerticalTimelineElement>
                ))}
              </VerticalTimeline>
            </Container>
          </div>
        </Fade>
      ) : (
        <FallbackSpinner />
      )}
    </section>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
