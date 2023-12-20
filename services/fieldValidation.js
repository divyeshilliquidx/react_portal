const Joi = require('joi');

function fieldValidation(module) {
    // Define a custom validation error messages object
    const customMessages = {
        'number.base': 'Record ID must be a number.',
        'number.integer': 'Record ID must be an integer.',
        'number.positive': 'Record ID must be an positive.',
        'number.min': 'Record ID must be greater than or equal to 1.',
        'string.min': 'New password must be at least 6 characters long.',
        'any.required': 'The {{#label}} field is required.',
        'string.empty': 'The {{#label}} field is required.',
    };
    const schema = Joi.object({
        recordid: Joi.number().required().integer().positive().messages(customMessages),
        firstname: Joi.string().messages(customMessages),
        lastname: Joi.string().messages(customMessages),
        email: Joi.string().messages(customMessages),
        salutationtype: Joi.string().messages(customMessages),
        mailingstreet: Joi.string().messages(customMessages),
        accountname: Joi.string().messages(customMessages),
        ship_street: Joi.string().messages(customMessages),
        ask_price: Joi.string().messages(customMessages),
        quantity: Joi.string().messages(customMessages),
        all_or_none: Joi.string().messages(customMessages),
        assigned_user_id: Joi.string().messages(customMessages),
    });
    return schema;
}

module.exports = {
    fieldValidation
}


