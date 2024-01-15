import React from "react";

export default function Search({
  search,
  image,
  location,
  locationImg,
  inputChange,
}) {
  return (
    <div className="flex w-full">
      <div className="flex justify-center w-[75rem] space-x-4">
        <input
          className="rounded-full bg-white h-[4rem] w-[25rem] text-center mt-6"
          type="text"
          onChange={inputChange}
          placeholder="Enter city name..."
        ></input>
        <div onClick={location} className="mt-6 bg-red-500">
          <img src={image} alt="" />
        </div>
        <button
          className="rounded-full bg-white h-[4rem] w-[4rem] flex justify-center items-center mt-6 "
          onClick={search}
        >
          <img src={locationImg} />
        </button>
      </div>
    </div>
  );
}
