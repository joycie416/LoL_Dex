import { NextResponse } from "next/server";
import { RType } from "@/types/rotation";
// import { getRotation } from "../server-action";

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

    if (res.ok) {
      const data = await res.json();
      console.log("get ro data:", data);
      return NextResponse.json(data);
    } else {
      console.error(new Error("Fail to fetch rotation data"));
      return NextResponse.json(
        { message: "Fail to fetch rotation data" },
        { status: res.status }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(err);
  }

  // return NextResponse.json({data:res})
}
