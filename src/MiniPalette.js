import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import SvgIcon from "@material-ui/icons/Delete";

const styles = {
  root: {
    background: "white",
    display: "inline-block",
    borderRadius: "5px",
    padding: "5px ",
    cursor: "pointer",
    position: "relative",
    "&:hover svg": {
      opacity: 1,
      visibility: "visible",
    },
  },
  delete: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: "2",
    backgroundColor: "#e01b5c",
    padding: "5px",
    color: "#f2f2f2",
    opacity: 0,
    visibility: "hidden",
    transition: "all 0.5s",
  },
  colorsContainer: {
    backgroundColor: "grey",
    height: "100px",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1rem",
    fontWeight: "200",
    padding: ".2rem .4rem 0 .4rem",
  },
  emoji: {
    fontSize: "1rem",
  },
  miniColorBox: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    marginTop: "-4px",
  },
};

function MiniPalette(props) {
  const {
    classes,
    colors,
    emoji,
    paletteName,
    handleClick,
    id,
    deletePalette,
  } = props;

  function handleDelete(evt) {
    evt.stopPropagation();
    deletePalette(id);
  }

  return (
    <div className={classes.root} onClick={handleClick}>
      <SvgIcon className={classes.delete} onClick={handleDelete}>
        <DeleteIcon />
      </SvgIcon>
      <div className={classes.colorsContainer}>
        {colors.map((col) => {
          return (
            <div
              key={col.name}
              className={classes.miniColorBox}
              style={{ backgroundColor: `${col.color}` }}
            ></div>
          );
        })}
      </div>
      <h5 className={classes.title}>
        {paletteName}
        <span className={classes.emoji}> {emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
