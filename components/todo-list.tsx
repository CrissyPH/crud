
import { prismadb } from "@/lib/db";
import { useRouter } from "next/navigation";
import { UpdateButton } from "./update-button";
import { DeleteButton } from "./delete-button";

export const TodoList = async () => {


    const getTodo = await prismadb.todo.findMany();



    return (
        <div className="w-full bg-gray-100 p-6">
            {getTodo.map((todo, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-4 mb-4 shadow-md rounded-md">
                    <div>
                        <h3 className="text-xl font-semibold">{todo.title}</h3>
                        <p className="text-gray-700">{todo.description}</p>
                    </div>
                    <div className="flex space-x-2">
                        <UpdateButton todoId={todo.id} />
                    </div>
                </div>
            ))}
        </div>
    );
};
