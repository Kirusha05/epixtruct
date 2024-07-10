import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div<{ small?: boolean }>`
  font-size: 10px;
  margin: ${(props) => (props.small ? '0' : '30px 0')} auto;
  text-indent: -9999em;
  width: ${(props) => (props.small ? '20px' : '50px')} !important;
  height: ${(props) => (props.small ? '20px' : '50px')} !important;
  border-radius: 50%;
  background: #1e293b;
  background: linear-gradient(to right, #1e293b 10%, rgba(59, 130, 246, 0) 42%);
  position: relative;
  animation: ${spinAnimation} 1s infinite linear;
  transform: translateZ(0);

  &:before {
    width: 50%;
    height: 50%;
    background: #1e293b;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  &:after {
    background: rgb(236, 238, 240);
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

export default Spinner;
