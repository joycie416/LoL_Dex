"use server";

import { CType, SType } from "@/types/champions";
import { IType } from "@/types/items";
import { RType } from "@/types/rotation";

const API_KEY = process.env.RIOT_API_KEY;

// Get all champion data
const CHAMPIONS_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.19.1/data/ko_KR/champion.json";
export async function getChampions(): Promise<[string, CType][]> {
  const res = await fetch(CHAMPIONS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = await res.json();
  return Object.entries(data);
}

// Get data of certain champion
const CHAMPION_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.19.1/data/ko_KR/champion";
export async function getChampion(name: string): Promise<SType> {
  const res = await fetch(CHAMPION_URL + `/${name}.json`, {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });
  const {data} = await res.json();
  return data[name];
}

// const CHAMPION_IMG_URL =
//   "https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion";
// export async function getChampionImg(name: string) {
//   const res = await fetch(CHAMPION_URL + `/${name}.png`, {
//     method: "GET",
//     // headers: {
//     //   "Content-Type": "application/json",
//     // },
//   });
//   const { data } = await res.json();
//   return data;
// }

// Get item data
const ITEMS_URL = 'https://ddragon.leagueoflegends.com/cdn/14.19.1/data/ko_KR/item.json'
export async function getItems(): Promise<[string, IType][]> {
  const res = await fetch(ITEMS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 24*60*60 // 24시간
    }
  });
  const { data } = await res.json();
  return Object.entries(data);
}

// Get rotation data
const ROTATION_URL =
  "https://br1.api.riotgames.com/lol/platform/v3/champion-rotations";
export async function getRotation(): Promise<[string, number[]][]> {
  const res = await fetch(ROTATION_URL + `?api_key=${API_KEY}`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Whale/3.28.266.11 Safari/537.36",
      "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      "Origin": "https://developer.riotgames.com"
    },
  });
  const data = await res.json();
  return Object.entries(data);
}
