import styled from 'styled-components';

type Justify = 'center' | 'space-between' | 'flex-start';

const FormActions = styled.div<{ justify?: Justify }>`
  display: flex;
  justify-content: ${({ justify }) => justify || 'flex-end'};
  align-items: center;
  gap: 10px;
`;

export default FormActions;
