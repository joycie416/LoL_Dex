import React from 'react'
import { getItems } from '../api/server-action'
import Card from '@/components/Card';

const ItemsPage = async () => {

  const data = await getItems();

  return (
    <div className="w-full min-w-fit">
      <p className="text-2xl text-red-500 ml-4 mb-4">Items List</p>
      <div className="card-container">
        {!data ? (<>Loading...</>) : data.map((info) => {
          const [name, content] = info;
          return (
            <Card type={'item'} name={name} title={content.name} text={content.plaintext} key={name}/>
          );
        })}
      </div>
    </div>
  )
}

export default ItemsPage