export const validateIssueData = (body: any) => {
  const { title, description, type } = body;

  if (!title || !description || !type) {
    return "All fields are required";
  }

  if (title.length > 150) {
    return "Title max length is 150";
  }

  if (description.length < 20) {
    return "Description minimum length is 20";
  }

  if (
    type !== "bug" &&
    type !== "feature_request"
  ) {
    return "Invalid issue type";
  }

  return null;
};