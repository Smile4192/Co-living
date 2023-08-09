import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToList,
  newList,
  nextPage,
  setLoadedItem,
  setType,
} from '@/store/modules/feed/feed.slice';
import { selectUser } from '@/store/modules/auth/auth.slice';
import { placeholderApi } from '@/api/axios-instance';
import { useNavigate } from 'react-router-dom';

interface FeedControllerProps {
  id?: string | number | undefined;
}
export default function useFeedController(
  props: FeedControllerProps = { id: undefined },
) {
  const { id } = props;
  const { token } = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const list = useSelector((state) => state.feed.list);
  const orderedList = useSelector((state) => state.feed.orderedList);
  const page = useSelector((state) => state.feed.page);
  const type = useSelector((state) => state.feed.type);
  const filter = useSelector((state) => state.feed.filter);

  const isColiving = React.useMemo(() => {
    return Number(id) && parseInt(id) < 10000000000;
  }, [id]);
  const [value, setValue] = React.useState({ currentFeed: {}, nextId: -1 });

  async function getOrderedList(
    query: { page: number; type: 'colivings' | 'residents'; filter: object } = {
      page: 1,
      type: 'colivings',
      filter: {},
    },
  ) {
    const { page, filter } = query;
    const type = isColiving ? 'colivings' : 'residents';
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await placeholderApi.post(
      `/getFeed/${type}?page=${page}`,
      filter,
      {
        headers,
      },
    );

    return res.data;
  }
  async function getListItemByID(id: string | number) {
    const headers = token ? { Authorization: `Bearer ${token}` } : filter;
    let res;
    if (isColiving) {
      res = await placeholderApi.get(`/getColiving/${id}`, {
        headers,
      });
    } else {
      res = await placeholderApi.get(`/getResidentProfile/${id}`, {
        headers,
      });
    }

    return await res.data;
  }

  function preLoadNext(id: number | string) {
    const nextId = getNextID(orderedList, isColiving ? parseInt(id) : id);
    const type = isColiving ? 'colivings' : 'residents';

    const countNotReady = Object.values(list).reduce((acc, item) => {
      if (!item.isReady) acc++;
      return acc;
    }, 0);
    // setValue((prev) => ({ ...prev, nextId }));
    if (nextId && !list[nextId]?.isReady) {
      (async () => {
        const item = await getListItemByID(nextId);
        dispatch(
          setLoadedItem({
            item: {
              [nextId]: {
                isReady: true,
                data: item[isColiving ? 'coliving' : 'residentProfile'],
              },
            },
          }),
        );
      })();
    }
    if (orderedList.length === 0) {
      dispatch(newList({ data: [isColiving ? parseInt(id) : id] }));
      (async () => {
        const list = await getOrderedList({ page: 1, type, filter });
        console.log('Singe start and add page!', list);
        dispatch(addToList({ data: list[type] }));
      })();
    } else if (orderedList.length !== 0 && countNotReady === 2) {
      /*
      load more when we get to the end of the list, 
      try for the last 2 pages as the query is heavy 
      the value can be adjusted for better experience.
      */
      (async () => {
        const list = await getOrderedList({ page: page + 1, type, filter });
        dispatch(addToList({ data: list[type] }));
        dispatch(nextPage());
      })();
    }
  }

  React.useEffect(() => {
    if (!id && orderedList.length === 0) {
      (async () => {
        const list = await getOrderedList();
        console.log('Without ID and empty');
        dispatch(newList({ data: list[type] }));
        navigate('/' + list[type][0]);
      })();
    }
    // preLoadNext(id);

    if (orderedList.length > 1) {
      const nextId = getNextID(orderedList, isColiving ? parseInt(id) : id);
      setValue((prev) => ({ ...prev, nextId }));
    }
  }, [orderedList, list]);

  React.useEffect(() => {
    if (orderedList.length !== 0 && Object.keys(filter).length !== 0) {
      (async () => {
        const list = await getOrderedList({ page: 1, type, filter });
        console.log('Filters id change!', Object.keys(filter).length);
        dispatch(newList({ data: list[type] }));
        navigate('/' + list[type][0]);
      })();
    }
  }, [filter]);

  React.useEffect(() => {
    if (id && list[id]?.isReady) {
      setValue((prev) => ({ ...prev, currentFeed: list[id].data }));
      preLoadNext(id);
    } else if (id) {
      (async () => {
        const item = await getListItemByID(id);
        dispatch(
          setLoadedItem({
            item: {
              [id]: {
                isReady: true,
                data: item[isColiving ? 'coliving' : 'residentProfile'],
              },
            },
          }),
        );

        preLoadNext(id);

        setValue((prev) => ({
          ...prev,
          currentFeed: item[isColiving ? 'coliving' : 'residentProfile'],
        }));
      })();
    }
  }, [id]);

  React.useEffect(() => {
    if (id && isColiving) dispatch(setType({ type: 'colivings' }));
    else dispatch(setType({ type: 'residents' }));
  }, []);

  return value;
}

function getNextID(arr, target) {
  if (arr.indexOf(target) === -1) return false;
  return arr[arr.indexOf(target) + 1];
}
