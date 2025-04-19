
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from './task-model';
import { TrashIcon, PencilIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskTileProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask?: (task: Task) => void;
}

const TaskTile: React.FC<TaskTileProps> = ({ 
  task, 
  onToggleComplete, 
  onDeleteTask,
  onEditTask 
}) => {
  return (
    <div 
      className={cn(
        "group flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-flutter-primary/10 transition-all",
        "hover:shadow-md hover:border-flutter-primary/30",
        task.completed && "bg-flutter-background opacity-70"
      )}
    >
      <div className="flex items-center gap-3">
        <Checkbox 
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task)}
          className="h-5 w-5 rounded-full border-2 border-flutter-primary data-[state=checked]:bg-flutter-primary data-[state=checked]:text-white"
        />
        <label 
          htmlFor={`task-${task.id}`}
          className={cn(
            "font-medium cursor-pointer transition-all",
            task.completed ? "text-flutter-text/50 line-through" : "text-flutter-text"
          )}
        >
          {task.title}
        </label>
      </div>
      
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {onEditTask && (
          <button 
            onClick={() => onEditTask(task)}
            className="p-1.5 rounded-full text-flutter-text/50 hover:text-flutter-primary hover:bg-flutter-primary/10 transition-colors"
          >
            <PencilIcon size={16} />
          </button>
        )}
        <button 
          onClick={() => onDeleteTask(task.id)}
          className="p-1.5 rounded-full text-flutter-text/50 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <TrashIcon size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskTile;
