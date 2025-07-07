import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Base Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    transition: all 0.3s ease;
  }

  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.bodyBackground};
    color: ${({ theme }) => theme.textColor};
    font-family: 'Poppins', 'Segoe UI', sans-serif;
    transition: all 0.50s linear;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.accentColor};
  }

  a:hover {
    opacity: 0.8;
  }

  input,
  textarea,
  button {
    font-family: inherit;
    transition: all 0.3s ease;
  }

  input,
  textarea {
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.textColor};
    border: 1px solid ${({ theme }) => theme.cardBorderColor};
    border-radius: 8px;
    padding: 10px;
    width: 100%;
  }

  input::placeholder,
  textarea::placeholder {
    color: ${({ theme }) => theme.placeholderColor};
    opacity: 1;
  }

  button {
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonTextColor};
    border: none;
    border-radius: 6px;
    padding: 10px 20px;
    cursor: pointer;
  }

  button:hover {
    filter: brightness(1.1);
  }

  section {
    padding: 60px 20px;
  }
`;

export default GlobalStyles;
