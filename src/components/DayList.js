import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {
  const {days} = props;

  const dayList = days.map((item) =>
    <DayListItem 
      key={item.id}
      name={item.name}
      spots={item.spots}
      selected={item.name === props.value}
      setDay={props.onChange}
      />
  );

  return <ul>{dayList}</ul>;
};