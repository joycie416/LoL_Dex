import { NextResponse } from "next/server";
import { RType } from "@/types/rotation";
import { ChampionObj, CType } from "@/types/champions";
import { getChampions } from "../server-action";

const API_KEY = process.env.RIOT_API_KEY;

// Get rotation data
const ROTATION_URL =
  "https://br1.api.riotgames.com/lol/platform/v3/champion-rotations";

export async function GET() {
  try {
    const res = await fetch(ROTATION_URL, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        "X-RIOT-TOKEN": API_KEY || "",
      },
    });
    const champions = await getChampions();

    if (res.ok && !!champions) {
      const rotation: RType = await res.json();
      const freeChampions: CType[] = rotation.freeChampionIds.map(
        (key) => champions[ChampionObj[key]]
      );
      const freeChampionsForNewPlayers: CType[] =
        rotation.freeChampionIdsForNewPlayers.map(
          (key) => champions[ChampionObj[key]]
        );

      return NextResponse.json({
        data: [freeChampions, freeChampionsForNewPlayers],
      });
    } else {
      console.error(new Error("Fail to fetch rotation data"));
      throw new Error("Fail to fetch rotation data");
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(err);
  }
}
