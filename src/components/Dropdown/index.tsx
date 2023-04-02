import React, { useState, useRef } from "react"
import { createUseStyles } from "react-jss"
import ArrowIcon from "../ArrowIcon"
import useDropdown from "../../hooks/useDropdown"
import useOutsideClick from "../../hooks/useOutsideClick"
import DropdownItem from "./DropdownItem"

const useStyles = createUseStyles({
  dropdown: {
    position: "relative",
    display: "inline-block",
  },
  dropdownContent: {
    position: "absolute",
    backgroundColor: "#f1f1f1",
    minWidth: "160px",
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
    zIndex: 1,
  },
})
interface DropdownProps {
  items?: string[]
  placeholder?: string
  onSelect?: (selectedItem: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({
  items: initialItems = [],
  placeholder = "",
  onSelect,
}) => {
  const [items, setItems] = useState<string[]>(initialItems)
  const [inputValue, setInputValue] = useState<string>("")
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const classes = useStyles()

  const { isOpen, open, close, toggle } = useDropdown()
  useOutsideClick(wrapperRef, close)

  const handleItemClick = (item: string) => {
    setSelectedItem(item)
    setInputValue(item)
    if (onSelect) {
      onSelect(item)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue && !items.includes(inputValue)) {
      setItems([...items, inputValue])
      handleItemClick(inputValue)
      e.preventDefault()
      return
    }
    if (e.key === "Escape") close()
    if (e.key === "Tab" || e.key === " " || e.key === "Enter") open()
  }

  return (
    <div className={classes.dropdown} ref={wrapperRef}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onClick={() => open()}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        placeholder={placeholder}
      />
      <ArrowIcon isOpen={isOpen} onClick={toggle} />
      {isOpen && (
        <div className={classes.dropdownContent} role="listbox">
          {items.map((item) => (
            <DropdownItem
              key={item}
              item={item}
              isSelected={item === selectedItem}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
export default Dropdown
