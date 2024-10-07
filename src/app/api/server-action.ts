"use server";

import { CType, SType } from "@/types/champions";
import { IType } from "@/types/items";

// Get all champion data
const CHAMPIONS_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.19.1/data/ko_KR/champion.json";
export async function getChampions(): Promise<{ [key: string]: CType }> {
  const res = await fetch(CHAMPIONS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 24 * 60 * 60, // 24시간
    },
  });

  if (res.ok) {
    const { data } = await res.json();
    return data;
  } else {
    console.error(new Error("Fail to fetch champions data"));
    throw new Error("Fail to fetch champions data");
  }
}

// Get data of certain champion
const CHAMPION_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.19.1/data/ko_KR/champion";
export async function getChampion(name: string): Promise<SType> {
  const res = await fetch(CHAMPION_URL + `/${name}.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const { data } = await res.json();
    return data[name];
  } else {
    console.error(new Error("Fail to fetch champion data"));
    throw new Error("Fail to fetch champion data");
  }
}

// Get item data
const ITEMS_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.19.1/data/ko_KR/item.json";
export async function getItems(): Promise<[string, IType][]> {
  const res = await fetch(ITEMS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const { data } = await res.json();
    return Object.entries(data);
    // }
  } else {
    console.error(new Error("Fail to fetch item data"));
    throw new Error("Fail to fetch item data");
  }
}
