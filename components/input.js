import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import dataHandler from "./datahandler";
import { AssignAfterTraverse, Traverse } from "./utils";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";

export default function Input({ setData }) {
  const [data, setdata] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      const data = reader.result;
      dataHandler.write(data).then((cid) => {
        setData(acceptedFiles[0].name, cid);
      });
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
  });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-center cursor-pointer">Drop the files here ...</p>
      ) : (
        <p className="px-12 my-6 text-4xl rounded-3xl py-8 flex bg-[#BAF2FF] text-black cursor-pointer w-max hover:bg-[#5AD4EF]">
          <BsUpload fontSize={40} />
          <div className="pl-2">Upload</div>
        </p>
      )}
    </div>
  );
}

export function CreateFolder({ currentRoot, setCurrentRoot, path }) {
  const [name, setName] = useState("");
  const onCreate = () => {
    if (currentRoot[name]) {
      alert("folder already exists!");
      return;
    }
    currentRoot[name] = {};
    setCurrentRoot(currentRoot);
    setName("");
  };
  return (
    <div className="py-6">
      <div
        onClick={onCreate}
        className="px-12 text-4xl py-8 rounded-3xl flex bg-[#BAF2FF] text-black cursor-pointer w-max mx-32 hover:bg-[#5AD4EF]"
      >
        <AiOutlineFolderAdd fontSize={40} />
        <div className="pl-2">Create Folder</div>
      </div>
    </div>
  );
}
