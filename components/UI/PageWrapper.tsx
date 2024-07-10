import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 20px 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 0 auto;

  & > * {
    width: 100%;
  }

  @media screen and (min-width: 830px) {
    width: 750px;
  }
`;

export default PageWrapper;
