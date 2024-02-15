const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const dbRegisterDEMO = require("./deRegistrerDEMO.js")

conn.sync({ force: true }).then(

    async() => { await dbRegisterDEMO();
      
            server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
            })
    
    })
    
    .catch(error => console.error(error))

// conn.sync({ force: true }).then(
//      server.listen(PORT, () => {
//      console.log(`Server listening on port ${PORT}`);
//     })

// )
// .catch(error => console.error(error))