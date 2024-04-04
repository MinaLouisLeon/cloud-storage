import { AlertCircle } from "lucide-react"

const AlertMsg = ({msg}:{msg:string}) => {
  return (
    <div className="p-4 bg-red-500 rounded-md flex gap-5 items-center text-white mt-5">
        <AlertCircle />
        {msg}
    </div>
  )
}

export default AlertMsg