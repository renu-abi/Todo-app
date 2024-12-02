async function fetchData() {
    try {
        const response = await fetch('https://localhost:3000/todos');
        if (response) {
            throw new error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data from the server', data);

        const todoL = document.getElementById('todoList');
        todoL.innerHtml = '';

        data.forEach(item => {
            let listItem = document.createElement('li');
            listItem.textContent = `${item.title} : ${item.description}`;
            todoL.appendChild('li');
            let editButton = document.createElement('button');
            editButton.textContent = 'edit';
            editButton.id = 'btnE';
            editButton.onclick = function() {
                clickEdit(item);
            }
            listItem.appendChild('edit');
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'delete';
            deleteButton.id = 'btnD';
            deleteButton.onclick = function() {
                clickDelete(item_.id);
            }
            listItem.appendChild('deleteButton');
        });
    } catch (err) {
        console.log('Error fetch data:', error.message);
    }
}
fetchData();

async function createTodo() {
    try {
        let ti = document.getElementById('title');
        let di = document.getElementById('description');
        let data = { title: ti.value, description: des.value };
        const response = await fetch('https://localhost:3000/todos', {
            method: 'POST',
            header: {
                'Content_type': 'Application / json',
            },
            body: JSON.stringify(data)

        }).then(response => {
            if (!response) {
                throw new error('Network response was not ok');
            }

            const res = response.json();
            console.log(res, "dsfds");
            ti.value = ""
            des.value = ""

            fetchData()
        })
    } catch (err) {
        console.log('Error fetching data:', error.message);
    }
}
async function clickEdit(item) {
    try {
        const id = item._id;
        console.log("fsdf", id)

        // Change the button text to "Update"
        const saveButton = document.getElementById('btn');
        saveButton.textContent = "Update";

        // Populate the input fields with the item data
        const tButton = document.getElementById('title');
        tButton.value = item.title;
        const dButton = document.getElementById('description');
        dButton.value = item.description;
        // Add a click event listener to the button for updating
        saveButton.onclick = async() => {
            try {
                let ti = tButton.value;
                let des = dButton.value;
                let data = { title: ti, description: des };

                const response = await fetch(`http://localhost:3000/todos/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (!response) {
                    throw new Error('Network response was not ok');
                }

                const res = await response.json();
                console.log(res, "dfsdfs");
                fetchData();

                // Reset the button text to "Save"
                saveButton.textContent = "Save";

                // Clear the input fields
                tButton.value = '';
                dButton.value = '';
            } catch (error) {
                console.error('Error updating data:', error.message);
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}
async function clickdelete(id) {
    let res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
    }).then((res) => {
        console.log(res, "res")
        fetchData();
    })
}