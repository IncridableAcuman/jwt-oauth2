import { UserCircle } from "lucide-react"

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between md:justify-around gap-4 bg-gray-900 backdrop-blur-lg p-6 z-50">
      <h1 className="text-sky-500 text-lg font-semibold cursor-pointer hover:text-white transition duration-300">Java<span 
      className="text-white hover:text-sky-500 transition duration-300">Auth</span></h1>
      <div className="hidden md:block">
        <ul className="flex items-center gap-3">
        <li className="cursor-pointer hover:text-sky-500 transition duration-300">Home</li>
        <li className="cursor-pointer hover:text-sky-500 transition duration-300">Services</li>
        <li className="cursor-pointer hover:text-sky-500 transition duration-300">Skills</li>
        <li className="cursor-pointer hover:text-sky-500 transition duration-300">Contact</li>
      </ul>
      </div>
      <div className="">
        <button className="border-2 border-sky-500 p-2 rounded-full">
          <UserCircle size={18}/>
        </button>
      </div>
    </div>
  )
}

export default Navbar