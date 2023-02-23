window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display existing tasks
    tasks.forEach(task => {
        const task_el = createTaskElement(task);
        list_el.appendChild(task_el);
    });
	
	input.a

    form.addEventListener('submit', (e) => {
		e.preventDefault();
	
		const task = input.value;
	
		// Check if task is not blank
		if (task.trim() !== '') {
			tasks.push(task);
	
			// Save tasks to local storage
			localStorage.setItem('tasks', JSON.stringify(tasks));
	
			const task_el = createTaskElement(task);
			list_el.appendChild(task_el);
	
			input.value = '';
		}
	});
	

    function createTaskElement(task) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

		

        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
                updateTask(task_el, task_input_el.value);
            }
        });

        task_delete_el.addEventListener('click', (e) => {
            list_el.removeChild(task_el);
            deleteTask(task);
        });

        function updateTask(task_el, new_task) {
            const index = tasks.indexOf(task);
            tasks[index] = new_task;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function deleteTask(task) {
            const index = tasks.indexOf(task);
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        return task_el;
    }

	const download_btn = document.querySelector('#downloadbtn');

	download_btn.addEventListener('click', (e) => {
	const tasks = document.querySelectorAll('.task');
	const task_data = Array.from(tasks).map(task => {
		return task.querySelector('.text').value;
	});
	const file_data = task_data.join('\n');
	const file_blob = new Blob([file_data], {type: 'text/plain'});
	const file_url = URL.createObjectURL(file_blob);
	const download_link = document.createElement('a');
	download_link.href = file_url;
	download_link.download = 'tasks.txt';
	download_link.click();
	});
});




