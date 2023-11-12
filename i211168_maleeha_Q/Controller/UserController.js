
const user = require("../models/User.schema")
const jwt = require("jsonwebtoken")

let getAllUsers = async (req, res) => {
   
    let users = await user.find({});
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(404).json({ "Message": "Error", err: err })
    }
}

let GetUserById = async (req, res) => {
    let id = req.params.id;
    let users = await user.findOne({ _id: id });
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(404).json({ "Message": "Error", err: err })
    }
}


let Createuser = (req, res) => {
    let data = req.body;
    console.log(req.files)
    let { profilePic } = req.files;
    console.log(profilePic)

    let path = Date.now().toString() + profilePic.name;
    profilePic.mv("./uploads/" + path)
    user.create({
        FullName: data.FullName,
        email: data.email,
        role: data.role,
        Password: data.Password,
        profileImage: path
    }).then(data => {
        res.status(201).json(data)
    }).catch(err => {
        res.status(500).json({ "Message": "there was Some Error" })
    })
}


let updateuserById = async (req, res) => {
    let id = req.params.id;
    let data = req.body;
    let users = await user.findByIdAndUpdate(id, data);
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(404).json({ "Message": "Error", err: err })
    }
}

let DeleteUserById = async (req, res) => {
    let id = req.params.id;
    let users = await user.findByIdAndDelete(id);
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(404).json({ "Message": "Error", err: err })
    }
}

let Login = async (req, res) => {
    let { email, Password } = req.body;
    console.log(Password)
    console.log(req.body)
    try {
        let User = await user.findOne({ email });
        if (User) {
            console.log(User.Password)
            if (User.Password == Password) {
                let id = User._id;
                let role = User.role
                let FullName=User.FullName
                if (User.isBlocked) {
                    return res.status(401).json({ "Message": "Your account is blocked." });
                }
                let token = await jwt.sign({ id, FullName, role},
                    process.env.SECRET_KEY,
                    { expiresIn: '24h' })
                res.json({ User, "Success": true, token })
            } else {
                res.json({ "Success": false, "Message": "Invalid password" })

            }
        } else {
            res.json({ "Success": false, "Message": "User not Fopound" })

        }
    } catch (err) {
        res.json({ "Success": false, "Message": "User not Fopound", err })

    }

}



module.exports = {
    GetUserById,
    getAllUsers,
    updateuserById,
    DeleteUserById,
    Createuser,
    Login
}