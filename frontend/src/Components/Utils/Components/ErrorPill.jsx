import React from "react";

const ErrorPill = (props) => {
  const { errorMsg } = props;

  return (
    <div>
      <div className="text-center py-4">
        <div
          className="p-2 w-full bg-red-700 items-center text-red-100 leading-none rounded-full flex lg:inline-flex"
          role="alert"
        >
          <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">
            Error
          </span>
          <span className="font-base text-base mr-2 text-left flex-auto">
            {errorMsg}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPill;
