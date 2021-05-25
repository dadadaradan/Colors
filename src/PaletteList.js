import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";
import breakpoints from "./breakpoints";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import bg from "./bg.svg";

const styles = {
  "@global": {
    ".fade-exit": {
      opacity: 1,
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "all .5s",
    },
  },
  root: {
    paddingTop: "3rem",
    minHeight: "100vh",
    backgroundColor: "#4a2e21",
    backgroundImage: `URL(${bg})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    overflow: "scroll",
  },
  container: {
    width: "60%",
    margin: "0 auto 2rem auto",
    [breakpoints.up("xl")]: {
      maxWidth: "850px",
    },
    [breakpoints.down("lg")]: {
      width: "75%",
    },
    [breakpoints.down("md")]: {
      width: "90%",
    },

    [breakpoints.down("sm")]: {
      width: "80%",
    },
    [breakpoints.down("xs")]: {
      width: "50%",
    },
    [breakpoints.down("xxs")]: {
      width: "80%",
    },
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".7rem .5rem",
    "& a": {
      textDecoration: "none",
      color: "white",
    },

    [breakpoints.down("xs")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  title: {
    color: "white",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%",
    gridRowGap: "1rem",
    [breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(2, 45%)",
      gridGap: "5%",
    },
    [breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr",
      // gridGap: "5%",
    },
  },
};

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      toBeDeleted: "",
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }

  openDialog(id) {
    this.setState({ isDialogOpen: true, toBeDeleted: id });
  }

  closeDialog() {
    this.setState({ isDialogOpen: false, toBeDeleted: "" });
  }
  handleDelete() {
    this.props.deletePalette(this.state.toBeDeleted);
    this.closeDialog();
  }

  render() {
    const { palettes, classes } = this.props;
    const { isDialogOpen } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.heading}>
            {" "}
            <h1 className={classes.title}>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </div>

          <TransitionGroup className={classes.gridContainer}>
            {palettes.map((pal) => {
              return (
                <CSSTransition key={pal.id} timeout={500} classNames="fade">
                  <MiniPalette
                    key={pal.id}
                    {...pal}
                    handleClick={() => this.goToPalette(pal.id)}
                    deletePalette={this.openDialog}
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>

          <Dialog open={isDialogOpen} onClose={this.closeDialog}>
            <DialogTitle>Are you sure ?</DialogTitle>
            <List>
              <ListItem button onClick={this.handleDelete}>
                <ListItemAvatar>
                  <Avatar
                    style={{ backgroundColor: blue[100], color: blue[600] }}
                  >
                    <CheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>Done</ListItemText>
              </ListItem>

              <ListItem button onClick={this.closeDialog}>
                <ListItemAvatar>
                  <Avatar
                    style={{ backgroundColor: red[100], color: red[600] }}
                  >
                    <CloseIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>Close</ListItemText>
              </ListItem>
            </List>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
