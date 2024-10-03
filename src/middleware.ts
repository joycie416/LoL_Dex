import { NextRequest, NextResponse } from "next/server";
import { CHAMPION_NAMES } from "./types/champions";

export function middleware(request: NextRequest) {
  // console.log('Current :', request.nextUrl.pathname.split("/"))
  // 만약 챔피언 목록에 없는 경로로 진입할 시 '/champions'로 redirect 하게 해줌
  if (!CHAMPION_NAMES.includes(request.nextUrl.pathname.split("/")[2])) {
    return NextResponse.redirect(new URL("/champions", request.url));
  }
}

export const config = {
  matcher: "/champions/:path+", // '/champions' 이후에 적어도 한 개의 segment가 존재해야 함.
};
