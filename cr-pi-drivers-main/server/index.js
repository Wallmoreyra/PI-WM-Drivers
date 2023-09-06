
const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;

conn.sync({ force: false }).then(() => {    //cambiar el force a false cuando necesitemos mostar el PI
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

})
}).catch(error => console.error(error))
