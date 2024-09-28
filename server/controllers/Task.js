import Task from "../models/Task.js";
import User from "../models/User.js";

// Add new task
export const addTask = async (req, res) => {
    const {user, title, description, dueDate, priority} = req.body;

    try {
        const newTask = new Task({
            user,
            title,
            description,
            dueDate,
            priority
        });
        console.log(`New task: ${JSON.stringify(newTask)}`);
        await newTask.save();
        return res.status(201).json({
            message: 'Task added successfully!',
            task: newTask
        });     
    } catch (error) {
        console.error('Error adding task: ', error);
        return res.status(500).send('Error adding task!');
    }
};

// Get all task follow by user id
export const getTask = async (req, res) => {
    const id = req.params.id;

    try {
        // Find all task follow by user id
        const tasks = await Task.find({ user: id });
        // If dont have any task return not found
        if(tasks.length === 0) {
            return res.status(404).send('Not found any tasks!');
        }
        // Update overdue tasks
        const currentDate = new Date();
        // Set the time of the currentDate to 00:00:00 to avoid time component issues
        currentDate.setHours(0, 0, 0, 0);

        tasks.forEach(async (task) => {
            const taskDueDate = new Date(task.dueDate);
            taskDueDate.setHours(0, 0, 0, 0); // Reset the time component of the due date

            if (taskDueDate < currentDate && task.status === 'pending') {
                task.status = 'overdue';
                await task.save();
            }
        });
        console.log(`Tasks: ${tasks}`);
        return res.status(200).send(tasks);
    } catch (error) {
        console.error('Error getting all task:', error);
        return res.status(500).send(error);
    }
};

// Edit task by ID
export const editTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, description, dueDate, priority } = req.body;
    console.log(`Req body edit: ${req.body}`);
    try {
        // Find the task by ID and update it with new values
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, description, dueDate, priority },
            { new: true } // Return the updated task
        );
        console.log(`Updated Task found: ${updatedTask}`);
        if(!updatedTask) {
            return res.status(404).send('Task not found');
        }

        return res.status(200).json({ message: 'Updated task successfully', updatedTask});
    } catch (error) {
        console.error('Error editing task: ', error);
        return res.status(500).send('Error updating task');
    }
};

// Delete task by ID
export const deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        // Find the task by ID and delete it
        const deletedTask = await Task.findByIdAndDelete(taskId);
        console.log(`Deleted task found: ${deletedTask}`);
        if(!deleteTask) {
            return res.status(404).send('Task not found');
        }

        return res.status(200).send('Task delete successfully');
    } catch (error) {
        console.error('Error deleting task: ', error);
        return res.status(500).message('Error deleting task');
    }
};

// Mark task as completed
export const markTaskAsCompleted = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId);
        if(!task) {
            return res.status(404).send('Task not found');
        }
        // If exist task update status and completedDate
        if(task.status === 'pending'){
            task.status = 'completed';
            task.completedDate = new Date();
        }
        console.log(`Task: ${task}`);
        await task.save();
        return res.status(200).json({ message: 'Task marked as completed', task});
    } catch (error) {
        console.error('Error marking task as completed: ', error);
        return res.status(500).send('Error updating task');
    }
};