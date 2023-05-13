import React from "react";

const PasswordField = (props) => {
  return (
    <>
      <div>
        <label className=" text-gray-900 text-sm" htmlFor="talkAdvBudget">
          {props.label}
        </label>
        <label className=" text-gray-600 text-sm" htmlFor="talkAdvBudget">
          <div className="mb-2"> {props.info}</div>
        </label>
        <input
          id={props.domId}
          type="password"
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-0 hover:border-primary"
          required
        />
      </div>
    </>
  );
};

export default PasswordField;
