import React from "react";


const FileUploadField = (props) => {
  return (
    <>
      <div>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg border-blue cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-0 pb-0">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-0 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <span className="mb-0 text-sm text-gray-500 dark:text-gray-400">
                ファイルをドラッグ＆ドロップ
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG, DOCX
              </span>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        <div className="text-sm">AWS PrivateKey Error</div>
        {/* <div className="rounded-lg border border-gray p-0 mt-5">
          <div className="text-sm text-gray-900 py-2 pl-5">Screen Shot 2023-04-20 at {props.value}.png</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className={`bg-primary h-2.5 rounded-full w-${props.width}`}></div>
          </div>
        </div>
        <div className="rounded-lg border border-gray p-0 mt-5">
          <div className="text-sm text-gray-900 py-2 pl-5">Screen Shot 2023-04-20 at {props.value}.png</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className={`bg-primary h-2.5 rounded-full w-${props.width / 2}`}></div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default FileUploadField;
