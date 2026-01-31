const axios = require("axios");

const BASE_URL = "http://localhost:5000/api/auth";

async function testAuth() {
  try {
    console.log("=== Testing Authentication ===\n");

    // Test 1: Signup Admin
    console.log("1. Creating admin user...");
    try {
      const signupAdmin = await axios.post(`${BASE_URL}/signup`, {
        email: "admin@test.com",
        password: "admin123",
        role: "admin",
      });
      console.log("✅ Admin created successfully");
      console.log("Token received:", signupAdmin.data.token.substring(0, 20) + "...\n");
    } catch (err) {
      if (err.response?.data?.message === "User already exists") {
        console.log("⚠️  Admin already exists\n");
      } else {
        throw err;
      }
    }

    // Test 2: Signup User
    console.log("2. Creating regular user...");
    try {
      const signupUser = await axios.post(`${BASE_URL}/signup`, {
        email: "user@test.com",
        password: "user123",
        role: "user",
      });
      console.log("✅ User created successfully");
      console.log("Token received:", signupUser.data.token.substring(0, 20) + "...\n");
    } catch (err) {
      if (err.response?.data?.message === "User already exists") {
        console.log("⚠️  User already exists\n");
      } else {
        throw err;
      }
    }

    // Test 3: Login Admin
    console.log("3. Testing admin login...");
    const loginAdmin = await axios.post(`${BASE_URL}/login`, {
      email: "admin@test.com",
      password: "admin123",
    });
    console.log("✅ Admin login successful");
    console.log("Token received:", loginAdmin.data.token.substring(0, 20) + "...");
    
    // Decode and show role
    const adminPayload = JSON.parse(Buffer.from(loginAdmin.data.token.split('.')[1], 'base64').toString());
    console.log("Role:", adminPayload.role, "\n");

    // Test 4: Login User
    console.log("4. Testing user login...");
    const loginUser = await axios.post(`${BASE_URL}/login`, {
      email: "user@test.com",
      password: "user123",
    });
    console.log("✅ User login successful");
    console.log("Token received:", loginUser.data.token.substring(0, 20) + "...");
    
    // Decode and show role
    const userPayload = JSON.parse(Buffer.from(loginUser.data.token.split('.')[1], 'base64').toString());
    console.log("Role:", userPayload.role, "\n");

    // Test 5: Failed Login
    console.log("5. Testing invalid credentials...");
    try {
      await axios.post(`${BASE_URL}/login`, {
        email: "wrong@test.com",
        password: "wrongpass",
      });
    } catch (err) {
      console.log("✅ Invalid login correctly rejected");
      console.log("Error:", err.response?.data?.message, "\n");
    }

    console.log("=== All Tests Completed ===");
    console.log("\n📝 Test Accounts Created:");
    console.log("Admin: admin@test.com / admin123");
    console.log("User:  user@test.com / user123");

  } catch (error) {
    console.error("❌ Test failed:", error.response?.data || error.message);
  }
}

testAuth();
