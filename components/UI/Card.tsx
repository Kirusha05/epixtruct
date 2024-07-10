import styled from 'styled-components';

const Card = styled.div`
  box-shadow: 5px 5px 12px rgba(181, 188, 204, 1),
    -6px -6px 10px rgba(255, 255, 255, 1),
    inset 2px 2px 7px rgba(181, 188, 204, 0.1),
    inset -2px -2px 7px rgba(181, 188, 204, 0.1);
  background: transparent;
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  width: 100%;
  margin-top: 16px;

  @media screen and (max-width: 600px) {
    padding: 0.8rem;
    margin-top: 10px;
  }
`;

export default Card;
