import Habit from '../models/Habit.js'

export const addHabit = async (req, res) => {
    const { user, name, description, frequency, targetCount } = req.body;

    try {
        const newHabit = new Habit({
            user,
            name,
            description,
            frequency,
            targetCount
        });
        console.log(`New habit: ${newHabit}`);
        await newHabit.save();
        console.log('New habit has been saved into DB!');
        return res.status(201).json({
            message: 'Add habit successfully!',
            habit: newHabit
        })
    } catch (error) {
        console.error('Error adding habit', error);
        return res.status(500).send('Error adding habit!');
    }
};

export const getHabit = async (req, res) => {
    const userID = req.params.id;
    try {
        const habits = await Habit.find({ user: userID });
        if (habits.length === 0) {
            return res.status(404).send('Not found any habit!');
        }
        console.log('Habit found!');

        const habitCategories = habits.reduce((acc, habit) => {
            acc[`${habit.frequency}Habits`].push(habit);
            return acc;
        }, { dailyHabits: [], weeklyHabits: [], monthlyHabits: [] });

        return res.status(200).json({
            message: 'Get habit successfully!',
            dailyHabits: habitCategories.dailyHabits,
            weeklyHabits: habitCategories.weeklyHabits,
            monthlyHabits: habitCategories.monthlyHabits
        });
    } catch (error) {
        console.error('Error getting habit', error);
        return res.status(500).send('Error getting habit!');
    }
};

export const deleteHabit = async (req, res) => {
    const habitID = req.params.id;

    try {
        const deletedHabit = await Habit.findByIdAndDelete(habitID);
        if (!deletedHabit) return res.status(404).send('Habit not found!');
        console.log(`Deleted habit found: ${deletedHabit}`);
        return res.status(200).send('Habit delete successfully!');
    } catch (error) {
        console.error('Error deleting habit', error);
        return res.status(500).send('Error deleting habit!');
    }
};

export const editHabit = async (req, res) => {
    const habitID = req.params.id;
    const { name, description, frequency, targetCount } = req.body;

    try {
        const updatedHabit = await Habit.findByIdAndUpdate(
            habitID,
            { name, description, frequency, targetCount },
            { new: true }
        );
        if (!updatedHabit) return res.status(404).send('Habit not found!');
        console.log(`Updated habit found: ${updatedHabit}`);
        return res.status(200).json({
            message: 'Update habit successfully!',
            updatedHabit: updatedHabit
        });
    } catch (error) {
        console.error('Error editing habit', error);
        return res.status(500).send('Error editing habit!');
    }
};