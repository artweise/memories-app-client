import { toast } from "react-toastify"

export const notifySuccess = (message = "Success", icon = "🧸") => {
  toast.success(`${icon} ${message}`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
}

export const notifyError = (message = "Something went wong", icon = "👀") => {
  toast.error(`${icon} ${message}`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
}
