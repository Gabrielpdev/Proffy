import styled from 'styled-components';

export const Container = styled.article`
  background: var(--color-box-base);
  border: 1px solid var(--color-line-in-white);
  border-radius: 0.8rem;
  margin-top: 2.4rem;
  overflow: hidden;

  header {
    padding: 3.2rem 2rem;
    display: flex;
    align-items: center;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }

    div {
      margin-left: 2.4rem;

      strong {
        font: 700 2.4rem Archivo;
        display: block;
        color: var(--color-text-title);
      }
      span {
        font-size: 1.6rem;
        display: block;
        margin-top: 0.4rem;
      }
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    p {
      padding: 02rem;
      font-size: 1.6rem;
      line-height: 2.8rem;
    }

    /* .schedule {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      flex-direction: column;
      padding: 0 10px;

      .day {
        width: 50%;

        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 1rem;
        border-radius: 8px;
        background: var(--color-box-footer);
        border: 1px solid var(--color-line-in-white);

        font-size: 1.4rem;
      }
    } */

    .schedule {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;

      .day {
        display: flex;
        justify-content: center;
        flex-direction: column;

        padding: 1rem;
        background: var(--color-box-footer);
        width: 9.5rem;
        border-radius: 8px;
        border: 1px solid var(--color-line-in-white);

        font-size: 1.4rem;

        .nameDay {
          margin-bottom: 1.2rem;
          font-size: 0.98rem;
        }
      }
    }
    @media (min-width: 720px) {
    }
  }

  footer {
    padding: 3.2rem 2rem;
    background: var(--color-box-footer);
    border-top: 1px solid var(--color-line-in-white);
    margin-top: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      strong {
        color: var(--color-primary);
        font-size: 1.6rem;
        display: block;
      }
    }
    a {
      width: 20rem;
      height: 5.6rem;
      background: var(--color-secundary);
      color: var(--color-button-text);
      border: 0;
      border-radius: 0.8rem;
      cursor: pointer;
      font: 700 1.4rem Archivo;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      transition: 0.2s;
      text-decoration: none;
    }
  }
`;
