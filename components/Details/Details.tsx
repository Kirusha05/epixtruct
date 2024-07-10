import { useAppSelector } from '../../hooks';
import { formatAmount } from '../../utils';
import { AmountBox, Card } from '../UI';
import { DetailContainer, DetailField, DetailName } from './Details.style';

interface IProps {
  isAdmin: boolean;
}

const Details = () => {
  const details = useAppSelector((state) => state.project.details);

  let { usedCredit, totalCredit, remainingCredit } = details;

  const isInMinusMDL = remainingCredit.mdl < 0;
  const isInMinusEUR = remainingCredit.eur < 0;
  const isInMinusUSD = remainingCredit.usd < 0;

  return (
    <Card>
      <DetailContainer>
        <DetailField>
          <DetailName>Total</DetailName>
          <AmountBox type='total'>
            €{formatAmount(totalCredit.eur, true)}
          </AmountBox>
          <AmountBox type='total'>
            ${formatAmount(totalCredit.usd, true)}
          </AmountBox>
          <AmountBox type='total'>
            {formatAmount(totalCredit.mdl, true)} lei
          </AmountBox>
        </DetailField>
        <DetailField>
          <DetailName>Folosit</DetailName>
          <AmountBox type='used'>
            €{formatAmount(usedCredit.eur, true)}
          </AmountBox>
          <AmountBox type='used'>
            ${formatAmount(usedCredit.usd, true)}
          </AmountBox>
          <AmountBox type='used'>
            {formatAmount(usedCredit.mdl, true)} lei
          </AmountBox>
        </DetailField>
        <DetailField>
          <DetailName>Rămas</DetailName>
          <AmountBox glow={isInMinusEUR} type={isInMinusEUR ? 'used' : 'remaining'}>
            €{formatAmount(remainingCredit.eur, true)}
          </AmountBox>
          <AmountBox glow={isInMinusUSD} type={isInMinusUSD ? 'used' : 'remaining'}>
            ${formatAmount(remainingCredit.usd, true)}
          </AmountBox>
          <AmountBox glow={isInMinusMDL} type={isInMinusMDL ? 'used' : 'remaining'}>
            {formatAmount(remainingCredit.mdl, true)} lei
          </AmountBox>
        </DetailField>
      </DetailContainer>
    </Card>
  );
};

export default Details;
