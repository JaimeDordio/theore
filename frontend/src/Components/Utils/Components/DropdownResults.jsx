import React from "react";

const DropdownResults = (props) => {
  const { results, onSearchResultClick } = props;

  return (
    <>
      {results ? (
        <ul className="absolute mt-2 bg-white border-gray-300 border rounded-md w-2/6 flex flex-col overflow-y-scroll">
          {results.map((result) => {
            return (
              <li
                key={result._id}
                className="shadow bg-white w-full lef-0 overflow-y-auto"
                style={{ height: "fit-content" }}
                onClick={() => {
                  onSearchResultClick(result);
                }}
              >
                <div className="flex flex-col w-full">
                  <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                    <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                      <div className="w-10 flex flex-col items-center">
                        <div className="flex relative w-6 h-6 bg-orange-500 justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full">
                          <img
                            className="rounded-full"
                            alt=""
                            src={"//logo.clearbit.com/" + result.website}
                          />
                        </div>
                      </div>
                      <div className="w-full items-center flex justify-between">
                        <div className="mx-2 w-1/2 text-sm">
                          {result.name}
                          <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
                            {result.website.replace(/^https?\:\/\//i, "")}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                            <div className="text-xs font-normal leading-none max-w-full flex-initial">
                              New!
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};

export default DropdownResults;
