// Core TypeScript interfaces for the application
export interface Todo {
  id: number
  todo: string
  completed: boolean
  userId: number
}

export interface CreateTodoRequest {
  todo: string
  completed: boolean
  userId: number
}

export interface UpdateTodoRequest {
  id: number
  todo?: string
  completed?: boolean
}

export interface TodosResponse {
  todos: Todo[]
  total: number
  skip: number
  limit: number
}

export interface TodoState {
  todos: Todo[]
  filter: "all" | "completed" | "incomplete"
  searchQuery: string
  draggedTodo: Todo | null
}
