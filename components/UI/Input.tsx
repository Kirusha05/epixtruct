import styled from 'styled-components';

const Input = styled.input`
  box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.15), inset -3px -3px 4px #fdfdfd;
  height: 2.3rem;
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  background-color: transparent;
  padding: 0 0.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};

  &:focus,
  &:active {
    outline: 2px solid ${({ theme }) => theme.lightBlue};
  }

  &::placeholder {
    color: ${({ theme }) => theme.inputPlaceholder};
  }

  @media screen and (max-width: 600px) {
    font-size: 0.9rem;
    height: 2rem;
  }
`;

export default Input;
