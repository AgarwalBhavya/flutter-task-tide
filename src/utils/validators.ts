
// Email validation with regex
export const isValidEmail = (email: string): boolean => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

// Password validation - at least 6 chars
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

// Task title validation
export const isValidTaskTitle = (title: string): boolean => {
  return title.trim().length > 0;
};

// Generic form validation
export const validateForm = (
  formData: Record<string, string>,
  rules: Record<string, (value: string) => boolean>
): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  Object.entries(rules).forEach(([field, validator]) => {
    const value = formData[field];
    if (!validator(value)) {
      errors[field] = `Invalid ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
    }
  });
  
  return errors;
};
