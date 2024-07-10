import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Card, SectionHeader } from '.';

const CollapsableCard = styled(Card)`
  position: relative;
  & > * {
    width: 100%;
  }
`;

interface IProps {
  cardTitle: string;
  children: React.ReactNode;
  openByDefault?: boolean;
  expensesElement?: JSX.Element;
  actionElement?: JSX.Element | boolean;
  scrollTrigger?: any;
}

const Collapsable = ({
  cardTitle,
  children,
  openByDefault,
  expensesElement,
  scrollTrigger,
  actionElement
}: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(openByDefault || false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    setTimeout(() => {
      const cardTop = cardRef.current!.getBoundingClientRect().top;
      const scrollOffset = -30;
      const yScroll = cardTop + window.scrollY + scrollOffset;
      window.scrollTo({ top: yScroll, behavior: 'smooth' });
    }, 50);
  }, [isOpen, scrollTrigger]);

  return (
    <CollapsableCard ref={cardRef}>
      <SectionHeader
        title={cardTitle}
        open={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        expensesElement={expensesElement}
        actionElement={actionElement}
      />
      {isOpen && children}
    </CollapsableCard>
  );
};

export default Collapsable;
