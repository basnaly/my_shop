export const UNITS = ['kg', 'gr', 'piece'];

export const validatePassword = (password) => {
		
    var regularExpression =
        /^(?=.*[0-9])(?=.*[!@#$%^&*-_])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*-_]{8,12}$/;

    const found = password.match(regularExpression);

    return !!found;
};