import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  background-color: var(--color-primary);

  @media (min-width: 700px) {
    display: flex;
    flex-direction: column;
    height: 340px;
  }
`;

export const BarContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-in-primary);
  background: var(--color-primary-darker);
  margin: 0 auto;
  padding: 1.6rem 3rem;

  a {
    display: block;
    height: 3.2rem;
    transition: opacity 0.2s;
    text-decoration: none;
    font: 500 1.5rem Archivo;
    display: flex;
    align-items: center;
    color: var(--color-button-text);

    &:hover {
      opacity: 0.6;
    }

    &.active {
      opacity: 0.4;
    }
  }

  > img {
    height: 1.6rem;
  }

  @media (min-width: 700px) {
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.6rem 15rem;
  }
`;

export const HeaderContent = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
  margin: 3.2rem auto;

  strong {
    font: 700 3.6rem Archivo;
    line-height: 4.2rem;
    color: var(--color-title-in-primary);
  }
  p {
    font-size: 1.6rem;
    line-height: 1.6rem;
    color: var(--color-title-in-primary);
    margin-top: 2.4rem;
    margin-bottom: 6.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      margin-right: 1rem;
    }
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 5rem;

      > p {
        margin: auto;
      }

      img {
        margin-right: 1rem;
      }
    }
  }

  @media (min-width: 700px) {
    flex: 1;
    max-width: 740px;
    padding-bottom: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 0;

    > div {
      strong {
        max-width: 420px;
      }
    }
  }
`;
