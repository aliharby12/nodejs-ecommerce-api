const mongoose = require("mongoose")

// Connect to MongoDB
const dbConnection = () => {
    mongoose.connect(process.env.MONGO_DB_URI).then((conn) => {
        console.log(process.env.MONGO_DB_URI);
        console.log(`MongoDB connection successful on host: ${conn.connection.name}`);
    }
    ).catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
    );
};

module.exports = dbConnection;