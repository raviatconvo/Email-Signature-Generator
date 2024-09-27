const form = document.getElementById("signatureForm");
const preview = document.getElementById("signaturePreview");
const downloadBtn = document.getElementById("downloadBtn");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  updateSignature();
});

function updateSignature() {
  const name = document.getElementById("fullName").value;
  const pronouns = document.getElementById("pronouns").value;
  const jobTitle = document.getElementById("jobTitle").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const website = document.getElementById("website").value;

  preview.innerHTML = `
        <img src="/api/placeholder/100/100" alt="Profile Picture" class="profile-pic">
        <h2 class="name">${name} <span class="pronouns">(${pronouns})</span></h2>
        <p class="job-title">${jobTitle}</p>
        <ul class="contact-info">
            <li class="email"><a href="mailto:${email}">${email}</a></li>
            ${phone ? `<li class="phone">${phone}</li>` : ""}
            ${website ? `<li class="website"><a href="${website}">${website}</a></li>` : ""}
        </ul>
    `;
}

// Update preview on input change
form.addEventListener("input", updateSignature);

// Handle file input for profile picture
document.getElementById("profilePic").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.querySelector(".profile-pic").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// New function to generate clean HTML
function generateCleanHTML() {
  const name = document.getElementById("fullName").value;
  const pronouns = document.getElementById("pronouns").value;
  const jobTitle = document.getElementById("jobTitle").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const website = document.getElementById("website").value;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Signature</title>
    <style>
        .email-signature {
            font-family: Arial, sans-serif;
            max-width: 400px;
            padding: 20px;
        }
        .profile-pic {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
        }
        .name { margin: 10px 0 5px; font-size: 18px; }
        .pronouns { font-weight: normal; font-size: 14px; }
        .job-title { margin: 0 0 10px; font-style: italic; }
        .contact-info { list-style-type: none; padding: 0; }
        .contact-info li { margin-bottom: 5px; }
        .contact-info li::before { margin-right: 5px; }
        .contact-info .email::before { content: '📧'; }
        .contact-info .phone::before { content: '📞'; }
        .contact-info .website::before { content: '🌐'; }
    </style>
</head>
<body>
    <div class="email-signature">
        <img src="YOUR_IMAGE_URL_HERE" alt="Profile Picture" class="profile-pic">
        <h2 class="name">${name} <span class="pronouns">(${pronouns})</span></h2>
        <p class="job-title">${jobTitle}</p>
        <ul class="contact-info">
            <li class="email"><a href="mailto:${email}">${email}</a></li>
            ${phone ? `<li class="phone">${phone}</li>` : ""}
            ${website ? `<li class="website"><a href="${website}">${website}</a></li>` : ""}
        </ul>
    </div>
</body>
</html>
    `.trim();
}

// Download functionality
downloadBtn.addEventListener("click", function () {
  const cleanHTML = generateCleanHTML();
  const blob = new Blob([cleanHTML], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "email_signature.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
