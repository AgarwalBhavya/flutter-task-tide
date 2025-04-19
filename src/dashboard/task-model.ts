
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  userId: string;
}

// Helper function to create a new task
export const createTask = (title: string, userId: string): Task => {
  return {
    id: `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title,
    completed: false,
    createdAt: new Date().toISOString(),
    userId,
  };
};

// Function to sort tasks by creation date, with most recent first
export const sortTasksByDate = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Group tasks by completion status
export const groupTasksByStatus = (tasks: Task[]): { completed: Task[]; pending: Task[] } => {
  return {
    pending: tasks.filter(task => !task.completed),
    completed: tasks.filter(task => task.completed),
  };
};
