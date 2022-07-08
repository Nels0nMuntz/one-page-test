import { RootState } from 'store/store';

const selectHomeState = (state: RootState) => state.home;

export const selectUsers = (state: RootState) => selectHomeState(state).users;