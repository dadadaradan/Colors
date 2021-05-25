import breakpoints from "./breakpoints";
const drawerWidth = 300;

export default (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  flexBtnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: "1rem 0",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    alignSelf: "flex-end",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  colorPicker: {
    width: "100% !important",
  },
  inputField: {
    width: "100%",
    margin: ".5rem 0",
  },
  inputBtn: {
    width: "100%",
    padding: "1rem",
    // color: "black",
  },
  colorForm: {
    width: "100%",
  },
  btnGoBack: {
    textDecoration: "none",
  },
  navFlexContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    "& h5": {
      [breakpoints.down("sm")]: {
        fontSize: "2.5rem",
      },
      [breakpoints.down("sm")]: {
        display: "none",
      },
    },
    [breakpoints.down("sm")]: {
      justifyContent: "flex-end",
    },
  },
  navFlexBtnContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    margin: "0 0.5rem",
  },
});
