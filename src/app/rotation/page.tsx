import React from 'react'
import { getChampions, getRotation } from '../api/server-action';
import Card from '@/components/Card';

const RotationPage =  async () => {

  const rotation = await getRotation();
  // console.log(rotation)
  const data = await getChampions();
  const freeChampions = data.filter(info => {
    return rotation[0][1].includes(+info[1].key)
  })
  const freeChampionsForNewPlayers = data.filter(info => {
    return rotation[1][1].includes(+info[1].key)
  })



  return (
    <div className="w-full min-w-fit">
      <p className="text-2xl text-red-500 mb-4">Rotation List</p>
      <p className="text-xl text-white mb-4">Free champions</p>
      <div className="grid grid-cols-4 gap-4">
        {freeChampions.map((info) => {
          const [name, content] = info;
          return (
            <Card type={'champion'} name={name} title={content.name} text={content.title}/>
          );
        })}
      </div>
      <p className="text-xl text-white my-4">Free champions for new players</p>
      <div className="grid grid-cols-4 gap-4">
        {freeChampionsForNewPlayers.map((info) => {
          const [name, content] = info;
          return (
            <Card type={'champion'} name={name} title={content.name} text={content.title}/>
          );
        })}
      </div>
    </div>
  )
}

export default RotationPage