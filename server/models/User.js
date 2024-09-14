import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
        sparse: true, // Allow null for social logins
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        // Password is only required for traditional login, not for social login 
        required: function () {
            return !this.uid;
        },
    },
    uid: {
        type: String,
        unique: true,
        sparse: true, // Allow null for traditional logins
    },
    provider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('User', userSchema);
export default User;