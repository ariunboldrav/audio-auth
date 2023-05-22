import React, { useState, useEffect } from "react";
import Datepicker from "tailwind-datepicker-react";

const MyDatePicker = (props) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    // if (props.value) {
    //   var tDate = Date.parse(props.value);
    //   console.log(tDate)
    // } else {
    // }
    // console.log(tDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = (state) => {
    setShow(state);
  };

  const handleChange = (selectedDate = Date) => {
    setSelectedDate(selectedDate);
    // console.log(selectedDate.toString())
    props.setValue(selectedDate.toISOString());
  };

  const options = {
    title: "",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date(),
    theme: {
      background: "",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "",
      input: "",
      inputIcon: "",
      selected: "",
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => <span>Previous</span>,
      next: () => <span>Next</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: selectedDate != undefined ? selectedDate : new Date(),
    language: "en",
  };

  return (
    <div>
      <label className=" text-gray-900 text-sm" htmlFor="talkAdvBudget">
        {props.label}
      </label>
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        value={Date.parse(props.value)}
        setShow={handleClose}
      />
      <div>{props.error}</div>
    </div>
  );
};

export default MyDatePicker;
