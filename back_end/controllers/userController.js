const   User = require ('../models/userModel');
const auth = require ('../utili/auth')
exports.creatUser = async(req,res)=>{
    const {userName,passWord} = req.body;
    const hashedPassword = await auth.hashPassword(passWord);
    const myUser = await User.create({userName,passWord:hashedPassword});
    res.status(201).json(myUser)
}
exports.getUsers = async(req,res)=>{
    const myUsers = await User.find();
    res.status(200).json(myUsers)
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { userName, passWord } = req.body;
        const hashedPassword = await auth.hashPassword(passWord);
        const updatedData = {
            ...(userName && { userName }),
            ...(passWord && { passWord:hashedPassword }),
            };

        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', User: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Error updating User', error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', User: deletedUser });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting User', error: err.message });
    }
};




exports.login = async(req,res)=>{
    const {userName,passWord} = req.body;
    const myUser = await User.findOne({userName})
    console.log(myUser);
    if (!myUser) {
        res.status(400).send(`user not found`)
    }else{
    const isMatch = await auth.compare(passWord,myUser.passWord)
    if (isMatch) {
            const tokenobject = {userName:myUser.userName,usertype:'admin'};
            const token =  await auth.createToken(tokenobject)
            console.log(token)
            res.status(200).json(token)
    }
    else{
        res.status(400).send(`passWord not correct`)
    }}
}