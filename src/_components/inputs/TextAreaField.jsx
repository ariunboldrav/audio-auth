import React from "react";

const TextAreaField = (props) => {

  function handleKeyDown(e) {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  return (
    <div>
      <div className="text-black text-sm" htmlFor={props.domId}>
        {props.label}
      </div>
      <div className="mb-2 text-sm text-gray-500"> {props.info}</div>
      {props.extInput1}
      {props.extInput2}
      {props.extInput3}
      {props.extInput4}
      <textarea
        id={props.domId}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        rows={3}
        onKeyDown={(e) => handleKeyDown(e)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-0 hover:border-primary"
        required
      />
    </div>
  );
};

export default TextAreaField;
