import React from "react";


const InputFieldMore = (props) => {
  return (
    <>
      <div className="flex my-1 items-center">
        <div className="float-left w-20">
          <label className="text-gray-600 text-sm w-30" htmlFor="talkAdvBudget">
            {props.info}
          </label>
        </div>
        <div className="flex">
          <input
            id={props.domId}
            type={props.type}
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
            className="bg-gray-50 border-none bg-white text-gray-600 text-sm w-20 h-5"
            required
          />
          <label className="text-gray-600 text-sm" htmlFor={props.domId}>
            {props.label}
          </label>
        </div>
      </div>
    </>
  );
};

export default InputFieldMore;
