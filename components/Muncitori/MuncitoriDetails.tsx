import { useAppSelector } from '../../hooks';
import { Currency, IMuncitor } from '../../types';
import { formatAmount, roundAmount } from '../../utils';
import { AmountBox, DetailsBox, DetailItem, DetailsTitle } from '../UI';

const totalSalariesByCurrency = (array: IMuncitor[], currency: Currency) => {
  const totalSalaries = array.reduce((accWorkers, curWorker) => {
    const totalPerWorker = curWorker.salarii.reduce((accWorker, curSalary) => {
      // Don't add anything if it is the wrong currency
      if (curSalary.currency !== currency) return accWorker;

      return accWorker + curSalary.amount;
    }, 0);

    return roundAmount(accWorkers + totalPerWorker);
  }, 0);

  return totalSalaries;
};

const MuncitoriDetails = () => {
  const workers = useAppSelector((state) => state.project.workers);

  const inEUR = totalSalariesByCurrency(workers, 'eur');
  const inUSD = totalSalariesByCurrency(workers, 'usd');
  const inMDL = totalSalariesByCurrency(workers, 'mdl');

  return (
    <DetailsBox>
      <DetailsTitle>Total:</DetailsTitle>
      {inEUR > 0 && (
        <DetailItem>
          <AmountBox type='used'>€{formatAmount(inEUR)}</AmountBox>
        </DetailItem>
      )}
      {inUSD > 0 && (
        <DetailItem>
          <AmountBox type='used'>${formatAmount(inUSD)}</AmountBox>
        </DetailItem>
      )}
      {inMDL > 0 && (
        <DetailItem>
          <AmountBox type='used'>{formatAmount(inMDL)} lei</AmountBox>
        </DetailItem>
      )}
    </DetailsBox>
  );
};

export default MuncitoriDetails;
