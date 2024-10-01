'use client'

import { getChampion } from '@/app/api/server-action'
import { SType } from '@/types/champions'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Params = {
  params : {
    id : string,
  }
}

const ChapionDetailPage = ({params}: Params) => {
  const [data, setData] = useState<SType | null>(null)

  useEffect(()=> {
    const fetchData = async () => {
      getChampion(params.id).then(info => setData(info))
    }
    fetchData();
  },[])
  
  console.log(data)

  // const data = getChampion(params.id);
  // console.log('champion data :\n', data);

  return (
    <div>
      <h3>{data?.name}</h3>
      <h3>{data?.title}</h3>
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${params.id}.png`}
        width={200}
        height={200}
        alt={params.id}
        className='mx-auto'
      />
      <p>{data ? data?.lore : 'Loading...'}</p>
      <div>
        <p>Stats</p>
        <ul>
          <li>공격력: {data?.info?.attack}</li>
          <li>방어력: {data?.info?.defense}</li>
          <li>마볍력: {data?.info?.magic}</li>
          <li>난이도: {data?.info?.difficulty}</li>
        </ul>
      </div>
    </div>
  )
}

export default ChapionDetailPage 