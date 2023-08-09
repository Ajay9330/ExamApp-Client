// auth.js

export const login = async (userData) => {
    try {
      // Make API call to login endpoint
      const response = await fetch('http://localhost:6000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Perform any login-related logic here
        return data; // Return data to indicate successful login
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
  // Add other authentication functions here if needed
  