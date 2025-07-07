import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';
import './../App.css';

const styles = {
  containerStyle: {
    marginBottom: 25,
  },
  showMoreStyle: {
    margin: 25,
  },
};

const Projects = ({ header }) => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.projects)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const numberOfItems = showMore && data ? data.projects.length : 6;

  return (
    <section id="projects" className="section">
      <div data-aos="fade-right" data-aos-duration="800">
        <Header title={header} />
      </div>

      {data ? (
        <div className="section-content-container">
          <Container style={styles.containerStyle}>
            <Row xs={1} sm={1} md={2} lg={3} className="g-4 d-flex">
              {data.projects.slice(0, numberOfItems).map((project, index) => (
                <div
                  key={project.title}
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                  data-aos-duration="800"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </Row>

            {!showMore && (
              <div
                data-aos="fade-up"
                data-aos-delay="600"
                data-aos-duration="800"
              >
                <Button
                  style={styles.showMoreStyle}
                  variant={theme.bsSecondaryVariant}
                  onClick={() => setShowMore(true)}
                >
                  show more
                </Button>
              </div>
            )}
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </section>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
