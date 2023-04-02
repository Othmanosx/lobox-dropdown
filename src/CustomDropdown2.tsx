import React, { useState, useRef, useEffect } from "react"
import { createUseStyles } from "react-jss"
import ArrowIcon from "./assets/ArrowIcon"

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
  dropdownItem: {
    color: "black",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    backgroundColor: "transparent",
    width: "100%",
    "&:hover": {
      backgroundColor: "#ddd",
    },
  },
  selected: {
    backgroundColor: "#ddd",
  },
  checkMark: {
    marginLeft: "8px",
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
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [items, setItems] = useState<string[]>(initialItems)
  const [inputValue, setInputValue] = useState<string>("")
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const classes = useStyles()

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
    } else if (e.key === "Escape") {
      setIsOpen(false)
    } else if (e.key === "Tab" || e.key === " " || e.key === "Enter") {
      setIsOpen(true)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={classes.dropdown} ref={wrapperRef}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onClick={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        placeholder={placeholder}
      />
      <ArrowIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className={classes.dropdownContent} role="listbox">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              className={`${classes.dropdownItem} ${
                item === selectedItem ? classes.selected : ""
              }`}
              role="option"
              aria-selected={item === selectedItem}
            >
              {item}
              {item === selectedItem && (
                <span className={classes.checkMark}>&#x2713;</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
export default Dropdown
