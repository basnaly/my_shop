export const CATEGORY = ['Vegetables', 'Fruits', 'Dairy']

export const UNITS = ['kg', 'gr', 'piece'];

export const DISTRICT = ['Center', 'South', 'North', 'Far North']

export const DELIVERY_PRICE = {
    "Center": 5,
    "South": 7,
    "North": 8,
    "Far North": 11,
}

export const DELIVERY_TIME = {
    "Center": 1,
    "South": 2,
    "North": 3,
    "Far North": 4,
}

export const DATE_FORMAT = 'ddd, D MMM YY'

export const validatePassword = (password) => {
		
    var regularExpression =
        /^(?=.*[0-9])(?=.*[!@#$%^&*-_])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*-_]{8,12}$/;

    const found = password.match(regularExpression);

    return !!found;
};