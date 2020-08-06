import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-text-in-primary);
  background: var(--color-primary);

  a {
    text-decoration: none;
  }

  img.hero-image {
    width: 90%;
    max-width: 62.4rem;
  }

  @media (min-width: 1100px) {
    #page-landing-content {
      height: 100vh;
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const LogoContainer = styled.div`
  text-align: center;
  margin: 9rem 0 3.2rem;

  img.proffy-image {
    margin-top: 15rem;
  }

  h2 {
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 4.6rem;
    margin-top: 0.8rem;
  }

  @media (min-width: 1100px) {
    align-self: center;
    text-align: left;
    margin: 0;
    padding: 0 10rem;

    h2 {
      text-align: initial;
      font-size: 3.6rem;
    }

    img.proffy-image {
      margin: 0;
      height: 100%;
    }
  }
`;

export const Form = styled.form`
  height: 30vh;
  width: 100vw;
  padding: 3rem;
  background: var(--color-background);

  display: flex;
  flex-direction: column;
  align-items: center;

  color: var(--color-text-base);

  strong {
    margin-right: auto;
    color: var(--color-text-title);
    font-size: 2.5rem;
  }

  > div {
    padding: 0 1rem;
    margin-top: 1rem;
    width: 100%;
    position: relative;

    input {
      width: 100%;
      height: 5.6rem;
      margin-top: 0.5rem;
      border-radius: 0.8rem;
      background: var(--color-input-background);
      border: 1px solid var(--color-line-white);
      outline: 0;
      padding: 0 1.6rem;
      font: 1.6rem Archivo;
    }
    input:focus-within {
      border: 1px solid var(--color-primary-light);
    }
  }

  div:focus-within::after {
    height: calc(100% - 5rem);
    width: 2px;
    content: '';
    background: var(--color-primary-light);
    position: absolute;
    left: 1rem;
    bottom: 1rem;
  }

  > button {
    border: 0;
    width: 95%;
    height: 5.6rem;
    margin-top: 1rem;
    border-radius: 0.8rem;
    background: var(--color-secundary);
    padding: 1.6rem;

    font: 700 2rem Archivo;

    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    color: var(--color-button-text);

    transition: background-color 0.2s;

    &:hover {
      background: var(--color-secundary-dark);
    }
  }
  @media (min-width: 1100px) {
    height: 100%;
    width: 41vw;
    background: var(--color-background);

    padding: 10rem 5rem;
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  margin-top: 10rem;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    span {
      margin-right: auto;
    }

    > a {
      margin-right: auto;
      font-weight: 600;
      text-decoration: none;
      color: (--color-primary-lighter);
    }
  }

  > span {
    width: 25%;
    img {
      margin-left: 1rem;
    }
  }

  span {
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 1100px) {
    span.message {
      width: 35%;
      img {
        margin-left: 1rem;
      }
    }
  }
`;
