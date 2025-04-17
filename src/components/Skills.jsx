// src/components/Skills.jsx
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import { Container } from 'react-bootstrap';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import './../App.css'; // make sure your .section styles live here

const styles = {
  iconStyle: {
    height: 75,
    width: 75,
    margin: 10,
    marginBottom: 0,
  },
  introTextContainer: {
    whiteSpace: 'pre-wrap',
  },
};

function Skills({ header }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.skills)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const renderSkillsIntro = (intro) => (
    <h4 style={styles.introTextContainer}>
      <ReactMarkdown>{intro}</ReactMarkdown>
    </h4>
  );

  return (
    <section id="skills" className="section">
      <Header title={header} />
      {data ? (
        <Fade>
          <div className="section-content-container">
            <Container>
              {renderSkillsIntro(data.intro)}
              {data.skills.map((group) => (
                <div key={group.title}>
                  <br />
                  <h3>{group.title}</h3>
                  {group.items.map((item) => (
                    <div
                      key={item.title}
                      style={{ display: 'inline-block', textAlign: 'center' }}
                    >
                      <img
                        style={styles.iconStyle}
                        src={item.icon}
                        alt={item.title}
                      />
                      <p>{item.title}</p>
                    </div>
                  ))}
                </div>
              ))}
            </Container>
          </div>
        </Fade>
      ) : (
        <FallbackSpinner />
      )}
    </section>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
