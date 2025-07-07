import { useState } from "react"


export const useCopyLink = () => {
  const [ showToast, setShowToast ] = useState(false)
  
  const handleCopyLink = ( event:React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent> ) =>{
    event.stopPropagation()
    event.preventDefault()
    setShowToast(true)

    setTimeout(() =>{
      setShowToast(false)
    }, 1500)
  }

  return {
    showToast,
    handleCopyLink
  }
}