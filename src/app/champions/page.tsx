import { getChampions } from "../api/server-action";
import Card from "@/components/Card";

const ChampionsPage = async () => {
  const data = await getChampions();
  // console.log('ChampionObj = {')
  // data.forEach(info => {
  //   console.log(`${info[1].key} : "${info[0]}",`)
  // })
  // console.log('}')

  return (
    <div className="w-full min-w-fit">
      <p className="title text-2xl ml-4 mb-4">Champion List</p>
      <div className="card-container">
        {!data ? (
          <>Loading...</>
        ) : (
          data.map((info) => {
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
          })
        )}
      </div>
    </div>
  );
};

export default ChampionsPage;
