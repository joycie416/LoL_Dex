import { getChampions } from "../api/server-action";
import Card from "@/components/Card";

const ChampionsPage = async () => {
  const res = await getChampions();
  const data = Object.entries(res);

  return (
    <div className="w-full min-w-fit mb-4">
      <p className="page-title text-2xl ml-4 mb-4">Champion List</p>
      <div className="card-container">
        {data?.map((info) => {
          const [name, content] = info;
          return (
            <Card
              type={"champion"}
              name={name}
              title={content.name}
              text={content.title}
              key={name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChampionsPage;
