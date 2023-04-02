import React from "react"
import { createUseStyles } from "react-jss"
import CheckIcon from "../CheckIcon"

const useStyles = createUseStyles((theme) => ({
  dropdownItem: {
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    color: theme.colorGrey,
    fontSize: "1rem",
    borderRadius: 10,
    margin: "0.5rem",
    backgroundColor: "transparent",
    width: "fill-available",
    "&:hover": {
      backgroundColor: theme.colorHover,
    },
  },
  selected: {
    backgroundColor: theme.colorAccent,
    color: theme.colorPrimary,
  },
}))

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
      {isSelected && <CheckIcon />}
    </button>
  )
}

export default DropdownItem
