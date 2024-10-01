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
      <p className="text-2xl text-red-500 mb-4">Champions List</p>
      <div className="grid grid-cols-4 gap-4">
        {data.map((info) => {
          const [name, content] = info;
          return (
            <Card type={'champion'} name={name} title={content.name} text={content.title}/>
          );
        })}
      </div>
    </div>
  );
};

export default ChampionsPage;
