// import { promise } from "bcrypt/promises";
import { useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { current } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: "1",
    bathrooms: "1",
    regularPrice: "50",
    discountPrice: "0",
    offer: false,
    parking: false,
    furnished: false,
  });

  const handleDeleteImage = (urlToDelete) => {
    // Placeholder function to delete the image with the given URL
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((url) => url !== urlToDelete),
    });
  };
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length < 7) {
      setUploading(true);

      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploading(false);
        })
        .catch((error) => {
          // Handle the error here if necessary
          console.error(error);
          // setUploading(false)
        });
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is a ${progress}%done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.imageUrls.length<1) return setError("You mast upload at least one image")
    if(+formData.regularPrice <+formData.discountPrice) return setError("Discount price must be lower then regular pirce")
    try {
      setLoading(true);
      setError(false);
      if (!formData.bedrooms || !formData.bathrooms) {
        setError("Number of bedrooms and bathrooms are required.");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/listings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className=" text-3xl text-center  my-7 font-semibold ">
        {" "}
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            required
            onChange={handleChange}
            value={formData.name}
            minLength={10}
            maxLength={62}
            className="border p-3 rounded-lg"
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            onChange={handleChange}
            value={formData.description}
            required
            className="border p-3 rounded-lg"
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            onChange={handleChange}
            value={formData.address}
            required
            className="border p-3 rounded-lg"
          />
          <div className=" flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="sale"
                onChange={handleChange}
                checked={formData.type == "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="rent"
                onChange={handleChange}
                checked={formData.type == "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="parking"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="furnished"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="offer"
                onChange={handleChange}
                checked={formData.offer}
              />
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
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex  items-center gap-2">
              <input
                type="number"
                min={1}
                max={10}
                className="p-3 border border-gray-300 rounded-lg"
                id="bathrooms"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex  items-center gap-2">
              <input
                type="number"
                min={50}
                max={100000}
                className="p-3 border border-gray-300 rounded-lg"
                id="regularPrice"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div>
                <p>Regular price</p>
                <span className="text-sm">($ / month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex  items-center gap-2">
              <input
                type="number"
                min={0}
                max={100000}
                className="p-3 border border-gray-300 rounded-lg"
                id="discountPrice"
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <div className="flexl flex-col item-center">
                <p>Discounted price</p>
                <span className="text-sm">($ / month)</span>
              </div>
            </div>

            )}          </div>
          <div className=""></div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              {" "}
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded full-w"
              type="file"
              onChange={(e) => setFiles(e.target.files)}
              id="images"
              accept="image/.*"
              multiple
              disabled={uploading}
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  className="p-3 text-red-700 uppercase rounded-lg hover:opacity-75"
                  onClick={() => handleDeleteImage(url)}
                >
                  delete
                </button>
              </div>
            ))}
          <button disabled={loading || uploading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? "Creating ..." : "Create listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
