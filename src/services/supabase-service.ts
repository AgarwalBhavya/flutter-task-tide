
// This file simulates a Supabase integration
// In a real app, you would use the Supabase SDK here

import { Task } from "@/dashboard/task-model";

// Define a simplified User type instead of importing from Supabase
interface User {
  id: string;
  email: string;
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  aud: string;
  created_at: string;
}

// Simulated Supabase service
class SupabaseService {
  private user: User | null = null;

  // Simulate authentication
  async signUp(email: string, password: string): Promise<User> {
    console.log("Simulated Supabase signup:", { email });
    // In a real app, this would call supabase.auth.signUp()
    const mockUser = {
      id: `user-${Date.now()}`,
      email,
      app_metadata: {},
      user_metadata: {},
      aud: "authenticated",
      created_at: new Date().toISOString(),
    } as unknown as User;

    this.user = mockUser;
    localStorage.setItem("supabaseUser", JSON.stringify(mockUser));
    return mockUser;
  }

  async signIn(email: string, password: string): Promise<User> {
    console.log("Simulated Supabase signin:", { email });
    // In a real app, this would call supabase.auth.signInWithPassword()
    const mockUser = {
      id: email === "demo@example.com" ? "demo-user" : `user-${Date.now()}`,
      email,
      app_metadata: {},
      user_metadata: {},
      aud: "authenticated",
      created_at: new Date().toISOString(),
    } as unknown as User;

    this.user = mockUser;
    localStorage.setItem("supabaseUser", JSON.stringify(mockUser));
    return mockUser;
  }

  async signOut(): Promise<void> {
    console.log("Simulated Supabase signout");
    // In a real app, this would call supabase.auth.signOut()
    this.user = null;
    localStorage.removeItem("supabaseUser");
    return;
  }

  // Simulate task operations
  async getTasks(userId: string): Promise<Task[]> {
    console.log("Simulated Supabase getTasks", { userId });
    // In a real app, this would call supabase.from('tasks').select('*').eq('userId', userId)
    const savedTasks = localStorage.getItem("taskTideTasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      return parsedTasks.filter((task: Task) => task.userId === userId);
    }
    return [];
  }

  async addTask(task: Task): Promise<Task> {
    console.log("Simulated Supabase addTask:", task);
    // In a real app, this would call supabase.from('tasks').insert([task])
    
    // Get existing tasks
    const savedTasks = localStorage.getItem("taskTideTasks");
    const tasks = savedTasks ? JSON.parse(savedTasks) : [];
    
    // Add new task
    tasks.push(task);
    
    // Save back to storage
    localStorage.setItem("taskTideTasks", JSON.stringify(tasks));
    return task;
  }

  async updateTask(task: Task): Promise<Task> {
    console.log("Simulated Supabase updateTask:", task);
    // In a real app, this would call supabase.from('tasks').update(task).eq('id', task.id)
    
    // Get existing tasks
    const savedTasks = localStorage.getItem("taskTideTasks");
    if (!savedTasks) return task;
    
    const tasks = JSON.parse(savedTasks);
    
    // Update specific task
    const updatedTasks = tasks.map((t: Task) => 
      t.id === task.id ? { ...t, ...task } : t
    );
    
    // Save back to storage
    localStorage.setItem("taskTideTasks", JSON.stringify(updatedTasks));
    return task;
  }

  async deleteTask(taskId: string): Promise<void> {
    console.log("Simulated Supabase deleteTask:", { taskId });
    // In a real app, this would call supabase.from('tasks').delete().eq('id', taskId)
    
    // Get existing tasks
    const savedTasks = localStorage.getItem("taskTideTasks");
    if (!savedTasks) return;
    
    const tasks = JSON.parse(savedTasks);
    
    // Filter out the deleted task
    const filteredTasks = tasks.filter((t: Task) => t.id !== taskId);
    
    // Save back to storage
    localStorage.setItem("taskTideTasks", JSON.stringify(filteredTasks));
  }
}

// Export a singleton instance
export const supabaseService = new SupabaseService();
