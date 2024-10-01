import React from 'react'
import { getItems } from '../api/server-action'
import Card from '@/components/Card';

const ItemsPage = async () => {

  const data = await getItems();
  console.log(data[0])


  return (
    <div className="w-full min-w-fit">
      <p className="text-2xl text-red-500 mb-4">Items List</p>
      <div className="grid grid-cols-4 gap-4">
        {data.map((info) => {
          const [name, content] = info;
          return (
            <Card type={'item'} name={name} title={content.name} text={content.plaintext}/>
          );
        })}
      </div>
    </div>
  )
}

export default ItemsPage