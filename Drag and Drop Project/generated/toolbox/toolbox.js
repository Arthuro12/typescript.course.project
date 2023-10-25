function validate(validationRules) {
    let isValid = true;
    if (validationRules.required) {
        isValid = isValid && validationRules.value.trim().length !== 0;
    }
    return isValid;
}
export { validate };
