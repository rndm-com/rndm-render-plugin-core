const and = (...input) => input && input.filter(Boolean).length === input.length && input.length > 0;
export default and;
