import bcrypt from "bcrypt";

export default function isLoginValid({user, passwd}) {
    return (
        user ||
        bcrypt.compareSync(passwd, user.password)
    );
}