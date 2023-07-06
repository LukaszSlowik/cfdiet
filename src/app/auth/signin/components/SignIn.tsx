'use client'
import Button from '@/components/vahidNejad/Button'
import TextBox from '@/components/vahidNejad/TextBox'
import { signIn,  } from 'next-auth/react'
import React, { useRef, useState } from 'react'
import { useRouter ,useSearchParams} from 'next/navigation'
import { sendEmailForgetPassword } from '@/lib/fetch/fetch'
import GoogleSignInButton from './GoogleSignInButton'

type Props = {}
type InputErrors = {
  [key:string]: string
}
type RedisterData = {
  name:string,
  email:string,
  password:string,
  confirmPassword:string
}

export const getErrorMsg = (key: string, errors: InputErrors[]) => {
  if(errors.find(err => err.hasOwnProperty(key) !== undefined)) {
      const errorObj = errors.find(err => err.hasOwnProperty(key))
      return errorObj && errorObj[key]
  }
}



export default function SignIn({}: Props) {

  const router = useRouter();
  const params = useSearchParams();

  const callbackUrl = params ? (params.get("callbackUrl") as string) : "/"
  const userName = useRef("")
  const pass = useRef("")
// const [registerData,setRegisterData] = useState<RedisterData>({
//   name:"",
//   email:"",
//   password:"",
//   confirmPassword:""
// })
const [validateErrors,setValidateErrors] =useState<InputErrors[]>([])
const [submitError, setSubmitError] = useState<string>("")
const [loading,setLoading] = useState(false)
const [emailForReset,setemailForReset] = useState("")
const [userAlreadyExist,setUserAlreadyExist] = useState<boolean>(false)
const [userRegistered,setRegistered] = useState<boolean>(false)

// const validateData = ():boolean => {
// const err = []
// if(registerData.name.length<4)
// {
//   err.push({name:"Name must be at least 4 characters long"})
// }
// else if(registerData.name.length>30){
// err.push({name:"Full name should be less than 30 characters"})
// }
// else if(registerData.password.length<3){
//   err.push({password:"Password should be atleast 3 characters long"})
//   }
// else if(registerData.password !== registerData.confirmPassword){
//   err.push({confirmPassword: "Passwords don't match"})
//   }
// setValidateErrors(err)

// if(err.length>0)
// {
//   return false
// }
// else{
//   return true
// }
// }

// const handleRegister = async (event:React.FormEvent<HTMLFormElement>)=> {
//   event.preventDefault()
//   const isValid = validateData()

//   if(!isValid){
//     console.log("Not valid", validateErrors)
//   }
//   if(isValid)
//   {
// //sign up
// try{
//   setLoading(true)
//   setRegistered(false)
//   setUserAlreadyExist(false)
//   const response = await fetch(`/api/user`,
//   {
//     method:"POST",
//     body:JSON.stringify(registerData)
//   }) 

//   const result = await  response.json()
// if(result?.message === "User already exists")
// {
//   console.log(result?.message)
//   setRegisterData({
//     confirmPassword:"",
//     name:"",
//     email:"",
//     password:""
//   })
//   setUserAlreadyExist(true)
//   setLoading(false)
// }
// else{
//   setLoading(false)
//   setRegistered(true)
//   setUserAlreadyExist(false)
//   setRegisterData({
//     confirmPassword:"",
//     name:"",
//     email:"",
//     password:""
//   })
// }


// }
//    catch(error:any){
//     setSubmitError(error)
//    }
//   }
  
// }


// const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>)=> {
//   setRegisterData({ ...registerData, [event.target.name]: event.target.value})
// }


//   const onSubmit = async () => {
// const result = await signIn("credentials", {
//   username:userName.current,
//   password:pass.current,
//   redirect:false,
//   //callbackUrl:callbackUrl
// })
// if(result?.error){
// console.log(result?.error)
// }
// else{
//   router.push(callbackUrl)
// }
//   }


// const handleResetPassword = async () => {
// const result = await sendEmailForgetPassword(emailForReset)


// }


//   //if(loading) return (<div> Ładuje...</div>)
//   return (
//     <div
//     className={
//       "flex flex-col  justify-center items-center gap-3 "
//     }
//   >
   



{/* <div>Forgotten password</div>
<input className='text-black'
type='text'
placeholder='put you email'
value={emailForReset}
onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
  setemailForReset(event.target.value)
  console.log(event.target.value)
}}


/>
<button  type="button" onClick={handleResetPassword} disabled={!(emailForReset.length>0)}>Reset password</button> */}



{/* <div className= "flex flex-col gap-1" >
<label className='text-left'>Name</label>
<input className=' text-black'
type='text'
placeholder='name'
name="name"
value={registerData.name}
onChange={handleInputChange}
required
/>
<div className='w-[200px] text-red-500'>
{getErrorMsg("name", validateErrors) as string}
</div>

</div>
<div className= "flex flex-col gap-1" >
<label className='text-left'>Email</label>
<input className=' text-black'
type='text'
placeholder='email'
name="email"
value={registerData.email}
onChange={handleInputChange}
required
/>
<div className='w-[200px] text-red-500'>
{getErrorMsg("email", validateErrors) as string}
</div>
</div>
<div className= "flex flex-col gap-1" >
<label className='text-left'>Password</label>

<input className=' text-black'
type='password'
placeholder='password'
name="password"
value={registerData.password}
onChange={handleInputChange}
required
/>
<div className='w-[200px] text-red-500'>
{getErrorMsg("password", validateErrors) as string}
</div>
</div>
<div className= "flex flex-col gap-1" >
<label className='text-left'>Confirm Password</label>
<input className=' text-black'
type='password'
placeholder='confirmPassword'
name="confirmPassword"
value={registerData.confirmPassword}
onChange={handleInputChange}
required
/>
</div>
<button
type='submit'
disabled={loading}
>
  Sign up
</button>
{userAlreadyExist && <div> User already exist. Try diferent email</div>}
{userRegistered && <div> User has been created. You can login now</div>}
</form>

    </div> */}


    // <div>

    // </div>

    // <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2  text-black">
    //   <TextBox lableText="User Name" onChange={(e) => (userName.current = e.target.value)} />
    //   <TextBox
    //     lableText="Password"
    //     type={"password"}
    //     onChange={(e) => (pass.current = e.target.value)}
    //   />
    //   <Button onClick={onSubmit}>Login</Button>
    // </div>

    // <div className='mx-auto my-10 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
    //         or
    //       </div>

    return   (
      <div>
    
          <GoogleSignInButton />


  </div>
  )
}