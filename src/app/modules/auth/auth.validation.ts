export const validateSignupData = (body: any) => {
  const { name, email, password, role } = body;

  if (!name || !email || !password || !role) {
    return "All fields are required";
  }

  if (!email.includes("@")) {
    return "Invalid email";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  if (role !== "contributor" && role !== "maintainer") {
    return "Invalid role";
  }

  return null;
};

export const validateLoginData = (body: any) => {
  const { email, password } = body;

  if (!email || !password) {
    return "Email and password are required";
  }

  return null;
};