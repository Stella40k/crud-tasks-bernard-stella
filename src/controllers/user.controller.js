import { User } from "../model/user.model.js";
//las variables q vienen de afuera tienen q tener nombre o algo diferente a las constantes nuevas q haga
import "dotenv/config";


export const getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({error: "error de conexion con la base de datos"})
    }
};
export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "usuario no encontrado"})
        }
        console.log(user);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({error: "verificar la id del usuario o la existencia del mismo"});
    }
};
 export const createUser = async (req, res) => {
    try {
        const { name, email, password} = req.body;

        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            console.log(name, email, password);
        return res.status(400).json({error: "completar los campos obligatorios y no pueden estar vacios", error});
        }// el ? es para que no de error si viene undefined, si viene undefined no hace el trim
        //_______________________________________________________________________________________________________
        //validacion para que no se puedan ingresar campos vacios ni mas q 100caracters
        if (name.length > 100 || email.length > 100) {
            return res.status(400).json({error: "no se pueden superar los 100 caracteres"});
        }
        //_______________________________________________________________________________________________________
        //validacion para email
        const Email = /^[a-zA-Z0-9ñÑçÇ._%+-]+@[a-zA-Z0-9ñÑçÇ.-]+\.[a-zA-Z]{2,}$/;
        if (!Email.test(email.trim())){
            return res.status(400).json({error: "el email no es valido"});
        }
        const existUser = await User.findOne({ where: { email: email.trim()}});
        if (existUser){
            return res.status(400).json({error: "email ya registrado"});
        }
        //_______________________________________________________________________________________________________
       //para la contraseña
       const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //al menos 8 caracteres, una mayuscula, una minuscula y un numero        
        if (!passwordRegex.test(password)) {
            return res.status(400).json({error: "la contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero"});
        }
        const passwordHash = await bcrypt.hash(password, 10); //encriptar la contraseña, preguntar mas de el ecipt
        const  newUser = await User.create({
            name: name.trim(),
            email: email.trim(),
            password: passwordHash //no guarda la contraseña original, guarda la encriptada
        });   
        const UserResponse ={
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        };
        delete UserResponse.password; //hacemos q no se muestre la contraseña cuando mande UserResponse
        return res.status(201).json({message: "usuario creado", UserResponse});

    } catch (error) {
        return res.status(500).json({error: "error al crear el usuario", error});
    }
 };
 export const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const { name, email, password } = req.body;
        const userUpdate = await User.findByPk(id);

        if (!userUpdate) {
            return res.status(404).json({ error: "usuario no encontrado" });   
        }
        //________________________________________________________________________________________________________
        if (name.length > 100 || email.length > 100) {
            return res.status(400).json({error: "no se pueden superar los 100 caracteres"});
        }
        if (!name || name.trim() === "") {
            return res.status(400).json({message: "no se permiten campos vacios"});
        }
        if (!email || email.trim() === "") {
            return res.status(400).json({message: "no se permiten campos vacios"});
        }
        if (!password || password.trim()=== "") {
            return res.status(400).json({message: "no se permiten campos vacios"});
        }
        //________________________________________________________________________________________________________
        //validacion para email
        const Email = /^[a-zA-Z0-9ñÑçÇ._%+-]+@[a-zA-Z0-9ñÑçÇ.-]+\.[a-zA-Z]{2,}$/;

        if (!Email.test(email.trim())){
            return res.status(400).json({error: "el email no es valido"});
        }
        const existUser = await User.findOne({ where: { email: email.trim() } });
        if (existUser){
            return res.status(400).json({error: "email ya registrado"});
        }
        if (name) userUpdate.name = name.trim();
        if (email) userUpdate.email = email.trim();
        //________________________________________________________________________________________________________
        if (password) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //al menos 8 caracteres, una mayuscula, una minuscula y un numero
            if (!passwordRegex.test(password)) {    
                return res.status(400).json({error: "la contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero"});
            }
        }
        userUpdate.pass = await bcrypt.hash(password,10); //encriptar
        //________________________________________________________________________________________________________

        await userUpdate.save();
        const{password: _, ...userResponse} = userUpdate.dataValues; //esto es para no mostrar la contraseña en el response
        //preguntar mas de la logica de esto 
        res.status(200).json({ message: "se actualizo el usuario", userUpdate });
    
    } catch (error) {
        res.status(500).json({ error: "error al actualizar el usuario" });
    }
};
 export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userDelete = await User.findByPk(id);

        if (!userDelete) {
            return res.status(404).json({ error: "usuario no encontrado" });   
        }

        const deletedUser = await userDelete.destroy();
        res.status(200).json({ message: "usuario eliminado", deletedUser });
    } catch (error) {
        return res.status(500).json({ error: "error al eliminar el usuario" });
    }
};