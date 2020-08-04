import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  main {
    margin: 3.2rem auto;
    width: 90%;
  }


  @media (min-width: 700px){
    max-width: 100vw;

    form {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 16px;
      position:absolute;
      bottom: -28px;

      div.input-block + div.input-block {
        margin-top: 0;
      }
    }

    main {
      padding: 3.2rem 0;
      max-width: 740px;
      margin:0 auto;
    }
  }
`;

export const SearchForm = styled.form`
  margin-top: 3.2rem;

  label {
    color: var(--color-text-in-primary);
  }

  div.input-block {
    position: relative;

    label {
      font-size: 1.4rem;
    }

    input {
      width: 100%;
      height: 5.6rem;
      margin-top: 0.8rem;
      border-radius: 0.8rem;
      background: var(--color-input-background);
      border: 1px solid var(--color-line-white);
      outline: 0;
      padding: 0 1.6rem;
      font: 1.6rem Archivo;
    }
  }

  div.input-block:focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background:  var(--color-primary-light);
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom:0;
  }

  div.input-block + div.input-block {
    margin-top: 1.4rem;
  }
`;