const convertTitleToSlug = (title: string) => {
  return title.trim().toLowerCase().split(" ").join("-");
};

const convertDateTime = (date: string) => {
  const dateArray = date.split("-");
  dateArray[2] = dateArray[2].slice(0, 2);
  return dateArray.join("-");
};

export { convertTitleToSlug, convertDateTime };
