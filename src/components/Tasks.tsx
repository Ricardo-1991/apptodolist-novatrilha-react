import styles from "./Tasks.module.css";
import { Trash } from "phosphor-react";
import ClipboardImg from "./assets/Clipboard.svg";

interface TaskType {
  name: string;
  id: string;
  isComplete: boolean;
}

interface TasksProps {
  tasks: TaskType[];
  onTasksIsComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function Tasks({ tasks, onTasksIsComplete, onDeleteTask }: TasksProps) {
  const isComplete = tasks.filter((task) => task.isComplete === true);
  const tasksCreated = tasks.length;
  const taskCompleted = isComplete.length;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>
          Tarefas criadas <strong>{tasksCreated}</strong>
        </span>
        <div>
          <span>
            Concluídas{" "}
            <strong>
              {taskCompleted} de {tasksCreated}
            </strong>
          </span>
        </div>
      </header>
      <div className={styles.tasksContainer}>
        <div className={styles.tasks}>
          {tasks.length === 0 && (
            <>
              <img src={ClipboardImg} />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p> Crie tarefas e organize seus itens a fazer</p>
            </>
          )}
          {tasks.map((tasks) => (
            <div key={tasks.id} className={styles.taskBox}>
              <div className={styles.enteredTaskContainer}>
                <div className={styles.enteredTask}>
                  <input
                    type="checkbox"
                    onClick={() => onTasksIsComplete(tasks.id)}
                  />
                  <p className={tasks.isComplete ? styles.taskComplete : ""}>
                    {tasks.name}
                  </p>
                </div>
                <Trash size={17} onClick={() => onDeleteTask(tasks.id)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
