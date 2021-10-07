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
  // if (true) { // throws an error
  //   throw new Error("Could not find this page");
  // }
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
