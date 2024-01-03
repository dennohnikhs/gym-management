const Record = require("../services/recordService");

const getRecordForWorkout = (req, res) => {
  const workoutId = req.params.workoutId;
  const record = Record.getRecordForWorkout(workoutId);
  if (!record) {
    res.status(404).send({
      status: "FAIL",
      data: `No record for workout with the id ${workoutId} found`,
    });
  }
  return res.send({ status: "Ok", data: record });
};
module.exports = {
  getRecordForWorkout,
};
