import ErrorHandler from "_helpers/errorHandler";
import React from "react";

const InputField = (props) => {

  ErrorHandler(props.errors);

  return (
    <>
      <div>
        {props.label ?
          <div className={`${props.class} text-sm`} htmlFor={props.domId}>
            {props.label}
          </div> : null}
        {props.extInput1}
        {props.extInput2}
        {props.extInput3}
        {props.extInput4}
        <input
          id={props.domId}
          value={props.value}
          disabled={props.disabled}
          placeholder={props.placeholder}
          onChange={(e) => props.setValue(e.target.value)}
          className={`${props.disabled ? 'bg-gray-100' : 'bg-white'} border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-0 hover:border-primary`}
          required
        />
        <div>{props.error}</div>
      </div>
    </>
  );
};

export default InputField;
