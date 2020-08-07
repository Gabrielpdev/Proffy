import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  main {
    margin: 3.2rem auto;
    width: 90%;

    > p {
      margin-top: 10rem;
      text-align: center;
    }
  }

  @media (min-width: 700px) {
    max-width: 100vw;

    form {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 16px;
      position: absolute;
      bottom: -28px;

      div.input-block + div.input-block {
        margin-top: 0;
      }
    }

    main {
      padding: 3.2rem 0;
      max-width: 740px;
      margin: 0 auto;
    }
  }
`;

export const SearchForm = styled.form`
  margin-top: 3.2rem;

  button {
    width: 100%;
    height: 5.6rem;
    background: var(--color-secundary);
    color: var(--color-button-text);
    border: 0;
    border-radius: 0.8rem;

    font: 700 1.6rem Archivo;
    transition: background 0.2s;
    margin-top: 5.4rem;

    &:hover {
      background: var(--color-secundary-dark);
    }
  }

  label {
    color: var(--color-text-in-primary);
  }
`;
