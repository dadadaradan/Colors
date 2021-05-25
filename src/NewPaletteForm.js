import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { withStyles } from "@material-ui/core";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DragableColorBox from "./DragableColorBox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import chroma from "chroma-js";
import { Link } from "react-router-dom";
import ModalForm from "./ModalForm";
import styles from "./styles/NewPaletteFormStyle";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

function NewPaletteForm(props) {
  const [newColorsArr, setNewColorsArr] = useState([]);
  const [colorName, setColorName] = useState("");
  const [pickerColor, setPickerColor] = useState({ name: "teal", hex: "teal" });
  const { classes } = props;
  const [open, setOpen] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addColorToArray = (newColor, newName) => {
    setNewColorsArr([...newColorsArr, { name: newName, color: newColor }]);
  };

  const handleChange = (evt) => {
    setColorName(evt.target.value);
  };

  const handleSubmit = (newPalette) => {
    newPalette.colors = newColorsArr;
    console.log(newPalette);
    props.handleSubmit(newPalette);
    props.history.push("/");
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("uniqueColorName", (value) =>
      newColorsArr.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("uniqueColor", () =>
      newColorsArr.every(({ color }) => color !== pickerColor.hex)
    );
  });

  const removeColor = (name) => {
    const newArr = newColorsArr.filter((color) => color.name !== name);
    setNewColorsArr(newArr);
  };

  const randomColor = () => {
    const newColor = chroma.random().hex();
    const newColorName = chroma(newColor).name();
    setNewColorsArr([...newColorsArr, { name: newColorName, color: newColor }]);
  };

  const isDisabled = newColorsArr.length >= 20;

  const handleDragEnd = (event) => {
    const { active, over } = event;

    console.log(event);

    if (active.id !== over.id) {
      setNewColorsArr((newColorsArr) => {
        const oldIndex = newColorsArr.findIndex(
          (obj) => obj.color === active.id
        );
        const newIndex = newColorsArr.findIndex((obj) => obj.color === over.id);

        console.log(oldIndex);
        console.log(newIndex);

        return arrayMove(newColorsArr, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        color="default"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.navFlexContainer}>
            <Typography variant="h5">Design Your Palette</Typography>
            <div className={classes.navFlexBtnContainer}>
              <Link to="/" className={classes.btnGoBack}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  Back
                </Button>
              </Link>
              <ModalForm
                handleSubmit={handleSubmit}
                palettes={props.palettes}
                className={classes.button}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Divider />
        <div className={classes.flexContainer}>
          <Typography variant="h4">Design a Palette</Typography>
          <div className={classes.flexBtnContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setNewColorsArr([])}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={randomColor}
              disabled={isDisabled}
            >
              Get Random
            </Button>
          </div>
          <ChromePicker
            className={classes.colorPicker}
            color={pickerColor}
            onChangeComplete={(newColor) => setPickerColor(newColor)}
          />
          <ValidatorForm
            onSubmit={() => addColorToArray(pickerColor.hex, colorName)}
            className={classes.colorForm}
          >
            <TextValidator
              className={classes.inputField}
              //   variant="filled"
              label="Color Name"
              value={colorName}
              name="colorName"
              onChange={handleChange}
              validators={["required", "uniqueColorName", "uniqueColor"]}
              errorMessages={[
                "Please enter a color name",
                "Color name already taken",
                "Color must be unique",
              ]}
            />
            <Button
              type="submit"
              variant="contained"
              // color="primary"
              style={{
                backgroundColor: isDisabled ? "grey" : pickerColor.hex,
                color:
                  chroma(pickerColor.hex).luminance() > 0.5
                    ? "rgba(0,0,0, 0.9)"
                    : "#f2f2f2",
              }}
              disabled={isDisabled}
              className={classes.inputBtn}
            >
              Add Color
            </Button>
          </ValidatorForm>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={newColorsArr.map((obj) => obj.color)}
            strategy={rectSortingStrategy}
          >
            {/* {items.map((id) => {
              return <SortableItem key={id} id={id} />;
            })} */}
            {newColorsArr.map((color) => {
              return (
                <DragableColorBox
                  key={color.name}
                  id={color.color}
                  name={color.name}
                  color={color.color}
                  handleClick={removeColor}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </main>
    </div>
  );
}

export default withStyles(styles)(NewPaletteForm);
