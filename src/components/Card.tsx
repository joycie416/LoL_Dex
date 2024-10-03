import Image from "next/image";
import Link from "next/link";

const Card = ({
  type,
  name,
  title,
  text,
}: {
  type: string;
  name: string;
  title: string;
  text: string;
}) => {
  return (
    <Link
      href={type === "champion" ? `/champions/${name}` : "#"}
      className={`card min-w-[165px] p-4 flex flex-col gap-2 items-center p-2 border broder-white rounded-lg bg-black ${
        type === "champion" || "cursor-default"
      }`}
    >
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/${type}/${name}.png`}
        width={100}
        height={100}
        alt={name}
      />
      <p className="title">{title}</p>
      <p className="text-[14px] text-justify text-gray-400">{text}</p>
    </Link>
  );
};

export default Card;
