const workoutService = require("../services/workoutService");
const getAllWorkouts = (req, res) => {
  const { mode, equipment, length, page, sortDescending, sortAscending } =
    req.query;
  const allWorkouts = workoutService.getAllWorkouts({
    mode,
    equipment,
    length,
    page,
    sortDescending,
    sortAscending,
  });
  return res.send({
    status: "OK",
    data: allWorkouts,
  });
};
const getOneWorkout = (req, res) => {
  const workoutId = req.params.workoutId;

  const workout = workoutService.getOneWorkout(workoutId);
  if (!workout) {
    return res.status(400).send({
      status: "FAIL",
      message: `Can't find workout with the id '${workoutId}'`,
    });
  }
  return res.send({ status: "OK", data: workout });
};

const createNewWorkout = (req, res) => {
  const name = req.body.name;
  const mode = req.body.mode;
  const equipment = req.body.equipment;
  const exercises = req.body.exercises;
  const trainerTips = req.body.trainerTips;

  if (!name) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: `name is required`,
      },
    });
    return;
  }
  if (!mode) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: `mode is required`,
      },
    });
    return;
  }
  if (!equipment) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: `equipment is required`,
      },
    });
    return;
  }
  if (!exercises) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: `exercises is required`,
      },
    });
    return;
  }
  if (!trainerTips) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: `trainerTips is required`,
      },
    });
    return;
  }
  const newWorkout = {
    name,
    mode,
    equipment,
    exercises,
    trainerTips,
  };
  const createdWorkout = workoutService.createNewWorkout(newWorkout);

  return res.status(201).send({
    status: "Ok",
    data: createdWorkout,
    message: `workout with name ${name} was created successfully`,
  });
};

const updateOneWorkout = (req, res) => {
  const workoutId = req.params.workoutId;
  const body = req.body;
  if (!workoutId) {
    return;
  }
  const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
  res.send({ status: "OK", data: updatedWorkout });
};

const deleteOneWorkout = (req, res) => {
  const workoutId = req.params.workoutId;
  try {
    const deletedWorkoutResponse = workoutService.deleteOneWorkout(workoutId);
    if (!deletedWorkoutResponse) {
      return res.send({
        status: "FAILED",
        message: `Workout with id ${workoutId}  not found`,
      });
    }
    return res.send({
      status: "OK",
      message: `workout with id ${workoutId} was deleted successfully`,
    });
  } catch (error) {
    console.log({ error });
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
