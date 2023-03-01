//functions which generated random verification code
const  generateRandomAlphaNumericCode = ()=> {
    // const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i <= 5; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        code += chars.substring(randomNumber, randomNumber + 1);
    }
    return code;
}

module.exports  = generateRandomAlphaNumericCode;

// verify and send email verification code 