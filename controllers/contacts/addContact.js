const { Contact } = require('../../models');
const { catchAsync } = require('../../utils');

const addContact = catchAsync(async (req, res) => {
  const newContactData = {
    owner: req.user,
    ...req.body,
  };
    const newContact = await Contact.create(newContactData);
    res.status(201).json({
      contact: newContact,
    });
  });

  module.exports = addContact;