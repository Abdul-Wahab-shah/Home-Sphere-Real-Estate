import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase.js'
import {useDispatch} from 'react-redux'
import {signInSuccess} from "../reduxToolkit/user/userSlice.js"
import {useNavigate} from 'react-router-dom'

function OAuth() {
    const handleGoogleClick=async()=>{
        try{
const provider=new GoogleAuthProvider()
const dispatch=useDispatch()
const navigate=useNavigate
const auth=getAuth(app)

const result= await signInWithPopup(auth,provider)
            console.log(result)
            const res=await fetch('api/auth/google',{
            method:'POST',
            headers:{
                    "content-Type":'application/json',
            },
            body:JSON.stringify({
                name:result.user.displayName,
                email:result.user.email,
                 photo:result.user.photoURL,  
            }),
        });
        const data=await res.json();
        dispatch(signInSuccess(data))
navigate('/')

        }catch(error){
            console.log('could not sign in the google',error)
        }
    }
  return (
    
    <button
          type="button"
          onChange={handleGoogleClick}
          className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          continue with google
        </button>
        
  )
}

export default OAuth