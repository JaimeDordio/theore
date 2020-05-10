import React from "react";

const StoresListItem = (props) => {
  const { name, author, dateAdded } = props.store;
  const { onStoreClick } = props;

  return (
    <div
      className="flex flex-col bg-white p-5 max-w-sm rounded-lg shadow cursor-pointer"
      onClick={() => onStoreClick(props.store)}
    >
      <div>
        <p className="text-base text-black font-medium" href="#">
          {name}
        </p>
      </div>
      <div className="flex justify-between items-center mt-3">
        <span className="text-gray-600 text-sm" href="#">
          {author.username}
        </span>
        <p className="text-gray-600 text-xs">{dateAdded}</p>
      </div>
    </div>
  );
};

export default StoresListItem;
