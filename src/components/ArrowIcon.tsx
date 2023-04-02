import { createUseStyles } from "react-jss"

type Props = {
  isOpen: boolean
  onClick: () => void
}
const useStyles = createUseStyles({
  arrow: {
    position: "absolute",
    right: 16,
    top: "50%",
    width: 12,
    transform: "translateY(-50%)",
  },
  arrowUp: {
    transform: "rotate(180deg)",
  },
})
const ArrowIcon = ({ isOpen, onClick }: Props) => {
  const classes = useStyles()

  return (
    <span onClick={onClick} className={classes.arrow}>
      <svg
        className={isOpen ? classes.arrowUp : ""}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 1000 1000"
        enableBackground="new 0 0 1000 1000"
        xmlSpace="preserve"
      >
        <g>
          <path d="M972.2,328.1L546.3,753.9c-1,1.3-1.5,2.9-2.7,4c-12,12.1-27.9,17.9-43.6,17.7c-15.8,0.2-31.7-5.6-43.7-17.7c-1.2-1.2-1.7-2.8-2.7-4L27.8,328.1c-23.8-23.8-23.8-62.3,0-86c23.7-23.8,62.2-23.8,86,0L500,628.4l386.2-386.2c23.8-23.8,62.3-23.8,86,0C995.9,265.8,995.9,304.3,972.2,328.1z" />
        </g>
      </svg>
    </span>
  )
}

export default ArrowIcon
