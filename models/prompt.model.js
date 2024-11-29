import mongoose,{Schema,model,models} from 'mongoose'

const promptSchema = new Schema({
    creator:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    },
    prompt:{
        type:String,
        required:[true,'prompt is required.'],
    },
    tag:{
        type:String,
        required:[true,'Tag is required'],
    }
});

const Prompt=models.prompt || model("prompt",promptSchema);
export default Prompt;