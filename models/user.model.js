import {Schema,model,models} from 'mongoose';

const userSchema = new Schema({
    email:{
        type: String,
        unique:[true,'email already exist'],
        required:[true,'email is required'],
    },
    username:{
        type: String,
        unique:[true,'username must be unique'],
        required:[true, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
        match: [
            /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            "Username invalid, it should contain 8-20 alphanumeric letters and follow the required format!",
        ]
    },
    image:{
        type:String,
    }
});
const User = models.User || model('User',userSchema);
export default User;