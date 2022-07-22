import bcrypt from "bcrypt";

async function hashPasswordService(password) {

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, parseInt(process.env.SALT), function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    return hashedPassword

}
async function comparePasswordService(password, hash) {
    const correctPassword = await bcrypt.compare(password, hash).then(function (result) {
        return result
    })

    return correctPassword;
}

export { comparePasswordService, hashPasswordService }