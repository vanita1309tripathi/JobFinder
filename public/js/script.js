document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Login successful!");
            
        } else {
            alert("Invalid credentials!");
        }
    });
});

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Atleast we are in the script");
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const userType = document.getElementById("userType").value; 
    const name=document.getElementById("name").value;
    fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name,email, password, userType }),
    })
    .then(response => response.json()) 
    .then(data => {
        console.log("Response:",data);
        if (data.success) {
            alert("Registration successful!");
            $("#authModal").modal("hide"); 
            // Switch to login form inside the modal
            document.getElementById("registerForm").style.display = "none"; // Hide register form
            document.getElementById("loginForm").style.display = "block"; // Show login form
        } else {
            alert("Error registering user.");
        }
    }).catch(error => console.error("Fetch error:", error));
});
