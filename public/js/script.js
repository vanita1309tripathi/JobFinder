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
            
            // Switch to login form inside the modal
            document.getElementById("login-tab").click(); 
            // document.getElementById("registerForm").style.display = "none"; // Hide register form
            // document.getElementById("loginForm").style.display = "block"; // Show login form
        } else {
            alert("Error registering user.");
        }
    }).catch(error => console.error("Fetch error:", error));
});

// Function to show the modal and set the Job ID
function applyForJob(jobId) {
    document.getElementById("jobId").value = jobId; // Set Job ID in the form
    document.getElementById("jobApplicationModal").style.display = "block"; // Show modal
}

// Function to close the modal
function closeModal() {
    document.getElementById("jobApplicationModal").style.display = "none";
}

// Handle Applicant form submission
document.getElementById("applicationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const jobId = document.getElementById("jobId").value;
    const name = document.getElementById("applicantName").value;
    const email = document.getElementById("applicantEmail").value;
    const resume = document.getElementById("resume").files[0]; // Get file

    console.log("Applying for Job:", { jobId, name, email, resume });
    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("resume", resume);

    // send the data to the server
    fetch("/apply", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || "Application submitted successfully!");
        closeModal();
    })
    .catch(error => console.error("Error:", error));
});


