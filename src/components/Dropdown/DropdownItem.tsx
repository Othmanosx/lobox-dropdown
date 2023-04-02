import React from "react"
import { createUseStyles } from "react-jss"
import CheckIcon from "../CheckIcon"

const useStyles = createUseStyles({
  dropdownItem: {
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    color: "grey",
    fontSize: "1rem",
    borderRadius: 10,
    margin: 8,
    backgroundColor: "transparent",
    width: "fill-available",
    "&:hover": {
      backgroundColor: "#ddd",
    },
  },
  selected: {
    backgroundColor: "#DADEFF",
    color: "#738ad2",
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
      {isSelected && (
        <span className={classes.checkMark}>
          <CheckIcon />
        </span>
      )}
    </button>
  )
}

export default DropdownItem
