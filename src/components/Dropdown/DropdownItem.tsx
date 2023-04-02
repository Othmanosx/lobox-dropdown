import React from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
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

interface DropdownItemProps {
  item: string
  isSelected: boolean
  onClick: () => void
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  item,
  isSelected,
  onClick,
}) => {
  const classes = useStyles()

  return (
    <button
      onClick={onClick}
      className={`${classes.dropdownItem} ${
        isSelected ? classes.selected : ""
      }`}
      role="option"
      aria-selected={isSelected}
    >
      {item}
      {isSelected && <span className={classes.checkMark}>&#x2713;</span>}
    </button>
  )
}

export default DropdownItem
