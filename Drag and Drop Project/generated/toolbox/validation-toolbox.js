function getValidNumber(val, elseVal) {
    if (typeof elseVal === "undefined") {
        elseVal = 0;
    }
    if (isValidNumeric(val)) {
        return val;
    }
    if (typeof val === "string" && isValidNumeric(val)) {
        return parseFloat(val);
    }
    return elseVal;
}
function getValidString(val, elseVal = "") {
    if (isValidString(val)) {
        return val;
    }
    return elseVal;
}
function isValidNumeric(val) {
    if (typeof val === "string" && val.trim() != "") {
        return !isNaN(+val);
    }
    return typeof val === "number" && !isNaN(val);
}
function isValidString(val) {
    return typeof val === "string" && val.trim() !== "" && val != null;
}
function validate(validationRules) {
    let isValid = true;
    const valAsNumber = getValidNumber(validationRules.value, 0);
    const valLength = getValidString(validationRules.value.toString(), "").trim().length;
    if (validationRules.required) {
        isValid = isValid && valLength !== 0;
    }
    if (validationRules.minLength != null) {
        isValid = isValid && valLength >= validationRules.minLength;
    }
    if (validationRules.maxLength != null) {
        isValid = isValid && valLength <= validationRules.maxLength;
    }
    if (validationRules.minValue != null &&
        typeof validationRules.minValue === "number") {
        isValid =
            isValid && valAsNumber > 0 && valAsNumber >= validationRules.minValue;
    }
    if (validationRules.maxValue != null &&
        typeof validationRules.maxValue === "number") {
        isValid =
            isValid && valAsNumber > 0 && valAsNumber <= validationRules.maxValue;
    }
    return isValid;
}
export { getValidNumber, getValidString, isValidNumeric, isValidString, validate, };
