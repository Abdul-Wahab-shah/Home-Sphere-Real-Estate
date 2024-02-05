import React from "react";

function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className=" text-3xl text-center  my-7 font-semibold ">
        {" "}
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            required
            minLength={10}
            maxLength={62}
            className="border p-3 rounded-lg"
          />
          <textarea
            type="text"
            placeholder="Discription"
            id="discription"
            required
            className="border p-3 rounded-lg"
          />
          <input
            type="text"
            placeholder="Address"
            id="dddress"
            required
            className="border p-3 rounded-lg"
          />
          <div className=" flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="sale" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="parking" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex  items-center gap-2">
              <input
                type="number"
                min={1}
                max={10}
                className="p-3 border border-gray-300 rounded-lg"
                id="bedrooms"
              />
              <p>Beds</p>
            </div>
            <div className="flex  items-center gap-2">
              <input
                type="number"
                min={1}
                max={10}
                className="p-3 border border-gray-300 rounded-lg"
                id="bathroom"
              />
              <p>Baths</p>
            </div>
            <div className="flex  items-center gap-2">
              <input
                type="number"
                min={1}
                max={90}
                className="p-3 border border-gray-300 rounded-lg"
                id="regularPrice"
              />
              <div>
                <p>Regular price</p>
                <span className="text-sm">($ / month)</span>
              </div>
            </div>
            <div className="flex  items-center gap-2">
              <input
                type="number"
                min={1}
                max={90}
                className="p-3 border border-gray-300 rounded-lg"
                id="discountPrice"
              />
              <div className="flexl flex-col item-center">
                <p>Discounted price</p>
                <span className="text-sm">($ / month)</span>
              </div>
            </div>
          </div>
          <div className="">

          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
<p className="font-semibold">Images:
<span className="font-normal text-gray-600 ml-2"> The first image will be the cover (max 6)</span>
</p>

<div className="flex gap-4">
<input className="p-3 border border-gray-300 rounded full-w" type="file" id="images" accept="image/.*" multiple/>
<button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
</div>
        <button
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80" >
        Create listing
        </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
