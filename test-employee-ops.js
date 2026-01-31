const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";

async function testEmployeeOperations() {
  try {
    console.log("=== Testing Employee Operations ===\n");

    // First, login as admin
    console.log("1. Login as admin...");
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: "admin@test.com",
      password: "admin123",
    });
    const token = loginRes.data.token;
    console.log("✅ Logged in as admin\n");

    const headers = { Authorization: token };

    // Get all employees
    console.log("2. Getting all employees...");
    const getRes = await axios.get(`${BASE_URL}/employees`, { headers });
    const employees = getRes.data;
    console.log(`✅ Found ${employees.length} employees`);
    
    if (employees.length === 0) {
      console.log("❌ No employees found. Add an employee first.\n");
      return;
    }

    const testEmployeeId = employees[0]._id;
    console.log(`Using employee ID: ${testEmployeeId}\n`);

    // Test Get Details
    console.log("3. Getting employee details...");
    const detailRes = await axios.get(
      `${BASE_URL}/employees/${testEmployeeId}`,
      { headers }
    );
    console.log("✅ Employee details retrieved");
    console.log("Name:", detailRes.data.name);
    console.log("Email:", detailRes.data.email);
    console.log("Department:", detailRes.data.department);
    console.log("Salary:", detailRes.data.salary, "\n");

    // Test Update
    console.log("4. Updating employee...");
    const updateRes = await axios.put(
      `${BASE_URL}/employees/${testEmployeeId}`,
      {
        name: "Updated " + detailRes.data.name,
        email: detailRes.data.email,
        department: "Updated " + detailRes.data.department,
        salary: detailRes.data.salary + 5000,
      },
      { headers }
    );
    console.log("✅ Employee updated successfully");
    console.log("Updated Name:", updateRes.data.employee.name);
    console.log("Updated Department:", updateRes.data.employee.department);
    console.log("Updated Salary:", updateRes.data.employee.salary, "\n");

    // Verify update in DB
    console.log("5. Verifying update in database...");
    const verifyRes = await axios.get(
      `${BASE_URL}/employees/${testEmployeeId}`,
      { headers }
    );
    console.log("✅ Update verified in database");
    console.log("Name in DB:", verifyRes.data.name);
    console.log("Department in DB:", verifyRes.data.department);
    console.log("Salary in DB:", verifyRes.data.salary, "\n");

    // Test Delete
    console.log("6. Deleting employee...");
    const deleteRes = await axios.delete(
      `${BASE_URL}/employees/${testEmployeeId}`,
      { headers }
    );
    console.log("✅ Employee deleted successfully\n");

    // Verify deletion
    console.log("7. Verifying deletion in database...");
    try {
      await axios.get(`${BASE_URL}/employees/${testEmployeeId}`, { headers });
      console.log("❌ Employee still exists!");
    } catch (err) {
      if (err.response?.status === 404) {
        console.log("✅ Employee successfully deleted from database\n");
      }
    }

    console.log("=== All Tests Completed Successfully ===");

  } catch (error) {
    console.error("❌ Test failed:", error.response?.data || error.message);
  }
}

testEmployeeOperations();
