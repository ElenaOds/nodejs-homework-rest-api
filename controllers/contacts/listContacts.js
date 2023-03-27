const { Contact } = require('../../models');
const { catchAsync } = require('../../utils');

const listContacts = catchAsync (async (req, res) => {
  const { limit, page } = req.query;

    const paginationPage = +page || 1;
    const paginationLimit = +limit || 20;
    const skip = (paginationPage - 1) * paginationLimit;

    const contacts = await Contact.find({ favorite: true }).select('-__v').skip(skip).limit(paginationLimit);

    res.status(200).json({
      count: contacts.length,
      contacts,
  });
});

module.exports = listContacts;