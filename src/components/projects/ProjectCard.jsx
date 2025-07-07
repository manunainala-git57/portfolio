import React, { useContext } from 'react';
import {
  Button, Card, Badge, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';

const styles = {
  badgeStyle: {
    padding: '3px 8px',
    fontSize: '0.75rem',
    margin: '3px',
  },
  cardStyle: {
    borderRadius: 10,
    height: '450px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // smooth transition
  },
  cardTitleStyle: {
    fontSize: 24,
    fontWeight: 700,
  },
  cardTextStyle: {
    textAlign: 'left',
    fontSize: '0.95rem',
    marginBottom: '1rem',
  },
  buttonStyle: {
    margin: 5,
  },
  footerStyle: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

const globalStyles = `
  .project-card::-webkit-scrollbar {
    width: 8px;
  }

  .project-card::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  .project-card::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  .project-card::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  .project-card-hover {
    transition: transform 0.35s ease, box-shadow 0.35s ease;
  }

  .project-card-hover:hover {
    transform: scale(1.03);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
  }

  .project-card-hover img {
    transition: transform 0.3s ease;
  }

  .project-card-hover:hover img {
    transform: scale(1.02);
  }
`;

const ProjectCard = ({ project }) => {
  const theme = useContext(ThemeContext);
  const parseBodyText = (text) => <ReactMarkdown>{text}</ReactMarkdown>;

  return (
    <>
      <style>{globalStyles}</style>

      <Col className="d-flex">
        <Card
          className="flex-fill d-flex flex-column project-card project-card-hover"
          style={{
            ...styles.cardStyle,
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorderColor,
          }}
          text={theme.bsSecondaryVariant}
        >
          <Card.Img variant="top" src={project?.image} />
          <Card.Body className="d-flex flex-column">
            <Card.Title style={styles.cardTitleStyle}>{project.title}</Card.Title>

            <Card.Text style={styles.cardTextStyle}>
              {parseBodyText(project.bodyText)}
            </Card.Text>

            <div>
              {project?.links?.map((link) => (
                <Button
                  key={link.href}
                  style={styles.buttonStyle}
                  variant={'outline-' + theme.bsSecondaryVariant}
                  onClick={() => window.open(link.href, '_blank')}
                >
                  {link.text}
                </Button>
              ))}
            </div>
          </Card.Body>

          {project.tags && (
            <Card.Footer style={{ ...styles.footerStyle, backgroundColor: theme.cardFooterBackground }}>
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  pill
                  bg={theme.bsSecondaryVariant}
                  text={theme.bsPrimaryVariant}
                  style={styles.badgeStyle}
                >
                  {tag}
                </Badge>
              ))}
            </Card.Footer>
          )}
        </Card>
      </Col>
    </>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
