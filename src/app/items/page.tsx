import React from "react";
import { getItems } from "../api/server-action";
import Card from "@/components/Card";

const ItemsPage = async () => {
  const data = await getItems();

  return (
    <div className="card-container">
      {data?.map((info) => {
        const [name, content] = info;
        return (
          <Card
            type={"item"}
            name={name}
            title={content.name}
            text={content.plaintext}
            key={name}
          />
        );
      })}
    </div>
  );
};

export default ItemsPage;
