import React, { useMemo, useState } from 'react';
// Import React, useMemo for memoized computations, and useState for local state

import { useSelector, useDispatch } from 'react-redux';
// Import Redux hooks for accessing state and dispatching actions

import { DndContext, closestCenter } from '@dnd-kit/core';
// Import DnD context and collision detection strategy for drag-and-drop

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// Import sortable context and vertical list strategy for sorting items in columns

import { selectAllTasks, updateTaskStatus } from '../features/tasks/tasksSlice';
// Import selector to get all tasks and action to update task status

import KanbanColumn from '../components/specific/tasks/KanbanColumn';
// Import Kanban column component (represents each status column)

import TaskCard from '../components/specific/tasks/TaskCard';
// Import Task card component (represents a single task)

import CreateTaskModal from '../components/specific/tasks/CreateTaskModal';
// Import modal for creating new tasks

import TaskDetailModal from '../components/specific/tasks/TaskDetailModal';
// Import modal to view task details

import Button from '../components/common/Button';
// Import reusable Button component

const KanbanBoardPage = () => {
  const dispatch = useDispatch();
  // Initialize Redux dispatch

  const tasks = useSelector(selectAllTasks);
  // Fetch all tasks from Redux state

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  // Local state to control Create Task modal visibility

  const [viewingTask, setViewingTask] = useState(null);
  // Local state to control currently viewed task in TaskDetailModal

  // Memoize columns based on task status for performance
  const columns = useMemo(() => ({
    'To Do': tasks.filter(task => task.status === 'To Do'),         // Tasks not started
    'In Progress': tasks.filter(task => task.status === 'In Progress'), // Tasks currently in progress
    'Done': tasks.filter(task => task.status === 'Done'),           // Completed tasks
  }), [tasks]);

  // Handle end of drag-and-drop event
  const handleDragEnd = (event) => {
    const { active, over } = event;
    // If no target or dragging over same item, do nothing
    if (!over || active.id === over.id) return;

    const activeTask = tasks.find(t => t.id === active.id);
    // Update task status if dropped in a different column
    if (activeTask && activeTask.status !== over.id) {
      dispatch(updateTaskStatus({ taskId: active.id, newStatus: over.id }));
    }
  };

  return (
    <div>
      {/* Header section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Kanban Board</h1>
        <div className="w-48">
          {/* Button to open Create Task modal */}
          <Button onClick={() => setCreateModalOpen(true)}>Create New Task</Button>
        </div>
      </div>

      {/* Drag-and-drop context */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {/* Render each column */}
          {Object.keys(columns).map(columnId => (
            <KanbanColumn key={columnId} id={columnId} title={columnId}>
              {/* Enable sorting within column */}
              <SortableContext 
                items={columns[columnId].map(t => t.id)} 
                strategy={verticalListSortingStrategy}
              >
                {/* Render each task card in the column */}
                {columns[columnId].map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onViewDetails={() => setViewingTask(task)} 
                    // Open TaskDetailModal when task is clicked
                  />
                ))}
              </SortableContext>
            </KanbanColumn>
          ))}
        </div>
      </DndContext>

      {/* Create Task modal */}
      <CreateTaskModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setCreateModalOpen(false)} 
      />

      {/* Task Detail modal */}
      <TaskDetailModal 
        isOpen={!!viewingTask} 
        onClose={() => setViewingTask(null)} 
        task={viewingTask} 
      />
    </div>
  );
};

export default KanbanBoardPage;
// Export the KanbanBoardPage component
