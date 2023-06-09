import React from "react";

const CheckBox = (props) => {
  return (
    <div>
      <label onClick={props.setHandle} id={props.domId} className="text-gray-600 text-sm cursor-pointer">
        <div className="flex items-center">
          <div className="w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  props.default
                    ? "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    : " M9 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                }
              />
            </svg>
          </div>
          <div>
            {props.label}
          </div>
        </div>
      </label>

    </div>
  );
};

export default CheckBox;
