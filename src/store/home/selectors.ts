import { RootState } from 'store/store';

const selectHomeState = (state: RootState) => state.home;

export const selectUsers = (state: RootState) => selectHomeState(state).users;
export const selectSubmitStatus = (state: RootState) => selectHomeState(state).users.submitStatus;
export const selectPositionsList = (state: RootState) => selectHomeState(state).positions.list;