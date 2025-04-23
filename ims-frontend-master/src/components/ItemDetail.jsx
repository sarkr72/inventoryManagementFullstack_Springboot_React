import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ITEM } from '../services/queries';

function ItemDetail({ itemId }) {
  const { loading, error, data } = useQuery(GET_ITEM, {
    variables: { id: itemId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const item = data.getItem;
  return (
    <div>
      <h2>{item?.name}</h2>
      <p>Price: {item?.price}</p>
    </div>
  );
}

export default ItemDetail;
