import { useState } from "react"

interface passData {
    username :  string,
    email : string,
    password : string
}

interface propsData {
    name : string ,
    onEvent  : (data : passData) => void
}
const Form = (props: propsData) => {
    const [data, setData] = useState({
        username : '',
        email : '',
        password : ''
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name , value} = e.target

        setData({
            ...data,
            [name] : value
        })
        console.log(name , value)
    }

    const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        props.onEvent(data)
    }
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="h-2/3 w-[30%] min-w-[350px] rounded-2xl shadow-2xl bg-white flex flex-col justify-evenly items-center">

        <div className="text-5xl font-bold">{props.name}</div>

        <form onSubmit={handleSubmit} action="" className="flex justify-center items-center flex-col gap-5 w-full">

          <div className="flex flex-col gap-1 w-3/4">
            <label className="text-sm font-semibold">Username</label>
            <input onChange={handleChange} type="text" name="username" className="border-gray-400 border rounded-md outline-none px-2 py-2 focus:border-black" placeholder="Enter Username Here ...." />
          </div>

          <div className="flex flex-col gap-1 w-3/4">
            <label className="text-sm font-semibold">Email</label>
            <input onChange={handleChange} type="email" name="email" className="border-gray-400 border rounded-md outline-none px-2 py-2 focus:border-black" placeholder="Enter Email Here ...." />
          </div>

          <div className="flex flex-col gap-1 w-3/4">
            <label className="text-sm font-semibold">Password</label>
            <input onChange={handleChange} type="password" name="password" className="border-gray-400 border rounded-md outline-none px-2 py-2 focus:border-black" placeholder="Enter Password ..." />
          </div>

          <input type="submit" value={props.name} className="bg-black text-white px-8 py-2 rounded-lg cursor-pointer hover:bg-gray-800" />

        </form>

      </div>
    </div>
  )
}

export default Form