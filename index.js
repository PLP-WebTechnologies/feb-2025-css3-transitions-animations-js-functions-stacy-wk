const form = document.getElementById('assignmentForm');
const assignmentList = document.getElementById('assignmentList');

    // Load assignments from localStorage on page load
    window.addEventListener('load', () => {
      const saved = JSON.parse(localStorage.getItem('assignments')) || [];
      saved.forEach(a => addAssignment(a.title, a.dueDate, false));
    });

    // Event listener for form
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const title = document.getElementById('title').value.trim();
      const dueDate = document.getElementById('dueDate').value;
      if (title === '' || dueDate === '') return alert('Please fill out both fields!');
      addAssignment(title, dueDate, true);
      form.reset();
    });

    // Save assignments to localStorage
    function saveToLocalStorage() {
      const assignments = Array.from(assignmentList.children).map(div => {
        const title = div.querySelector('strong').textContent;
        const due = div.querySelector('small').textContent.replace('Due: ', '');
        return { title, dueDate: due };
      });
      localStorage.setItem('assignments', JSON.stringify(assignments));
    }

    // Add assignment element
    function addAssignment(title, dueDate, save = true) {
      const assignmentDiv = document.createElement('div');
      assignmentDiv.className = 'assignment';
      assignmentDiv.innerHTML = `
        <div class="assignment-details">
          <strong>${title}</strong><br/>
          <small>Due: ${dueDate}</small>
        </div>
        <button class="delete-btn">Delete</button>
      `;

      const deleteBtn = assignmentDiv.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', function () {
        // Add wiggle before removing
        assignmentDiv.classList.add('wiggle');
        setTimeout(() => {
          assignmentDiv.remove();
          saveToLocalStorage();
        }, 300);
      });

      assignmentList.appendChild(assignmentDiv);
      if (save) saveToLocalStorage();
    }

