# LoL Dex

'리그 오브 레전드'의 챔피언, 아이템, 금주 로테이션에 대한 정보를 제공합니다.

#### 시작 페이지
<img src='./images/start.png'>

#### 챔피언 페이지
<img src='./images/champions.png'>

#### 챔피언 상세 페이지
<img src='./images/champion-detail.png'>

#### 아이템 페이지
<img src='./images/items.png'>

#### 로테이션 페이지
<img src='./images/rotation.png'>

## 📚 STACKS

<!-- <div align=Left> -->
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
<img src="https://img.shields.io/badge/TailwindCss-06B6D4?style=for-the-badge&logo=TailwindCss&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/git actions-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white">
<img src="https://img.shields.io/badge/VERCEL-181717?style=for-the-badge&logo=VERCEL&logoColor=white">
<img src="https://img.shields.io/badge/SLACK-green?style=for-the-badge&logo=SLACK&logoColor=white">
<!-- </div> -->

## 설치 패키지

- 프로젝트 세팅 : `npx create-next-app@latest`
  - 실행 : `yarn dev`
- shadcn (UI 라이브러리)의 캐러셀 설치(Embla 기반) : `npx shadcn@latest add carousel`
  - Which style would you like to use? › Default
  - Which color would you like to use as base color? › Slate
  - Do you want to use CSS variables for colors? › yes

## 🗂️ 기능 설명

이번 프로젝트는 Next.js와 TypeScript를 경험해보는 것에 의의를 가짐. 따라서 다양한 렌더링 방식을 사용함.

#### 시작 페이지

- SSG.
- 각 페이지로 이동할 수 있는 `Link` 태그 나열

#### 챔피언, 아이템 페이지

- 전체 챔피언 카드를 grid로 나열
- 챔피언 페이지는 24시간마다 revalidate하는 ISR, 아이템 페이지는 SSG.

1. Riot API에서 데이터 가져오기

```tsx
const URL = `https://ddragon.leagueoflegends.com/cdn/14.19.1/data/ko_KR/${
  "champion" / "item"
}.json`;

export async function getChampions(): Promise<[string, CType][] | null> {
  try {
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 24 * 60 * 60, // 24시간
      },
    });
    const { data } = await res.json();
    return Object.entries(data);
  } catch (err) {
    console.error(err);
    return null;
  }
}
```

#### 챔피언 상세 페이지

- 브라우저에서 상호작용이 가능한 캐러셀은 client component, 기본 틀은 SSG.
- 특정 챔피언 정보를 가져와 보여줌.
- 모든 스킨에 대한 이미지를 캐러셀로 보여줌.

1. 챔피언 이름에 대해 동적 라우팅 (`/champions/id`) 및 메타 데이터 생성

```tsx
export const generateMetadata = async ({ params }: Params) => {
  const id = params.id;
  const data = await getChampion(id);
  return {
    title: data?.name ?? id,
    description: data?.name,
    image: `https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${id}.png`,
  };
};

const ChapionDetailPage = async ({ params }: Params) => {
  const id = params.id
  const data = await getChampion(id);

  return (
    ...
  )
};
```

2. Riot API에서 데이터 가져오기

```tsx
const CHAMPION_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.19.1/data/ko_KR/champion";
export async function getChampion(name: string): Promise<SType | null> {
  try {
    const res = await fetch(CHAMPION_URL + `/${name}.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await res.json();
    return data[name];
  } catch (err) {
    console.error(err);
    return null;
  }
}
```

3. `shadcn` 라이브러리를 사용해 챔피언 스킨 이미지 캐러셀로 보여주기

- `loop: true`, `stopOnInteraction: false` 옵션 추가해 회전하며 마우스가 캐러셀에서 사라지면 다시 자동 재생되도록 함

4. 존재하지 않는 챔피언 이름으로 상세페이지 접근 시 미들웨어를 통해 챔피언 페이지로 redirect

```ts
// ./src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { CHAMPION_NAMES } from "./types/champions";

export function middleware(request: NextRequest) {
  // 만약 챔피언 목록에 없는 경로로 진입할 시 '/champions'로 redirect 하게 해줌
  if (!CHAMPION_NAMES.includes(request.nextUrl.pathname.split("/")[2])) {
    return NextResponse.redirect(new URL("/champions", request.url));
  }
}

export const config = {
  matcher: "/champions/:path+", // '/champions' 이후에 적어도 한 개의 segment가 존재해야 함.
};
```


#### 로테이션 페이지

- CSR.


```tsx
'use client'

const RotationPage = () => {
  const [rotation, setRotation] = useState<[string, number[]][] | null>([]);
  const [data, setData] = useState<[string, CType][] | null>([]);

  const fetchData = async () => {
    getRotation().then(setRotation);
    getChampions().then(setData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    ...
  )
};
```



## 💥 Trouble Shooting

#### 시작 페이지

🔥 문제점