
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon } from 'lucide-react';
import { useAuth } from '@/auth/auth-service';
import TaskTile from './task-tile';
import { Task, createTask, groupTasksByStatus } from './task-model';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from local storage on component mount
  useEffect(() => {
    const loadTasks = () => {
      setIsLoading(true);
      try {
        const savedTasks = localStorage.getItem('taskTideTasks');
        if (savedTasks) {
          const parsedTasks = JSON.parse(savedTasks);
          // Filter tasks for current user
          const userTasks = parsedTasks.filter((task: Task) => task.userId === user?.id);
          setTasks(userTasks);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate loading delay to show animation
    const timer = setTimeout(loadTasks, 500);
    return () => clearTimeout(timer);
  }, [user?.id]);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('taskTideTasks', JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !user) return;
    
    const newTask = createTask(newTaskTitle.trim(), user.id);
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  const handleToggleComplete = (task: Task) => {
    setTasks(tasks.map(t => 
      t.id === task.id ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const { pending, completed } = groupTasksByStatus(tasks);
  
  return (
    <div className="min-h-screen bg-flutter-background">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-flutter-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">TT</span>
            </div>
            <h1 className="text-xl font-bold text-flutter-tertiary">Task Tide</h1>
          </div>
          
          <Button 
            variant="ghost" 
            className="text-flutter-text hover:text-flutter-primary hover:bg-flutter-primary/10"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl animate-fade-in">
        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="text-2xl font-bold text-flutter-text">
            Hello, <span className="text-flutter-primary">{user?.email?.split('@')[0]}</span>
          </h1>
          <p className="text-flutter-text/70">Manage your tasks efficiently</p>
        </section>

        {/* Add Task Section */}
        <section className="mb-8">
          {isAddingTask ? (
            <form onSubmit={handleAddTask} className="bg-white p-4 rounded-2xl shadow-sm border border-flutter-primary/10">
              <div className="flex gap-3">
                <Input
                  autoFocus
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task title..."
                  className="flex-1 rounded-xl border-flutter-primary/20 focus:border-flutter-primary"
                />
                <Button 
                  type="submit" 
                  className="bg-flutter-primary hover:bg-flutter-secondary text-white rounded-xl"
                >
                  Add Task
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  className="border-flutter-primary/20 hover:bg-flutter-primary/10 text-flutter-text rounded-xl"
                  onClick={() => setIsAddingTask(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <Button 
              onClick={() => setIsAddingTask(true)}
              className="w-full bg-white border border-flutter-primary/10 hover:border-flutter-primary/30 text-flutter-text hover:bg-flutter-primary/5 rounded-2xl h-12 font-normal justify-start px-4"
            >
              <PlusIcon className="mr-2 h-5 w-5 text-flutter-primary" />
              Add new task
            </Button>
          )}
        </section>

        {/* Tasks Section */}
        <section>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-14 bg-white/50 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              {/* Pending Tasks */}
              <Card className="bg-white shadow-sm border-flutter-primary/5 mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-flutter-tertiary flex items-center">
                    Pending Tasks
                    {pending.length > 0 && (
                      <span className="ml-2 bg-flutter-primary/20 text-flutter-tertiary text-xs rounded-full h-5 min-w-5 inline-flex items-center justify-center px-1">
                        {pending.length}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pending.length === 0 ? (
                    <div className="py-6 text-center text-flutter-text/50">
                      No pending tasks
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {pending.map((task) => (
                        <TaskTile
                          key={task.id}
                          task={task}
                          onToggleComplete={handleToggleComplete}
                          onDeleteTask={handleDeleteTask}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Completed Tasks */}
              {completed.length > 0 && (
                <Card className="bg-white/80 shadow-sm border-flutter-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-flutter-tertiary/80 flex items-center">
                      Completed
                      <span className="ml-2 bg-flutter-primary/10 text-flutter-tertiary/70 text-xs rounded-full h-5 min-w-5 inline-flex items-center justify-center px-1">
                        {completed.length}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {completed.map((task) => (
                        <TaskTile
                          key={task.id}
                          task={task}
                          onToggleComplete={handleToggleComplete}
                          onDeleteTask={handleDeleteTask}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardScreen;
