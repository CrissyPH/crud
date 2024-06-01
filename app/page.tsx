import { TodoForm } from "@/components/todo-form";
import { TodoList } from "@/components/todo-list";

export default function Home() {
  return (
    <div className="p-10">
      <div className="flex flex-col items-center justify-center mx-auto">
        <h1 className="text-4xl font-bold">CRUD OPERATION <span className="text-blue-500">NEXTJS</span></h1>
        <span className="text-md font-mono pt-4">USING API ROUTES</span>
      </div>
      <div className="pt-10">
        <TodoForm />
      </div>
      <div>
        <TodoList />
      </div>
    </div>
  );
}
