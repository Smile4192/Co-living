import React from 'react';
import { useGetFeedQuery } from '@/api/feed.api';
import Loading from '@/shared/components/ui/loading.component';
import { newList } from '@/store/modules/feed/feed.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function FeedListLoader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useGetFeedQuery({ page: 1, filter: {} });

  React.useEffect(() => {
    const hashString = window.location.hash;
    if (hashString.includes('applied')) {
      const colivingID = hashString.split('applied')[1].split('&')[0];
      console.log(colivingID);
      localStorage.setItem('redirect', colivingID);
      navigate('/' + colivingID + '?applied=true');
    } else if (hashString.includes('followed')) {
      const colivingID = hashString.split('followed')[1].split('&')[0];
      console.log(colivingID);
      navigate('/' + colivingID);
    }
  }, []);
  React.useEffect(() => {
    if (!isLoading) {
      dispatch(newList({ data: data.colivings }));
      navigate('/' + data.colivings[0]);
    }
  }, [isLoading]);
  return <Loading />;
}
