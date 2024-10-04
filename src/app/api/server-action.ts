"use server";

import { CType, SType } from "@/types/champions";
import { IType } from "@/types/items";
import { RType } from "@/types/rotation";

const API_KEY = process.env.RIOT_API_KEY;

// Get all champion data
const CHAMPIONS_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.19.1/data/ko_KR/champion.json";
export async function getChampions() {
  try {
    const res = await fetch(CHAMPIONS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 24 * 60 * 60, // 24시간
      },
    });
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Get data of certain champion
const CHAMPION_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.19.1/data/ko_KR/champion";
export async function getChampion(name: string): Promise<SType | null> {
  try {
    const res = await fetch(CHAMPION_URL + `/${name}.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: 'no-store'
    });
    const { data } = await res.json();
    return data[name];
  } catch (err) {
    console.error(err);
    return null;
  }
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
const ITEMS_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.19.1/data/ko_KR/item.json";
export async function getItems(): Promise<[string, IType][] | null> {
  try {
    const res = await fetch(ITEMS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // next: {
      //   revalidate: 24 * 60 * 60, // 24시간
      // },
    });
    const { data } = await res.json();
    return Object.entries(data);
  } catch (err) {
    console.error(err);
    return null;
  }
}

