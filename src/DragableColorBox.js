import React from "react";
import { withStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import chroma from "chroma-js";
import breakpoints from "./breakpoints";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    position: "relative",
    cursor: "grab",
    display: "inline-block",
    marginTop: "-7px",
    backgroundColor: (props) => props.color,
    "&:hover svg": {
      color: (props) =>
        chroma(props.color).luminance() > 0.5 ? "#f2f2f2" : "rgba(0,0,0, 0.7)",
      transform: "scale(1.3)",
      [breakpoints.down("xs")]: {
        transform: "scale(1.1)",
      },
    },
    [breakpoints.down("md")]: {
      width: "25%",
      height: "20%",
    },
    [breakpoints.down("sm")]: {
      width: "50%",
      height: "10%",
    },
    [breakpoints.down("xs")]: {
      width: "100%",
      height: "5%",
    },
  },
  boxContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    left: "0",
    bottom: "0",
    width: "100%",
    color: (props) =>
      chroma(props.color).luminance() > 0.5 ? "rgba(0,0,0, 0.7)" : "#f2f2f2",
    letterSpacing: "1px",
    textTransform: "uppercase",
    padding: "10px",
    fontSize: "11px",
    [breakpoints.down("xs")]: {
      padding: "0",
    },
  },
  boxIcon: {
    color: "inherit",
    transform: "scale(0.9)",
    transition: "all .3s",
    cursor: "pointer",
  },
};

function DragableColorBox(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { classes, name } = props;
  return (
    <div
      className={classes.root}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className={classes.boxContent}>
        <span>{props.id}</span>
        <DeleteIcon
          className={classes.boxIcon}
          onClick={() => props.handleClick(name)}
        />
      </div>
    </div>
  );
}

export default withStyles(styles)(DragableColorBox);
