<!-- import "./styles.css";
import React, {useState} from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy
} from '@dnd-kit/sortable';

import SortableItem from './SortableItem';

function App() {
  const [items, setItems] = useState(['1', '2', '3', '4', '5', '6', '7', '8']);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={rectSortingStrategy}
      >
        {items.map(id => <SortableItem key={id} id={id} />)}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const {active, over} = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}

export default App; -->

<!-- import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    height: "100px",
    border: "1px solid black",
    display: "inline-block",
    width: "100px",
    margin: '3px'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.id}
    </div>
  );
} -->

<!-- {newColorsArr.map((color) => {
              return (
                <DragableColorBox
                  key={color.name}
                  id={color.name}
                  name={color.name}
                  color={color.color}
                  handleClick={removeColor}
                />
              );
            })} -->

            {color: "#148c2f", name: "#148c2f"}

1
:
{color: "#c68ab3", name: "#c68ab3"}

2
:
{color: "#05a887", name: "#05a887"}

3
:
{color: "#a83e15", name: "#a83e15"}
