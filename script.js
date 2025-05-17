function startBuilder() {
  document.querySelector('.landing').style.display = 'none';
  document.getElementById('builder').style.display = 'flex';
}

function addEducation() {
  const div = document.createElement('div');
  div.innerHTML = `
    <input type="text" placeholder="Degree" class="edu-degree" />
    <input type="text" placeholder="Institute" class="edu-inst" />
    <input type="text" placeholder="Duration (e.g. 2018-2022)" class="edu-duration" />
    <input type="text" placeholder="Grade" class="edu-grade" />
  `;
  document.getElementById('educationContainer').appendChild(div);
}

function addProject() {
  const div = document.createElement('div');
  div.innerHTML = `
    <input type="text" placeholder="Project Title" class="proj-title" />
    <input type="text" placeholder="Project Link" class="proj-link" />
  `;
  document.getElementById('projectContainer').appendChild(div);
}

function addCompany() {
  const div = document.createElement('div');
  div.innerHTML = `
    <input type="text" placeholder="Company Name" class="comp-name" />
    <input type="text" placeholder="Duration (e.g. Jan 2020 - Dec 2021)" class="comp-duration" />
  `;
  document.getElementById('companyContainer').appendChild(div);
}

document.getElementById('imageUpload').addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('previewImage')?.remove();
      const img = document.createElement('img');
      img.id = 'previewImage';
      img.src = e.target.result;
      document.getElementById('preview').prepend(img);
    };
    reader.readAsDataURL(file);
  }
});

function generateResume() {
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const guardian = document.getElementById('guardian').value;
  const github = document.getElementById('github').value;
  const profile = document.getElementById('profile').value;
  const skills = document.getElementById('skills').value.split(',');
  const languages = document.getElementById('languages').value.split(',');
  const hobbies = document.getElementById('hobbies').value.split(',');

  const educationEls = document.querySelectorAll('#educationContainer > div');
  const projectEls = document.querySelectorAll('#projectContainer > div');
  const companyEls = document.querySelectorAll('#companyContainer > div');

  let html = `<h2>${name}</h2><p><strong>${title}</strong></p>`;
  if (document.getElementById('previewImage')) {
    html += document.getElementById('previewImage').outerHTML;
  }

  html += `<p><strong>Phone:</strong> ${phone}</p>`;
  html += `<p><strong>Email:</strong> ${email}</p>`;
  html += `<p><strong>Address:</strong> ${address}</p>`;
  html += `<p><strong>Guardian:</strong> ${guardian}</p>`;
  if (github) html += `<p><strong>GitHub:</strong> <a href="${github}" target="_blank">${github}</a></p>`;
  html += `<h3>Profile</h3><p>${profile}</p>`;

  if (educationEls.length) {
    html += `<h3>Education</h3><ul>`;
    educationEls.forEach(el => {
      const deg = el.querySelector('.edu-degree')?.value;
      const inst = el.querySelector('.edu-inst')?.value;
      const dur = el.querySelector('.edu-duration')?.value;
      const grade = el.querySelector('.edu-grade')?.value;
      html += `<li><strong>${deg}</strong>, ${inst} (${dur}) - Grade: ${grade}</li>`;
    });
    html += `</ul>`;
  }

  if (companyEls.length) {
    html += `<h3>Experience</h3><ul>`;
    companyEls.forEach(el => {
      const name = el.querySelector('.comp-name')?.value;
      const dur = el.querySelector('.comp-duration')?.value;
      html += `<li><strong>${name}</strong> (${dur})</li>`;
    });
    html += `</ul>`;
  }

  if (projectEls.length) {
    html += `<h3>Projects</h3><ul>`;
    projectEls.forEach(el => {
      const title = el.querySelector('.proj-title')?.value;
      const link = el.querySelector('.proj-link')?.value;
      html += `<li><strong>${title}</strong>: <a href="${link}" target="_blank">${link}</a></li>`;
    });
    html += `</ul>`;
  }

  html += `<h3>Skills</h3><ul>${skills.map(s => `<li>${s.trim()}</li>`).join('')}</ul>`;
  html += `<h3>Languages</h3><ul>${languages.map(l => `<li>${l.trim()}</li>`).join('')}</ul>`;
  html += `<h3>Hobbies</h3><ul>${hobbies.map(h => `<li>${h.trim()}</li>`).join('')}</ul>`;

  document.getElementById('preview').innerHTML = html;
}
