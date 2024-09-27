const form = document.getElementById('signatureForm');
const preview = document.getElementById('signaturePreview');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    updateSignature();
});

function updateSignature() {
    const name = document.getElementById('fullName').value;
    const pronouns = document.getElementById('pronouns').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const website = document.getElementById('website').value;

    preview.innerHTML = `
        <img src="/api/placeholder/100/100" alt="Profile Picture" class="profile-pic">
        <h2 class="name">${name} <span class="pronouns">(${pronouns})</span></h2>
        <p class="job-title">${jobTitle}</p>
        <ul class="contact-info">
            <li class="email"><a href="mailto:${email}">${email}</a></li>
            ${phone ? `<li class="phone">${phone}</li>` : ''}
            ${website ? `<li class="website"><a href="${website}">${website}</a></li>` : ''}
        </ul>
    `;
}

// Update preview on input change
form.addEventListener('input', updateSignature);

// Handle file input for profile picture
document.getElementById('profilePic').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('.profile-pic').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});
