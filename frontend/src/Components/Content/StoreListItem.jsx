import React from "react";

const StoresListItem = (props) => {
  const { name, author, dateAdded } = props.store;

  return (
    <div className="flex flex-col bg-white p-5 max-w-sm rounded-lg shadow">
      <div>
        <a className="text-base text-black font-medium" href="#">
          {name}
        </a>
      </div>
      <div className="flex justify-between items-center mt-3">
        <a className="text-gray-600 text-sm" href="#">
          {author.username}
        </a>
        <p className="text-gray-600 text-xs">{dateAdded}</p>
      </div>
    </div>
  );
};

export default StoresListItem;
