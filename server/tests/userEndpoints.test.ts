const baseURL = "http://localhost:4040/api/users"; // Adjust port if needed

async function testRegister() {
  try {
    console.log("Testing /register endpoint...");

    // Valid request
    let response = await fetch(`${baseURL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "testuser@example.com" }),
    });
    let data = await response.json();
    console.log("Valid register response:", data);

    // Invalid request: missing email
    try {
      response = await fetch(`${baseURL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      data = await response.json();
      console.log("Invalid register response (missing email):", data);
    } catch (error: any) {
      console.log("Error in invalid register:", error.message);
    }

    // Invalid JSON payload (simulate by sending malformed JSON)
    try {
      response = await fetch(`${baseURL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{email: 'badjson'}", // malformed JSON (property name not double quoted)
      });
      data = await response.json();
      console.log("Invalid register response (malformed JSON):", data);
    } catch (error: any) {
      console.log("Error in malformed JSON register:", error.message);
    }
  } catch (error) {
    console.error("Error testing /register:", error);
  }
}

async function testLogin() {
  try {
    console.log("Testing /login endpoint...");

    // Valid request
    let response = await fetch(`${baseURL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "testuser@example.com" }),
    });
    let data = await response.json();
    console.log("Valid login response:", data);

    // Invalid request: missing email
    try {
      response = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      data = await response.json();
      console.log("Invalid login response (missing email):", data);
    } catch (error: any) {
      console.log("Error in invalid login:", error.message);
    }

    // Invalid JSON payload
    try {
      response = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{email: 'badjson'}",
      });
      data = await response.json();
      console.log("Invalid login response (malformed JSON):", data);
    } catch (error: any) {
      console.log("Error in malformed JSON login:", error.message);
    }
  } catch (error) {
    console.error("Error testing /login:", error);
  }
}

async function testVerifyOTP() {
  try {
    console.log("Testing /verify-otp endpoint...");

    // Valid request
    let response = await fetch(`${baseURL}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "testuser@example.com", otp: "123456" }),
    });
    let data = await response.json();
    console.log("Valid verify-otp response:", data);

    // Invalid request: missing email or otp
    try {
      response = await fetch(`${baseURL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "testuser@example.com" }),
      });
      data = await response.json();
      console.log("Invalid verify-otp response (missing otp):", data);
    } catch (error: any) {
      console.log("Error in missing otp verify:", error.message);
    }

    try {
      response = await fetch(`${baseURL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: "123456" }),
      });
      data = await response.json();
      console.log("Invalid verify-otp response (missing email):", data);
    } catch (error: any) {
      console.log("Error in missing email verify:", error.message);
    }

    // Invalid JSON payload
    try {
      response = await fetch(`${baseURL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{email: 'badjson', otp: 123456}",
      });
      data = await response.json();
      console.log("Invalid verify-otp response (malformed JSON):", data);
    } catch (error: any) {
      console.log("Error in malformed JSON verify:", error.message);
    }
  } catch (error) {
    console.error("Error testing /verify-otp:", error);
  }
}

async function testSecondLogin() {
  try {
    console.log("Testing second /login endpoint...");

    // Valid request after verify
    let response = await fetch(`${baseURL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "testuser@example.com" }),
    });
    let data = await response.json();
    console.log("Second login response:", data);
  } catch (error: any) {
    console.log("Error in second login:", error.message);
  }
}

async function runTests() {
  await testRegister();
  await testLogin();
  await testVerifyOTP();
  await testSecondLogin();
}

runTests();
