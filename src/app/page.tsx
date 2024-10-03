import Image from "next/image";
import Link from "next/link";
import champions from "@/assets/champions.png";
import items from "@/assets/items.png";
import rotation from "@/assets/rotation.png";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 items-center mb-10">
      <p className="title text-2xl">Information App for LoL</p>
      <Link href={"/champions"} className="flex flex-col gap-4 items-center">
        <Image
          src={champions}
          width={450}
          height={400}
          alt="champions"
          style={{ aspectRatio: "4/3", height: 'auto', objectFit: "cover" }}
        />
        <p>To Champion List</p>
      </Link>
      <Link href={"/items"} className="flex flex-col gap-4 items-center">
        <Image
          src={items}
          width={450}
          height={450}
          alt="items"
          style={{ aspectRatio: "4/3", height: 'auto', objectFit: "cover" }}
        />
        <p>To Item List</p>
      </Link>
      <Link href={"/rotation"} className="flex flex-col gap-4 items-center">
        <Image
          src={rotation}
          width={450}
          height={450}
          alt="rotation"
          style={{ aspectRatio: "4/3", height: 'auto', objectFit: "cover" }}
        />
        <p>To Rotation List</p>
      </Link>
    </div>
  );
}
