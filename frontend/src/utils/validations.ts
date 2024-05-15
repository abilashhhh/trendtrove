export const validateEmail = (email: string): boolean | string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? true : "Invalid email format";
  };
  
  export const validatePhoneNumber = (phoneNumber: string): boolean | string => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber) ? true : "Invalid phone number - Should be of length 10";
  };
  
  export const validatePassword = (password: string): boolean | string => {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password)
      ? true
      : "Password must be at least 8 characters long and contain at least one uppercase letter";
  };
  
  export const validateUsername = (username: string): boolean | string => {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (username.trim() === "") {
      return "Username cannot be empty";
    } else if (usernameRegex.test(username)) {
      return true;
    } else {
      return "Username must start with a letter and contain only letters, numbers, and underscores";
    }
  };
  
  export const validateName = (name: string): boolean | string => {
    const nameRegex = /^[a-zA-Z][a-zA-Z\s]{1,48}[a-zA-Z]$/;
    if (name.trim() === "") {
      return "Name cannot be empty";
    } else if (nameRegex.test(name)) {
      return true;
    } else {
      return "Name must contain only letters and require more than 2 characters";
    }
  };
  