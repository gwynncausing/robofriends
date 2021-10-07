import React from "react";
import Card from "./Card";

const CardList = (props) => {
  const robots = props.robots;
  // const cardsArray = robots.map((user, index) => {
  //   return (
  //     <Card
  //       id={robots[index].id}
  //       name={robots[index].name}
  //       email={robots[index].email}
  //       key={index}
  //     />
  //   );
  // });
  return (
    // <div>{cardsArray}</div>
    <div>
      {robots.map((user, index) => {
        return (
          <Card
            id={robots[index].id}
            name={robots[index].name}
            email={robots[index].email}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default CardList;
