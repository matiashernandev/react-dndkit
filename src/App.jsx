import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import User from "./User";

function App() {
  const [people, setPeople] = useState([
    { name: "Matías", id: 1 },
    { name: "Hernán", id: 2 },
    { name: "Arroyo", id: 3 },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setPeople((people) => {
      const oldIndex = people.findIndex((person) => person.id === active.id);
      const newIndex = people.findIndex((person) => person.id === over.id);

      return arrayMove(people, oldIndex, newIndex);
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-4/6">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <h1 className="text-5xl font-bold">User List</h1>

          <SortableContext
            items={people}
            strategy={verticalListSortingStrategy}
          >
            {people.map((user) => (
              <li key={user.id}>
                <User user={user} />
              </li>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default App;
