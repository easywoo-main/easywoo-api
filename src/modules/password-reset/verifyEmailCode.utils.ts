const CODE_SIZE = 6;
export const codeGenerator = () => {
    let code = '';
    for (let i = 0; i < CODE_SIZE; i++) {
        code += Math.floor(Math.random() * 10).toString();
    }
    return code;
}
