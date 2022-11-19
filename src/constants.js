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
    "Center": "1 day",
    "South": "2 days",
    "North": "2-3 days",
    "Far North": "4 days",
}

export const validatePassword = (password) => {
		
    var regularExpression =
        /^(?=.*[0-9])(?=.*[!@#$%^&*-_])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*-_]{8,12}$/;

    const found = password.match(regularExpression);

    return !!found;
};