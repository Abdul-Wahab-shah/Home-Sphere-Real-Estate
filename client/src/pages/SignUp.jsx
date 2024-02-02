import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {


  const [formData, setFormData] = useState({});
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const navigate=useNavigate();

  const handleChange = (e) => {
   setFormData({
    ...formData,
    [e.target.id]: e.target.value
   })
  };
  console.log(formData);

  const handleSubmit = async(e) => {
setLoading(true);
    e.preventDefault();
    try{
      const res=await fetch("/api/auth/signup",
   {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
      
   });
  
    const data=await res.json();
    console.log(data);
    if(data.success === false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    navigate("/signin");
    }catch(error){
      setLoading(false);
setError(error.message);
    }
    
  
}
  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="username"
          className=" p-3 border border-gray-300 rounded-lg "
          onChange={handleChange}
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className=" p-3 border border-gray-300 rounded-lg "
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className=" p-3 border border-gray-300 rounded-lg "
          onChange={handleChange}
          id="password"
        />
        <button
          type="submit"
         disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "sign up"}
        </button>
        <button
          type="button"
          className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          <Link
            to={
              "https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?state=S2drYjBIRTdZVnlMQk9vZ291b216bG9HQ2xuR0h5d1J1YnRJSkYrZ2RUbERibXVDS0JHTVZHOWw1NmordkRybA&client_id=971390087100-nq1pekkjvhenn2898dr3b7fm7dcl1cjc.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fauth.mongodb.com%2Foauth2%2Fv1%2Fauthorize%2Fcallback&response_type=code&display=page&scope=email%20openid%20profile&service=lso&o2v=1&theme=glif&flowName=GeneralOAuthFlow"
            }
          >
        
            continue with google
          </Link>
        </button>
      </form>
      <div className="flex mt-5 gap-2">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default SignUp;
