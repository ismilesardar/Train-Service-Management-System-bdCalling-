/**
 * Date: 12/08/2024
 * Subject: Train Service Management System
 * Auth: Ismile Sardar
 */

const app = require("./app");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App Run at http://localhost:${PORT}`);
});