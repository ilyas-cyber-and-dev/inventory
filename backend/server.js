require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 5000;

console.log("JWT_SECRET =", process.env.JWT_SECRET);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});