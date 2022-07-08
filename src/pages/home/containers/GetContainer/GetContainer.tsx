import React from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';
import { getUserListThunk, selectUsers } from 'store/home';
import { GetSection } from '../../components/GetSection/GetSection';

export const GetContainer = () => {

  const dispatch = useAppDispatch();

  const { page, count, list, hasMore, status } = useAppSelector(selectUsers);

  const onLoadUsers = () => {
    dispatch(getUserListThunk({ page, count }));
  };

  React.useEffect(onLoadUsers, []);

  return (
    <GetSection
      status={status}
      users={list}
      showButton={hasMore}
      onLoadUsers={onLoadUsers}
    />
  )
};