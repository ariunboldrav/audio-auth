import { AnyARecord } from "dns";
import React from "react";

interface IFProps {
  label?: string;
  info?: string;
  rows?: number;
  value: any;
  setValue: any;
  extInput1?: any;
  extInput2?: any;
  extInput3?: any;
  extInput4?: any;
}

const TextAreaField: React.FC<IFProps> = (props: IFProps) => {
  return (
    <>
      <div>
        <label className="text-gray-900 text-sm" htmlFor="talkAdvBudget">
          {props.label}
        </label>
        <label className="text-gray-600 text-xs" htmlFor="talkAdvBudget">
          <div className="mb-2"> {props.info}</div>
        </label>
        {props.extInput1}
        {props.extInput2}
        {props.extInput3}
        {props.extInput4}
        <textarea
          id="advBudget"
          value={props.value}
          rows={props.rows}
          onChange={(e) => props.setValue(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-0 hover:border-primary"
          required
        />
      </div>
    </>
  );
};

export default TextAreaField;
