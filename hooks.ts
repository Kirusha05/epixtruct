import { ReactEventHandler, useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useScrollWithShadow() {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const onScrollHandler = (event: any) => {
    setScrollTop(event.target.scrollTop);
    setScrollHeight(event.target.scrollHeight);
    setClientHeight(event.target.clientHeight);
  };

  function getBoxShadow() {
    const isBottom = clientHeight === scrollHeight - scrollTop;
    const isTop = scrollTop === 0;
    const isBetween = scrollTop > 0 && clientHeight < scrollHeight - scrollTop;

    let boxShadow = 'none';
    const top = 'inset -10px 14px 14px rgba(0, 0, 0, 0.2)';
    const bottom = 'inset -10px -14px 14px rgba(0, 0, 0, 0.2)';

    if (isTop) {
      boxShadow = bottom;
    } else if (isBetween) {
      boxShadow = `${top}, ${bottom}`;
    } else if (isBottom) {
      boxShadow = top;
    }
    return boxShadow;
  }

  return { boxShadow: getBoxShadow(), onScrollHandler };
}