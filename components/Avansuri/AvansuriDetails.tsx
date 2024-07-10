import { useAppSelector } from '../../hooks';
import { IAvans } from '../../types';
import { formatAmount, roundAmount } from '../../utils';
import { AmountBox, DetailsBox, DetailItem, DetailsTitle } from '../UI';

const getAmount = (array: IAvans[]) =>
  formatAmount(roundAmount(array.reduce((acc, cur) => acc + cur.amount, 0)));

const AvansuriDetails = () => {
  const avansuri = useAppSelector((state) => state.project.avansuri);

  const inEUR = avansuri.filter((avans) => avans.currency === 'eur');
  const inUSD = avansuri.filter((avans) => avans.currency === 'usd');
  const inMDL = avansuri.filter((avans) => avans.currency === 'mdl');

  return (
    <DetailsBox>
      <DetailsTitle>Total:</DetailsTitle>
      {inEUR.length > 0 && (
        <DetailItem>
          <AmountBox type='total'>€{getAmount(inEUR)}</AmountBox>
        </DetailItem>
      )}
      {inUSD.length > 0 && (
        <DetailItem>
          <AmountBox type='total'>${getAmount(inUSD)}</AmountBox>
        </DetailItem>
      )}
      {inMDL.length > 0 && (
        <DetailItem>
          <AmountBox type='total'>{getAmount(inMDL)} lei</AmountBox>
        </DetailItem>
      )}
    </DetailsBox>
  );
};

export default AvansuriDetails;
