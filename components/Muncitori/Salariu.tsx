import { useAppSelector } from '../../hooks';
import { ISalariu } from '../../types';
import { formatDate, formatPriceWithCurrency } from '../../utils';
import { AmountBox, ItemDeleteIcon, ItemOptions } from '../UI';
import {
  SalariuControl,
  SalariuItem,
  SalariuMain
} from './Salariu.style';

interface IProps {
  salariu: ISalariu;
  onDelete: () => void;
}

const Salariu = ({ salariu: { amount, date, currency }, onDelete }: IProps) => {
  const editMode = useAppSelector((state) => state.admin.editMode);

  return (
    <SalariuItem>
      <SalariuMain>
        <AmountBox type='used'>
          {formatPriceWithCurrency(currency, amount)}
        </AmountBox>
        <SalariuControl>
          <p>{formatDate(date)}</p>
          {editMode && (
            <ItemOptions onClick={onDelete}>
              <ItemDeleteIcon />
            </ItemOptions>
          )}
        </SalariuControl>
      </SalariuMain>
    </SalariuItem>
  );
};

export default Salariu;
