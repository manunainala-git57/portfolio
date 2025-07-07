import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import './../App.css';

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
    <h4
      style={styles.introTextContainer}
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <ReactMarkdown>{intro}</ReactMarkdown>
    </h4>
  );

  return (
    <section id="skills" className="section">
      <div data-aos="fade-right" data-aos-duration="800">
        <Header title={header} />
      </div>

      {data ? (
        <div className="section-content-container">
          <Container>
            {renderSkillsIntro(data.intro)}

            {data.skills.map((group, groupIndex) => (
              <div key={group.title}>
                <br />
                <h3 data-aos="fade-up" data-aos-delay={100 * groupIndex}>
                  {group.title}
                </h3>

                {group.items.map((item, index) => (
                  <div
                    key={item.title}
                    style={{ display: 'inline-block', textAlign: 'center' }}
                    data-aos="zoom-in"
                    data-aos-delay={150 + index * 100}
                    data-aos-duration="600"
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
