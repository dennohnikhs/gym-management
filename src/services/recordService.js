const Record = require("../database/record");

const getRecordForWorkout = (workoutId) => {
  try {
    const record = Record.getRecordForWorkout(workoutId);
    if (!record) {
      return false;
    }
    return record;
  } catch (error) {
    throw error;
  }
};
module.exports = { getRecordForWorkout };
