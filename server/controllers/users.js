import User from '../models/User.js';

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        // uso promis.all para hacer multiples peticion a la db
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        // reviso si el usuario ya tiene al amigo en su lista
        if (user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId); // elimino al amigo
            friend.friends = friend.friends.filter((id) => id !== id); // elimino al usuario
        }
        else {
            user.friends.push(friendId); // agrego al amigo
            friend.friends.push(id); // agrego al usuario
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);
    }
    catch(err){
        res.status(404).json({ message: err.message });
    }
}