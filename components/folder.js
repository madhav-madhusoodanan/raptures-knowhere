import { useState, useEffect } from "react";
import instance from "./axios";
import dataHandler from "./datahandler";
import Executor from "./execution";
import Input, { CreateFolder } from "./input";
import { AiFillFolder } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { AssignAfterTraverse, Traverse } from "./utils";

export default function Folder() {
  const [create1, setCreate1] = useState(false);
  const [orgAddress, setOrgAddress] = useState("Not Connected");
  const [myAddress, setMyAddress] = useState("Not Connected");
  const [create, setCreate] = useState(false);
  const [dummy, setDummy] = useState(0);
  const [path, setPath] = useState([]);
  const [root, setRoot] = useState({
    1: { 4: { 2: "3" }, 2: { 3: { lmao: "ded" } } },
  });

  const updateProfile = async () => {
    const executor = new Executor();

    const cid = await dataHandler.write(JSON.stringify(root));
    await executor.putProfile(cid);
    alert("profile updated!");
  };
  const editTree = (currentRoot) => {
    setRoot((root) => AssignAfterTraverse(root, path, currentRoot));
    setDummy(Date.now());
    // updateProfile().then()
  };
  const setData = (name, value) => {
    console.log(name, value);
    const pathLocal = [...path, name];
    setRoot((root) => AssignAfterTraverse(root, pathLocal, value));
    setDummy(Date.now());
    // updateProfile().then()
  };
  return (
    // < className="h-full w-full rounded grid place-items-center">
    <div>
      <ModalFolder />
      <Orglist />
      <div className="bg-[#D9D9D933] w-full flex justify-between drop-shadow-2xl">
        <div>
          <div className="flex">
            {path.length !== 0 && (
              <div
                onClick={() => {
                  // path.pop()
                  setPath(path.filter((_, index) => index !== path.length - 1));
                }}
                className="h-40 w-full rounded grid place-items-center bg-red-300 text-black cursor-pointer"
              >
                <p className="w-1/2 font-bold text-center">Back</p>
              </div>
            )}
            <CreateFolder
              currentRoot={Traverse(root, path)}
              setCurrentRoot={editTree}
              onClick={() => {
                setCreate(true);
              }}
            />

            <Input setData={setData} />
          </div>

          <div className="bg-[#D9D9D94D] ml-32 text-3xl rounded-lg pl-4 mb-8 mt-12 py-4">
            Home &gt;
          </div>
        </div>
        <div className="flex mr-24">
          <div className=" py-12 mr-6">
            <div
              className="bg-[#BAF2FF] rounded-3xl text-3xl py-4 px-6 hover:cursor-pointer"
              onClick={() => {
                setCreate1(true);
                console.log(create1);
              }}
            >
              {orgAddress}
            </div>
          </div>
          <div className="py-12">
            <div className="bg-[#BAF2FF] rounded-3xl text-3xl py-4 px-6">
              {myAddress}
            </div>
          </div>
        </div>
      </div>

      {Object.keys(Traverse(root, path))
        .filter((key) => {
          typeof Traverse(root, path)[key] === "object";
        })
        .map((key, index) => (
          <Element
            currentRoot={Traverse(root, path)}
            rootElem={key}
            key={index}
            setPath={setPath}
            path={path}
          />
        ))}
    </div>
  );
}

function ModalFolder({ create }) {
  if (create == true) {
    return (
      <div className="bg-[#D1D1D1] w-1/5 rounded-xl relative z-10 top-96 mx-auto">
        <div onClick={() => {}}>
          <AiOutlineClose fontSize={40} />
        </div>
        <div className="flex items-center m-4 pt-2 border-2 border-black rounded-lg">
          <AiFillFolder fontSize={40} />{" "}
          <input
            type="name"
            className=" bg-[#D1D1D1] w-full text-xl xl:text-3xl md:text-2xl text-center py-2 shadow-inner text-black placeholder-black"
            onChange={({ target: { value } }) => setName(value)}
            id="name"
            name="name"
            placeholder="Enter Folder Name"
            autocomplete="off"
          />
        </div>
        <div className="text-3xl text-center cursor-pointer py-2">Create</div>
      </div>
    );
  }
}
function Orglist({ orgAddress, create1 }) {
  if (create1 == true) {
    return (
      <div className="bg-[#D1D1D1] w-1/5 rounded-xl relative z-10 top-96 mx-auto">
        <div className="text-md">{orgAddress}</div>
        <div>{orgAddress}</div>
      </div>
    );
  }
}
function Element({ currentRoot, rootElem, setPath, path }) {
  const [data, setData] = useState("");
  const onClick = async () => {
    const response = await instance.get(currentRoot[rootElem]);
    setData(response.data);
  };
  if (typeof currentRoot[rootElem] === "object") {
    //Folder
    return (
      <div
        onClick={() => setPath([...path, rootElem])}
        className="h-40 w-full rounded grid place-items-center bg-blue-300 text-black cursor-pointer"
      >
        <p className="w-1/2 font-bold text-center">{rootElem}</p>
      </div>
    );
  } else if (typeof currentRoot[rootElem] === "string") {
    //Files
    if (data == "")
      return (
        <div>
          <div className="text-4xl font-semibold underline text-center py-20">
            Files
          </div>
          <div
            className="h-40 w-full rounded grid place-items-center bg-neutral-300 text-black cursor-pointer"
            onClick={onClick}
          >
            <p className="w-1/2 font-bold text-center">{rootElem}</p>
          </div>
        </div>
      );
    else
      return (
        <a href={data} target="_blank" rel="noopener noreferrer">
          <div className="h-40 w-full rounded grid place-items-center bg-green-300 text-black cursor-pointer">
            <p className="w-1/2 font-bold text-center">{rootElem}</p>
          </div>
        </a>
      );
  }
}

/* onClick={() => {
        dataHandler.read(currentRoot[rootElem]).then(data => {
            window.open(data, "_blank")
        })
    }} */
/* const [project, setProject] = useState({
    name: "lightning network project",
    img: "",
    logo: "",
    description: "",
    state: "",
}) */
