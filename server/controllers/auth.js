import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/* REGISTER  USER */
// se busca que sea asyncrono porque se va a hacer llamado a la db
// req: me da la informacion que se envia desde el frontend
// res: me da la respuesta que se va a enviar al frontend
export const register = async (req, res) => {
    try{
        const {
            firtName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            ocupation,
        } = req.body;

        const salt = await bcrypt.genSalt(); // se genera un salt para encriptar la contraseña
        const passwordHash = await bcrypt.hash(password, salt); // se encripta la contraseña

        const newUser = new User({
            firtName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            ocupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });

        const savedUser = await newUser.save(); // se guarda el usuario en la db

        res.status(201).json(savedUser); // se envia la respuesta al frontend
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};

/* LOGGIN IN */
export const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findeOne({ email: email }); // se busca el email en la db
        if (!user){
            return res.status(404).json({msg: 'User does not exist'});
        };

        const isMath = await bcrypt.compare(password, user.password); // se compara la contraseña encriptada con la que se envio
        if (!isMath){
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // se crea un token para la sesion
        delete user.password;
        res.status(200).json({ token, user }); // se envia la respuesta al frontend
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}