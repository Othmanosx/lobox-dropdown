import React, { useState, useEffect, useRef } from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
  dropdownContainer: {
    position: "relative",
    display: "inline-block",
  },
  dropdownButton: {
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    borderRadius: "4px",
    cursor: "pointer",
  },
  dropdownContent: {
    display: (props: { open: boolean }) => (props.open ? "block" : "none"),
    position: "absolute",
    backgroundColor: "white",
    minWidth: "160px",
    boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
    zIndex: 1,
    padding: "8px",
    borderRadius: "4px",
  },
  dropdownItem: {
    padding: "8px 16px",
    cursor: "pointer",
    backgroundColor: (props: { selected: boolean }) =>
      props.selected ? "#ddd" : "transparent",
    "&:hover": {
      backgroundColor: "#ddd",
    },
  },
})

interface CustomDropdownProps {
  items: string[]
  onNewItem: (item: string) => void
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  items,
  onNewItem,
}) => {
  const [open, setOpen] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [selectedItem, setSelectedItem] = useState("")
  const dropdownButtonRef = useRef<HTMLButtonElement>(null)
  const classes = useStyles({ open })

  useEffect(() => {
    if (open) {
      setSelectedItemIndex(0)
    }
  }, [open])

  const toggleDropdown = () => {
    setOpen(!open)
  }

  const handleButtonClick = () => {
    toggleDropdown()
    if (dropdownButtonRef.current) {
      dropdownButtonRef.current.focus()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setSelectedItemIndex((prevIndex) =>
        Math.min(prevIndex + 1, items.length - 1)
      )
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setSelectedItemIndex((prevIndex) => Math.max(prevIndex - 1, 0))
    } else if (event.key === "Enter") {
      event.preventDefault()
      if (open) {
        onNewItem(items[selectedItemIndex])
        setSelectedItem(items[selectedItemIndex])
        setOpen(false)
      } else {
        setOpen(true)
      }
    } else if (event.key === "Escape") {
      event.preventDefault()
      setOpen(false)
    }
  }

  const handleClickItem = (item: string) => {
    onNewItem(item)
    setSelectedItem(item)
    setOpen(false)
  }

  return (
    <div className={classes.dropdownContainer} onKeyDown={handleKeyDown}>
      <button
        ref={dropdownButtonRef}
        onClick={handleButtonClick}
        tabIndex={0}
        className={classes.dropdownButton}
      >
        {selectedItem || "Select item"}
      </button>
      <div className={classes.dropdownContent}>
        {items.map((item, index) => (
          <div
            key={index}
            className={
              useStyles({ selected: selectedItemIndex === index }).dropdownItem
            }
            onClick={() => handleClickItem(item)}
            tabIndex={-1}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomDropdown
