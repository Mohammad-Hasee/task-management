const mockApi = {
    login(email, password) {
      // Simulate backend login with a hardcoded user for demo purposes
      const users = [
        { id: 1, email: 'user1@example.com', password: 'password1', name: 'User 1' },
        { id: 2, email: 'user2@example.com', password: 'password2', name: 'User 2' },
      ];
  
      const user = users.find(u => u.email === email && u.password === password);
      return user ? Promise.resolve(user) : Promise.reject('Invalid credentials');
    },
  
    getTasks(userId) {
      // Simulate fetching tasks from the server
      const tasks = [
        { id: 1, name: 'Task 1', description: 'Description for Task 1', dueDate: '2023-07-30', assignee: 1, status: 'In Progress' },
        { id: 2, name: 'Task 2', description: 'Description for Task 2', dueDate: '2023-08-15', assignee: 2, status: 'Not Started' },
        { id: 3, name: 'Task 3', description: 'Description for Task 3', dueDate: '2023-08-20', assignee: 1, status: 'Completed' },
      ];
  
      return Promise.resolve(tasks.filter(task => task.assignee === userId));
    }
  };
  
  function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    mockApi.login(email, password)
      .then(user => {
        showDashboard(user);
        fetchTasks(user.id);
      })
      .catch(error => alert(error));
  }
  
  function showDashboard(user) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('username').textContent = user.name;
  }
  
  function fetchTasks(userId) {
    mockApi.getTasks(userId)
      .then(tasks => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
  
        tasks.forEach(task => {
          const taskCard = document.createElement('div');
          taskCard.classList.add('taskCard');
  
          const taskName = document.createElement('h3');
          taskName.textContent = task.name;
  
          const taskDescription = document.createElement('p');
          taskDescription.textContent = task.description;
  
          const taskDueDate = document.createElement('p');
          taskDueDate.textContent = 'Due Date: ' + task.dueDate;
  
          const taskStatus = document.createElement('p');
          taskStatus.textContent = 'Status: ' + task.status;
  
          taskCard.appendChild(taskName);
          taskCard.appendChild(taskDescription);
          taskCard.appendChild(taskDueDate);
          taskCard.appendChild(taskStatus);
  
          taskList.appendChild(taskCard);
        });
      })
      .catch(error => alert('Failed to fetch tasks: ' + error));
  }