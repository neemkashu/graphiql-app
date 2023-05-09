import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

type UseDispatchType = ReturnType<typeof useDispatch<AppDispatch>>;

export const useAppDispatch = (): UseDispatchType => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;