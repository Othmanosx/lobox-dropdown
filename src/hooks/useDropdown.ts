import { useState } from "react"

interface UseDropdownResult {
  isOpen: boolean
  toggle: () => void
  close: () => void
  open: () => void
}

function useDropdown(): UseDropdownResult {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const close = () => {
    setIsOpen(false)
  }

  const open = () => {
    setIsOpen(true)
  }

  return { isOpen, toggle, close, open }
}

export default useDropdown
