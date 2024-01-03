const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = (filterParams) => {
  let workouts = DB.workouts;
  let page = filterParams.page ? Number(filterParams.page) : 1;
  let length = filterParams.length
    ? Number(filterParams.length)
    : workouts.length;
  let start = (page - 1) * length;
  let end = start + length;

  if (filterParams.mode) {
    workouts = workouts.filter((workout) =>
      workout.mode.toLowerCase().includes(filterParams.mode)
    );
  }
  if (filterParams.equipment) {
    workouts = workouts.filter((workout) =>
      workout.equipment.some((equipment) =>
        filterParams.equipment.includes(equipment)
      )
    );
  }
  // Other if-statements will go here for different parameters

  // Limit the number of workouts if 'length' is provided
  if (length) {
    workouts = workouts.slice(start, end);
  }
  if (filterParams.sortDescending === "createdAt") {
    workouts = workouts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
  if (filterParams.sortAscending === "updatedAt") {
    workouts = workouts.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
  }
  return workouts;
};

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
  if (isAlreadyAdded) {
    return {
      status: 400,
      message: `Workout with the name '${newWorkout.name}' already exists`,
    };
  }
  try {
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const getOneWorkout = (workoutId) => {
  const workout = DB.workouts.find((workout) => workout.id === workoutId);
  if (!workout) {
    return false;
  }
  return workout;
};
const updateOneWorkout = (workoutId, changes) => {
  const indexForUpdate = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );
  if (indexForUpdate === -1) {
    return;
  }
  const updatedWorkout = {
    ...DB.workouts[indexForUpdate],
    ...changes,
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  DB.workouts[indexForUpdate] = updatedWorkout;
  saveToDatabase(DB);
  return updatedWorkout;
};
const deleteOneWorkout = (workoutId) => {
  const indexForDeletion = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );
  if (indexForDeletion === -1) {
    return;
  }
  DB.workouts.splice(indexForDeletion, 1);
  saveToDatabase(DB);
};

module.exports = {
  getAllWorkouts,
  createNewWorkout,
  getOneWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
