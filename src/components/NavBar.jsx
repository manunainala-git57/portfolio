import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import ThemeToggler from './ThemeToggler';
import '../css/NavBar.css';

const styles = {
  logoStyle: {
    width: 50,
    height: 40,
  },
};

const LinkSpan = styled.span`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  cursor: pointer;
  padding: 0 0.5rem;
  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }
`;

const LinkAnchor = styled.a`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  cursor: pointer;
  padding: 0 0.5rem;
  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }
`;

const NavBar = () => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch(endpoints.navbar)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error('Failed to load navbar:', err));
  }, []);

  const handleInternalScroll = (href) => {
    const id = href.replace(/^\/+|^#/, '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Add scroll shadow effect on navbar
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar-custom');
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
      fixed="top"
      expand="md"
      className="navbar-custom"
      expanded={expanded}
    >
      <Container>
        {data?.logo && (
          <LinkSpan
            onClick={() => {
              handleInternalScroll(data.sections[0]?.href || '#home');
              setExpanded(false);
            }}
            style={{ cursor: 'pointer' }}
            theme={theme}
          >
            <img
              src={data.logo.source}
              alt="main logo"
              style={
                data.logo.height && data.logo.width
                  ? { height: data.logo.height, width: data.logo.width }
                  : styles.logoStyle
              }
            />
          </LinkSpan>
        )}

        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(!expanded)}
          style={{ borderColor: theme.cardBorderColor }}
        />

        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            {data?.sections
              ?.filter((section) => section.title !== 'Experience')
              .map(({ title, href, type }) => {
                const isInternal = href.startsWith('#') || href.startsWith('/');
                if (isInternal) {
                  return (
                    <LinkSpan
                      key={title}
                      onClick={() => {
                        handleInternalScroll(href);
                        setExpanded(false);
                      }}
                      className="navbar__link"
                      theme={theme}
                    >
                      {title}
                    </LinkSpan>
                  );
                }
                return (
                  <LinkAnchor
                    key={title}
                    href={href}
                    target={type === 'link' ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    onClick={() => setExpanded(false)}
                    className="navbar__link"
                    theme={theme}
                  >
                    {title}
                  </LinkAnchor>
                );
              })}
          </Nav>
          <ThemeToggler onClick={() => setExpanded(false)} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
