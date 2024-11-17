import Habit from '../models/Habit.js';
import { isSameDay, isSameWeek, isSameMonth, differenceInDays } from 'date-fns';

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

export const markHabitAsCompleted = async (req, res) => {
    const habitId = req.params.id;
    const { date } = req.body; // Ngày được gửi từ frontend (YYYY-MM-DD)
    console.log('Habit ID:', habitId);
    console.log('Date:', date);

    try {
        const habit = await Habit.findById(habitId);
        console.log('Found Habit:', habit);

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found!' });
        }

        // Kiểm tra nếu ngày đã tồn tại
        const completedDates = habit.completedDates.map(d => d.toISOString().split('T')[0]); // Chuyển các ngày trong DB về dạng YYYY-MM-DD
        if (!completedDates.includes(date)) {
            habit.completedDates.push(new Date(date)); // Lưu ngày mới
        }

        await habit.save();

        return res.status(200).json({ updatedHabit: habit });
    } catch (error) {
        console.error('Error marking habit as completed:', error);
        return res.status(500).json({ message: 'Error marking habit as completed!' });
    }
};

export const getHabitCompletionStatistic = async (req, res) => {
    const userID = req.params.userID;
    console.log(userID);
    try {
        const habits = await Habit.find({ user: userID });
        console.log('Found habit!');
        if (!habits.length) {
            return res.json([]);
        }

        const today = new Date(); // Ngày hiện tại
        const stats = habits.map(habit => {
            const { name, frequency, targetCount, completedDates, createdAt } = habit;

            let completionRate = 0;
            const completedCount = completedDates.filter(date => {
                const completedDate = new Date(date);
                if (frequency === 'daily') {
                    return isSameDay(completedDate, today);
                } else if (frequency === 'weekly') {
                    return isSameWeek(completedDate, today, { weekStartsOn: 1 }); // Tuần bắt đầu từ thứ 2
                } else if (frequency === 'monthly') {
                    return isSameMonth(completedDate, today);
                }
            }).length;

            if (frequency === 'daily') {
                const daysElapsed = differenceInDays(today, new Date(createdAt)) + 1;
                completionRate = (completedCount / daysElapsed) * 100;
            } else if (frequency === 'weekly') {
                completionRate = (completedCount / targetCount) * 100;
            } else if (frequency === 'monthly') {
                completionRate = (completedCount / targetCount) * 100;
            }

            return {
                habitName: name,
                frequency,
                completionRate: Math.min(completionRate, 100), // Cố định tối đa là 100%
            };
        });
        console.log('Habit stat data:', stats);
        return res.json(stats);
    } catch (error) {
        console.error('Error calculating habit completion statistics: ', error);
        res.status(500).send('Error retrieving habit completion statistics');
    }
};