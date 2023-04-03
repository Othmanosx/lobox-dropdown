import React, { useState, useRef } from "react"
import { createUseStyles } from "react-jss"
import ArrowIcon from "../ArrowIcon"
import useDropdown from "hooks/useDropdown"
import useOutsideClick from "hooks/useOutsideClick"
import DropdownItem from "./DropdownItem"
import { FixedSizeList as List } from "react-window"

const useStyles = createUseStyles((theme) => ({
  dropdown: {
    position: "relative",
    display: "inline-block",
    width: "100%",
    minWidth: 250,
    maxWidth: 400,
  },
  input: {
    padding: "0.75rem",
    paddingRight: "2rem",
    fontSize: "1rem",
    borderRadius: 12,
    width: "fill-available",
    border: "2px solid",
    borderColor: theme.colorPrimary,
    "&:focus": {
      outline: "3px solid",
      outlineColor: theme.colorAccent,
    },
  },
  dropdownContent: {
    position: "absolute",
    minWidth: "100%",
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.12)",
    zIndex: 1,
    marginTop: "0.5rem",
    borderRadius: "1rem",
    overflowY: "auto",
    maxHeight: 300,
    overflowX: "hidden",
  },
}))
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

  const ListItem = ({
    index,
    style,
  }: {
    index: number
    style: React.CSSProperties
  }) => (
    <div style={style}>
      <DropdownItem
        key={items[index]}
        item={items[index]}
        isSelected={items[index] === selectedItem}
        onClick={() => handleItemClick(items[index])}
      />
    </div>
  )

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
        className={classes.input}
        placeholder={placeholder}
      />
      <ArrowIcon isOpen={isOpen} onClick={toggle} />
      {isOpen && (
        <div className={classes.dropdownContent} role="listbox">
          <List
            height={Math.min(300, items.length * 50)} // list height
            itemCount={items.length}
            itemSize={44} // item height
            width="100%"
          >
            {ListItem}
          </List>
        </div>
      )}
    </div>
  )
}
export default Dropdown
