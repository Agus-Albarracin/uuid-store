const {Cliente} = require("../../db")


const singUpClienteInDB = async (req, res) => {
    
    try{
        let {email, name, googleId, imageUrl, givenName} = req.body;
        console.log(req.body)
    if(!email || !name || !googleId || !imageUrl || !givenName) return res.status(400).send("Faltan ingresar datos.")

    let [user, seCreoUser] = await Cliente.findOrCreate({
        where:{email},
        defaults: {
            email,
            name,
            googleId,
            imageUrl,
            givenName
        }
    })

    if(!seCreoUser) return res.status(400).send("El usuario ya existe.")

    console.log(user)
    return res.status(201).json(user)

    }catch(error){
        return res.status(500).json({message: error.message})
    }

}

module.exports = singUpClienteInDB