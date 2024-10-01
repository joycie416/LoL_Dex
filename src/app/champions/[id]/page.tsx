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
      <h3 className='text-4xl text-red-500 '>{data?.name}</h3>
      <h3 className='text-2xl text-gray-500 my-5'>{data?.title}</h3>
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${params.id}.png`}
        width={200}
        height={200}
        alt={params.id}
        className='mx-auto my-5'
      />
      <p className='mb-5'>{data ? data?.lore : 'Loading...'}</p>
      <div>
        <p className='text-2xl mb-1'>Stats</p>
        <ul className='flex flex-col gap-1 ml-6'>
          <li className='list-disc'>공격력: {data?.info?.attack}</li>
          <li className='list-disc'>방어력: {data?.info?.defense}</li>
          <li className='list-disc'>마볍력: {data?.info?.magic}</li>
          <li className='list-disc'>난이도: {data?.info?.difficulty}</li>
        </ul>
      </div>
    </div>
  )
}

export default ChapionDetailPage 