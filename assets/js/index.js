
window.onload = function () {
    document.getElementById('root').innerHTML = `
    <div id="content"></div>    
    </div>
    `
    header = 'Home';
    document.querySelector('.clients').addEventListener('click', clientsDisplay);
    document.querySelector('.home').addEventListener('click', homeDisplay);
    document.querySelector('.jobs').addEventListener('click', jobsDisplay);
    document.getElementById('header-p').innerHTML = `${header}`;
};

function clientsDisplay() {
    document.getElementById('add').style.visibility = "visible";
    document.getElementById('add-btn').classList = "icon ion-md-add client-add";
    header = 'Clients';
    document.getElementById('header-p').innerHTML = `${header}`;
    document.getElementById('content').innerHTML = ` `;

    fetch('http://localhost:8888/get-clients', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: "include",
    })
        .then(response => response.json())
        .then(response => {
            if (response.length) {
                response.forEach(client => {
                    document.getElementById('content').innerHTML += `
                    <div class="client" id="${client._id}" >
                        <div id="show">
                            <h1 id="first-last-name">${client.firstName} ${client.lastName}</h1>
                            <div class="drop-down-arrow"> D </div>
                        </div>
                        <div class="addInfo" data-client="${client._id}">
                            <div id="email-phone">
                                <p id="client-email">${client.email}</p>
                                <p id="client-phone">${client.phone}</p>
                            </div>
                            <div class="remove1" id="remove"> R </div> 
                            <div class="update1" id="update"> U </div>
                        </div>
                    </div>`;
                });
            };
            document.querySelector('.client-add').addEventListener('click', clientsAdd);

            document.querySelectorAll('.drop-down-arrow').forEach(e => {
                e.onclick = function () {
                    let parent = e.parentNode;
                    let grandParent = parent.parentNode;
                    grandParent.style.height = grandParent.offsetHeight === 70 ? "150px" : "70px";
                }
            });
            document.querySelectorAll('#remove').forEach(e => {
                e.onclick = function (e) {
                    removeClient({ id: e.target.parentNode.dataset.client });
                };
            });
            document.querySelectorAll('#update').forEach(e => {
                e.onclick = function (e) {
                  let id = e.target.parentNode.dataset.client 
                  clientUpdate(id);
                };
            });
            
        })
        .catch(error => console.error(error));
};


function clientUpdate(id){
    document.getElementById('add').style.visibility = "hidden";
    let button = document.createElement('button');
    button.id = 'add-btn';
    button.innerHTML = "Add";
    button.onclick = function () {
        updateClient({
            id: id,
            firstName: document.getElementById('add-first-name').value,
            lastName: document.getElementById('add-last-name').value,
            email: document.getElementById('add-email').value,
            phone: document.getElementById('add-phone').value
        });
        clientsDisplay();
    };
    document.getElementById('content').innerHTML = `
    <div id="add-form">
        <input type="text" value="" id="add-first-name" name="add-first-name" required placeholder="First Name">
        <input type="text" value="" id="add-last-name" name="add-last-name" required placeholder="Last Name">    
        <input type="text" value="" id="add-phone" name="add-phone" required placeholder="Phone">
        <input type="text" value="" id="add-email" name="add-email" required placeholder="Email">
        <div id="add-form-btns">
            <div id="add-form-back-btn">Back</div>
        </div>
    </div>
    `;
    document.getElementById('add-form-btns').appendChild(button);


    document.getElementById('add-form-back-btn').addEventListener('click', clientsDisplay);
};


function clientsAdd() {
    document.getElementById('add').style.visibility = "hidden";
    let button = document.createElement('button');
    button.id = 'add-btn';
    button.innerHTML = "Add";
    button.onclick = function () {
        addNewClient({
            firstName: document.getElementById('add-first-name').value,
            lastName: document.getElementById('add-last-name').value,
            email: document.getElementById('add-email').value,
            phone: document.getElementById('add-phone').value
        });
        clientsDisplay();
    };
    document.getElementById('content').innerHTML = `
    <div id="add-form">
        <input type="text" value="" id="add-first-name" name="add-first-name" required placeholder="First Name">
        <input type="text" value="" id="add-last-name" name="add-last-name" required placeholder="Last Name">    
        <input type="text" value="" id="add-phone" name="add-phone" required placeholder="Phone">
        <input type="text" value="" id="add-email" name="add-email" required placeholder="Email">
        <div id="add-form-btns">
            <div id="add-form-back-btn">Back</div>
        </div>
    </div>
    `;
    document.getElementById('add-form-btns').appendChild(button);


    document.getElementById('add-form-back-btn').addEventListener('click', clientsDisplay);
};

function addNewClient(client) {
    fetch('http://localhost:8888/new-client', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(client)
    })
        .then(response => response.json())
        .then(response => {
            // console.log('<<<<<<<<', response);
            // let newClientAdded = document.createElement('div');
            // newClientAdded.classList = 'client';
            // newClientAdded.id = `${response._id}`;
            // let clientName = document.createElement('h1');
            // clientName.classList = 'client-name';
            // clientName.innerHTML = `${response.firstName} sds ${response.lastName}`
            // newClientAdded.append(clientName); 
            // document.getElementById('content').append(newClientAdded);
        })
        .catch(error => console.log(error));
};

function removeClient(id) {
    fetch('http://localhost:8888/remove-client', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(id)
    })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                document.getElementById(id.id).remove();
            };
        })
        .catch(error => console.log(error));
};

function updateClient(client) {
    fetch('http://localhost:8888/update-client', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(client)
    })
        .then(response => response.json())
        .then(response => {
            console.log('>>>>>>', response);
        })
        .catch(error => console.log(error));
};


function homeDisplay() {
    header = 'Home';
    document.getElementById('add').style.visibility = "hidden";
    document.getElementById('header-p').innerHTML = `${header}`;
    document.getElementById('root').innerHTML = `
    <div id="content"></div>
    `;
};

function showJob(id){
    document.getElementById('add').style.visibility = "hidden";
    fetch('http://localhost:8888/show-job', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(id)
    })
    .then(response => response.json())
        .then(response => {
            console.log('>>>>>>', response);
            if(response.length){
                response.forEach(job => {
                    document.getElementById('content').innerHTML=`
                    <div id="${job._id}">
                        <div id="model">${job.model}</div>
                        <div id="owner">${job.owner}</div>
                        <div id="date"></div>
                        <div id="description">${job.description}</div>
                        <div id="btns">
                            <div class="remove" > Remove </div>
                            <div class="back-btn" id="back-btn1"> Black </div>
                        </div>
                    </div>
                    `;
                });
            };

            document.querySelectorAll('.back-btn').forEach(e=>{
                e.onclick = function(){
                    jobsDisplay();
                };
            });

            document.querySelectorAll('.remove').forEach(e=>{
                e.onclick = function(e){
                    removeJob({id:e.target.parentNode.parentNode.id });
                    clientsDisplay();
                };
            });
        })
        .catch(error => console.log(error));
};

function removeJob(id) {
    fetch('http://localhost:8888/remove-job', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(id)
    })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                document.getElementById(id.id).remove();
            };
        })
        .catch(error => console.log(error));
};


function jobsDisplay() {
    document.getElementById('add').style.visibility = "visible";
    document.getElementById('add-btn').classList = "icon ion-md-add jobs-add";
    header = 'Jobs';
    document.getElementById('header-p').innerHTML = `${header}`;
    document.getElementById('content').innerHTML = ` `;

    fetch('http://localhost:8888/get-jobs', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: "include",
    })
        .then(response => response.json())
        .then(response => {
            if (response.length) {
                response.forEach(job => {
                    console.log(response);
                    document.getElementById('content').innerHTML += `
                    <div class="jobs-div" id="${job._id}" >
                            <h1 id="model">${job.model}</h1>
                    </div>
                    `;
                });
            };

            document.querySelector('.jobs-add').addEventListener('click', jobsAdd);


            document.querySelectorAll('.jobs-div').forEach(e => {
                e.onclick = function () {
                    console.log(e.id);
                    showJob({id: e.id});
                };
            });
        });
        //     document.querySelectorAll('#remove').forEach(e => {
        //         e.onclick = function (e) {
        //             removeClient({ id: e.target.parentNode.dataset.client });
        //         };
        //     });
        //     document.querySelectorAll('#update').forEach(e => {
        //         e.onclick = function (e) {
        //           let id = e.target.parentNode.dataset.client 
        //           clientUpdate(id);
        //         };
        //     });
            
        // })
        // .catch(error => console.error(error));
};

function jobsAdd() {
    document.getElementById('add').style.visibility = "hidden";
    let button = document.createElement('button');
    button.id = 'add-btn';
    button.innerHTML = "Add";
    button.onclick = function () {
        addNewJob({
            model: document.getElementById('jobs-model').value,
            dateCreated: Date(),
            owner: document.getElementById('jobs-owner').value,
            description: document.getElementById('jobs-description').value
        });
        jobsDisplay();
    };
    document.getElementById('content').innerHTML = `
    <div id="jobs-form">
        <input type="text" value="" id="jobs-model" name="add-first-name" required placeholder="Model">
        <input type="text" value="" id="jobs-owner" name="add-phone" required placeholder="Owner">
        <input type="text" value="" id="jobs-description" name="add-email" required placeholder="Description">
        <div id="jobs-form-btns">
            <div id="jobs-form-back-btn">Back</div>
        </div>
    </div>
    `;
    document.getElementById('jobs-form-btns').appendChild(button);


    document.getElementById('jobs-form-back-btn').addEventListener('click', jobsDisplay);
};

function addNewJob(job) {
    fetch('http://localhost:8888/new-job', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(job)
    })
        .then(response => response.json())
        .then(response => {
            // console.log('<<<<<<<<', response);
            // let newClientAdded = document.createElement('div');
            // newClientAdded.classList = 'client';
            // newClientAdded.id = `${response._id}`;
            // let clientName = document.createElement('h1');
            // clientName.classList = 'client-name';
            // clientName.innerHTML = `${response.firstName} sds ${response.lastName}`
            // newClientAdded.append(clientName); 
            // document.getElementById('content').append(newClientAdded);
        })
        .catch(error => console.log(error));
};