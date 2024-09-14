const parseContactFilterParams = ({ type, isFavourite }) => {
  const filter = {};

  if (type) {
    filter.contactType = type;
  }

  if (typeof isFavourite !== 'undefined') {
    filter.isFavourite = isFavourite === 'true';
  }

  return filter;
};

export default parseContactFilterParams;
