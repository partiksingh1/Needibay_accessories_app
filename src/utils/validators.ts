const validateLoginInput = (data) => {
    const errors = {};
    
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!data.password) {
      errors.password = 'Password is required';
    }
    
    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  };
  
  const validateRegisterInput = (data) => {
    const errors = {};
    
    if (!data.username) {
      errors.username = 'Username is required';
    } else if (data.username.length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    }
    
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    
    if (!data.role) {
      errors.role = 'Role is required';
    } else if (!['admin', 'salesperson', 'distributor'].includes(data.role)) {
      errors.role = 'Invalid role';
    }
    
    if (!data.name) {
      errors.name = 'Name is required';
    }
    
    if (!data.phone) {
      errors.phone = 'Phone number is required';
    }
    
    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  };
  
  export default {
    validateLoginInput,
    validateRegisterInput
  };