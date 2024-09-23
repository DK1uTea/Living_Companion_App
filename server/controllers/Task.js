import Task from "../models/Task.js";
import User from "../models/User.js";

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
        res.status(201).json({
            message: 'Task added successfully!',
            task: newTask
        });     
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding task!');
    }
};

export const getTask = async (req, res) => {
    const id = req.params.id;

    try {
        const tasks = await Task.find({ user: id });
        if(tasks.length === 0) {
            res.status(404).send('Not found any tasks!');
            return;
        }
        console.log(`Tasks: ${tasks}`);
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};