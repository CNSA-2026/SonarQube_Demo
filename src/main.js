const app = require("./app");
const port = 3000

// Unused variables in main
const MAIN_UNUSED_1 = 'main';
let MAIN_UNUSED_2;
const MAIN_UNUSED_3 = [1,2,3,4,5];
let MAIN_UNUSED_4 = { ok: false };

app.listen(port, () => {
  try {
    console.log(`Example app listening on port ${port}`)
  } catch (e) {
  }
})