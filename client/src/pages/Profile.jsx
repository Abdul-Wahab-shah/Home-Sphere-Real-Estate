import { useSelector } from "react-redux"

function Profile() {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className="p-3 max-w-lg  mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
<img src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center  mt-2"/>
    <input type="text" placeholder="username" className=" border p-3  rounded-lg" id="username"/>
    <input type="email" placeholder="email" className=" border p-3  rounded-lg" id="email"/>
    <input type="password" placeholder="password" className=" border p-3  rounded-lg" id="password"/>
    <button type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">update</button>
    <button type="submit" className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">create listing</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="cursor-pointer text-red-700 ">Delete account</span>
        <span className="cursor-pointer text-red-700 ">Sign in</span>
      </div>
    </div>
    
  )
}

export default Profile