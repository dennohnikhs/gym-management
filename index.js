const express = require("express");

const app = express();
const apicache = require("apicache");
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cache = apicache.middleware;
const v1WorkoutRouter = require("./src/v1/routes/workoutRoutes");
const { swaggerDocs: V1SwaggerDocs } = require("./src/v1/swagger");

app.use(bodyParser.json());
app.use(cache("2 minutes"));
app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port http://localhost:${PORT}`);
  V1SwaggerDocs(app, PORT);
});
