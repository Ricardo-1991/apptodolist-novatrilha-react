import styles from "./Main.module.css";
import { v4 as uuidv4 } from "uuid";
import { Tasks } from "./Tasks";
import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";

interface TaskProps {
  name: string;
  id: string;
  isComplete: boolean;
}

export function Main() {
  const [tasks, setNewTask] = useState<TaskProps[]>([]);
  const [enteredTask, setEnteredTask] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    const newTask = {
      name: enteredTask,
      id: uuidv4(),
      isComplete: false,
    };
    setNewTask((prevState) => [...prevState, newTask]);
    setEnteredTask("");
  }

  function handleEnteredTask(event: ChangeEvent<HTMLInputElement>) {
    setEnteredTask(event.target.value);
  }

  function handleTaskIsComplete(id: string) {
    const newTask = tasks.map((task) =>
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
    );

    setNewTask(newTask);
  }

  function handleDeleteTask(id: string) {
    const newTask = tasks.filter((task) => task.id !== id);

    setNewTask(newTask);
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleCreateNewTask}>
          <input
            type="text"
            value={enteredTask}
            placeholder="Adicione uma nova tarefa"
            onChange={handleEnteredTask}
          />
          <button type="submit">
            Criar <PlusCircle size={17} />
          </button>
        </form>
      </div>
      <Tasks
        tasks={tasks}
        onTasksIsComplete={handleTaskIsComplete}
        onDeleteTask={handleDeleteTask}
      />
    </main>
  );
}
