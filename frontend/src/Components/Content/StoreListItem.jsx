import React from "react";

const StoresListItem = (props) => {
  const { name, website, author, dateAdded } = props.store;
  const { onStoreClick } = props;

  return (
    <div
      className="flex bg-white hover:bg-gray-200 p-4 h-24 w-full cursor-pointer border-b border-gray-400 last:border-b-0"
      onClick={() => onStoreClick(props.store)}
    >
      <div className="mr-4 w-16 flex items-center">
        <img className="w-full object-cover" src={"//logo.clearbit.com/" + website} alt=""/>
      </div>
      <div className="flex flex-col justify-around w-full">
        <p className="text-base text-black font-medium">{name}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">{author.username}</span>
          <p className="text-gray-600 text-xs">{dateAdded}</p>
        </div>
      </div>
    </div>
  );
};

export default StoresListItem;
