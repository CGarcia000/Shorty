import { ObjectId } from "mongodb";

export default function isValidObjectId(id){
    if(ObjectId.isValid(id)){
        return ((String)(new ObjectId(id)) === id);
    }
    return false;
}