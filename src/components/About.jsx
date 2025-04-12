import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  sectionContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    gap: '40px',
  },
  introTextContainer: {
    flex: '1 1 300px',
    fontSize: '1.2em',
    fontWeight: 500,
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    minWidth: '300px',
    maxWidth: '600px',
  },
  introImageContainer: {
    flex: '1 1 300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width:'500px',
    height: 'auto',
    maxWidth: '100%',
    borderRadius: '10px',
  },
};

function About({ header }) {
  const [data, setData] = useState(null);

  const parseIntro = (text) => <ReactMarkdown>{text}</ReactMarkdown>;

  useEffect(() => {
    fetch(endpoints.about)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header title={header} />
      <div style={styles.sectionContentContainer}>
        {data ? (
          <Fade>
            <div style={styles.introTextContainer}>
              {parseIntro(data.about)}
            </div>
            <div style={styles.introImageContainer}>
              <img src={data?.imageSource} alt="profile" style={styles.image} />
            </div>
          </Fade>
        ) : (
          <FallbackSpinner />
        )}
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
