import styled from 'styled-components';

import Background from '../../assets/images/background.svg';

interface SelectButtonProps {
  isSelected: boolean;
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  header {
    background: url(${Background}) center;
    background-size: 100% 100%;
    background-color: var(--color-primary);
    height: 40rem;

    @media (min-width: 700px) {
      max-width: 100vw;
      height: 45rem;
    }

    div {
      strong {
        max-width: 64rem;
      }
    }
  }

  @media (min-width: 700px) {
    max-width: 100vw;
  }
`;

export const HeaderProfile = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    margin: 2rem 0;
    font: 700 2.5rem Archivo;
  }

  @media (min-width: 700px) {
    align-self: center;

    strong {
      font-size: 3rem;
    }

    img {
      margin-top: 0;
    }
  }
`;

export const AvatarField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 0;

  img {
    height: 20rem;
    width: 20rem;
    border-radius: 50%;
    background: var(--color-input-background);
    box-shadow: 0.1rem 0.1rem 5rem rgba(0, 0, 0, 0.5);
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: var(--color-secundary);
    border-radius: 50%;
    border: 0;
    right: 0;
    bottom: 0;
    transition: background 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #fff;
    }

    &:hover {
      background: var(--color-secundary-dark);
    }
  }

  @media (min-width: 700px) {
    margin-top: -2rem;
  }
`;

export const Content = styled.form`
  background: var(--color-box-base);
  width: 100%;
  max-width: 74rem;
  border-radius: 0.8rem;
  margin: 0 auto 3.2rem;
  padding-top: 6.4rem;
  overflow: hidden;

  @media (min-width: 700px) {
    margin-top: -5rem;
  }
`;

export const DataContent = styled.fieldset`
  border: 0;
  padding: 0 2.4rem;

  input + div {
    margin-top: 6.4rem;
  }

  legend {
    font: 700 2.4rem Archivo;
    color: var(--color-text-title);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 1.6rem;
    border-bottom: 1px solid var(--color-line-in-white);

    button {
      background: none;
      border: 0;
      color: var(--color-primary);
      font: 700 1.6rem Archivo;
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: var(--color-primary-dark);
      }
    }
  }

  hr {
    width: 100%;
    border: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    margin: 30px 0;
  }

  @media (min-width: 700px) {
    padding: 0 6.4rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem 0;

  .buttons {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
  }

  span {
    font-size: 1.4rem;
  }
`;

export const SelectButton = styled.button<SelectButtonProps>`
  width: 90%;
  height: 5.2rem;
  border: 0;
  border-radius: 0.8rem;
  font: 700 1.5rem Archivo;

  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  color: var(--color-button-text);

  transition: background-color 0.2s;

  img {
    width: 2.5rem;
    margin-right: 2rem;
  }

  span {
    font-size: 5px;
  }

  &:first-child {
    margin-right: 1.6rem;
  }

  &.study {
    background: ${(props) =>
      props.isSelected
        ? 'var(--color-primary)'
        : 'var(--color-primary-lighter)'};
    border: ${(props) =>
      props.isSelected ? '2px solid var(--color-primary-darker)' : 0};
    opacity: ${(props) => (props.isSelected ? 1 : 0.9)};

    &:hover {
      background: var(--color-primary-light);
    }
  }

  &.give-classes {
    background: ${(props) =>
      props.isSelected
        ? 'var(--color-secundary-dark)'
        : 'var(--color-secundary)'};
    border: ${(props) =>
      props.isSelected ? '2px solid var(--color-secundary-light)' : 0};
    opacity: ${(props) => (props.isSelected ? 1 : 0.75)};

    &:hover {
      background: var(--color-secundary-dark);
    }
  }

  @media (min-width: 700px) {
    font-size: 2rem;
    img {
      width: 3rem;
      margin-right: 2.4rem;
    }
  }
`;

export const WarningContent = styled.footer`
  padding: 4rem 2.4rem;
  background: var(--color-box-footer);
  border-top: 1px solid var(--color-line-in-white);
  margin-top: 6.4rem;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    line-height: 2.4rem;
    color: var(--color-text-complement);

    img {
      margin-right: 2rem;
    }
  }

  button {
    width: 100%;
    height: 5.6rem;
    background: var(--color-secundary);
    border: 0;
    border-radius: 0.8rem;
    font: 700 1.6rem Archivo;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: background 0.2s;
    margin-top: 3.2rem;
    color: var(--color-button-text);

    &:hover {
      background: var(--color-secundary-dark);
    }
  }

  @media (min-width: 700px) {
    padding: 4rem 6.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      justify-content: space-between;
    }

    button {
      width: 20rem;
      margin-top: 0;
    }
  }
`;
