
window.onload = function () {
    document.getElementById('root').innerHTML = `
    <div id="content" class="content"></div>    
    </div>
    `;
    document.querySelector('.clients').addEventListener('click', clientsDisplay);
    document.querySelector('.home').addEventListener('click', homeDisplay);
    document.querySelector('.jobs').addEventListener('click', jobsDisplay);
    document.querySelector('.settings').addEventListener('click', settingsDisplay);

};


function homeDisplay() {
    let welcomeUser = '<%= user.name %>'
    if(document.getElementById('home-header-p')){
        document.getElementById('home-header-p').innerHTML=`Welcome <%= user.name %>`;
    }else if(document.getElementById('header-p')){
        document.getElementById('header-p').remove();
        let heading = document.createElement('p');
        heading.id="home-header-p";
        heading.innerHTML=`Welcome ${welcomeUser}`;    
        document.getElementById('header-title').appendChild(heading);
    }else{
        let heading = document.createElement('p');
        heading.id="home-header-p";
        heading.innerHTML=`Welcome ${welcomeUser}`;    
        document.getElementById('header-title').appendChild(heading);
    };
    document.getElementById('content').innerHTML=` `;
};

function settingsDisplay() {
    if(document.getElementById('home-header-p')){
        document.getElementById('home-header-p').remove();
        let heading = document.createElement('p');
        heading.id="header-p";
        heading.innerHTML=`Settings`;    
        document.getElementById('header-title').appendChild(heading);
    }else if(document.getElementById('header-p')){
        document.getElementById('header-p').innerHTML=`Settings`;
    }else{
        let heading = document.createElement('p');
        heading.id="header-p";
        heading.innerHTML=`Settings`;    
        document.getElementById('header-title').appendChild(heading);
    };
    document.getElementById('content').innerHTML = `
    <div id="settings-container">
    <a id="logout-atag" href="/logout">LOGOUT</a>
    </div>
    `
};

function clientsDisplay() {
    if(document.getElementById('home-header-p')){
        document.getElementById('home-header-p').remove();
        let heading = document.createElement('p');
        heading.id="header-p";
        heading.innerHTML=`Clients`;    
        document.getElementById('header-title').appendChild(heading);
    }else if(document.getElementById('header-p')){
        document.getElementById('header-p').innerHTML=`Clients`;
    }else{
        let heading = document.createElement('p');
        heading.id="header-p";
        heading.innerHTML=`Clients`;    
        document.getElementById('header-title').appendChild(heading);
    };
    if (document.getElementById('add-btn')) {
        document.getElementById('add-btn').remove();
    };
    let btn = document.createElement("div");
    btn.id = "add-btn";
    btn.classList = "client-add";
    let i = document.createElement('i');
    i.id = "add";
    i.classList = "icon ion-md-add";
    btn.appendChild(i);
    document.getElementById('header').appendChild(btn);
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
                            <div class="drop-down-arrow"></i> </div>
                        </div>
                        <div class="addInfo" data-client="${client._id}">
                            <div id="email-phone">
                                <p id="client-email">${client.email}</p>
                                <p id="client-phone">${client.phone}</p>
                            </div>
                            <div class="remove1" id="remove-job"> 
                                <i class="icon ion-md-trash"></i>
                            </div> 
                            <div class="update1" id="update"> 
                                <i class="icon ion-md-create"></i>
                            </div>
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
            document.querySelectorAll('#remove-job').forEach(e => {
                e.onclick = function (e) {
                    console.log(e)
                    removeClient({ id: e.target.parentNode.parentNode.dataset.client });
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


function clientUpdate(id) {
    document.getElementById('add').style.visibility = "hidden";
    let button = document.createElement('button');
    button.id = 'add-form-add-btn';
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
    button.id = 'add-form-add-btn';
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



function showJob(id) {
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
            console.log('>>>>>>RESPONSE', response);
            if (response.length) {
                response.forEach(job => {
                    document.getElementById('content').innerHTML = `
                    <div id="${job._id}" class="show-job">
                        <div id="model">${job.model}</div>
                        <div id="owner">${job.owner}</div>
                        <div id="date"></div>
                        <div id="description">${job.description}</div>
                        <div id="image-container"></div>
                        <div id="btns">
                            <div class="remove" > Remove </div>
                            <div class="back-btn" id="back-btn1"> Back </div>
                        </div>
                    </div>
                    `;
                });
                for (let i = 0; i < response.length; i++) {
                    for (let j in response[i]) {
                        if (response[i][j] instanceof Array) {
                            var files = response[i][j];
                            console.log('files', files.length)
                            for (let k = 0; k < files.length; k++) {
                                let img = document.createElement('img');
                                img.id = "img-source";
                                img.src = `http://localhost:8888/assets/uploads/${response[i]._id}/${files[k].name}.jpg`;
                                document.getElementById('image-container').appendChild(img);
                            };
                            // console.log('HERE',response[i][j]);
                        };

                    };
                };
            };

            document.querySelectorAll('.back-btn').forEach(e => {
                e.onclick = function () {
                    jobsDisplay();
                };
            });

            document.querySelectorAll('.remove').forEach(e => {
                e.onclick = function (e) {
                    removeJob({ id: e.target.parentNode.parentNode.id });
                    jobsDisplay();
                };
            });
        })
        .catch(error => console.log(error));
};

// function getImages(){
//     fetch('http://localhost:8888/assets/uploads', {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         credentials: "include"
//     })
//         .then(response => response.json())
//         .then(response => {
//             console.log('IMAGES',response);
//             // if (response.success) {
//             //     document.getElementById(id.id).remove();
//             // };
//         })
//         .catch(error => console.log(error));
// };

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
            console.log(response);
            // if (response.success) {
            //     document.getElementById(id.id).remove();
            // };
        })
        .catch(error => console.log(error));
};


function jobsDisplay() {
    if(document.getElementById('home-header-p')){
        document.getElementById('home-header-p').remove();
        let heading = document.createElement('p');
        heading.id="header-p";
        heading.innerHTML=`Jobs`;    
        document.getElementById('header-title').appendChild(heading);
    }else if(document.getElementById('header-p')){
        document.getElementById('header-p').innerHTML=`Jobs`;
    }else{
        let heading = document.createElement('p');
        heading.id="header-p";
        heading.innerHTML=`Jobs`;    
        document.getElementById('header-title').appendChild(heading);
    };
    document.querySelector('.root').id = "root";
    document.querySelector('.content').id = "content";
    if (document.getElementById('add-btn')) {
        document.getElementById('add-btn').remove();
    };
    let btn = document.createElement("div");
    btn.id = "add-btn";
    btn.classList = "job-add";
    let i = document.createElement('i');
    i.id = "add";
    i.classList = "icon ion-md-add";
    btn.appendChild(i);
    document.getElementById('header').appendChild(btn);
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
                    document.getElementById('content').innerHTML += `
                    <div class="jobs-div" id="${job._id}" >
                            <h1 id="model">${job.model}</h1>
                    </div>
                    `;
                });
            };

            document.querySelector('.job-add').addEventListener('click', jobsAdd);


            document.querySelectorAll('.jobs-div').forEach(e => {
                e.onclick = function () {
                    console.log(e.id);
                    showJob({ id: e.id });
                };
            });
        })
        .catch(error => console.error(error));
};



function jobsAdd() {
    document.getElementById('add').style.visibility = "hidden";
    let button = document.createElement('button');
    button.id = 'jobs-form-add-btn';
    button.innerHTML = "Add";
    button.onclick = function () {
        console.log('<><<><><><><><><>', document.getElementById('jobs-image').files);
        let obj = document.getElementById('jobs-image').files;
        let arr = [];
        console.log(obj);

        var uniqueId = function () {
            return 'id-' + Math.random().toString(36).substr(2, 16);
        };

        for (let i in obj) {
            console.log('>>>>>>>>>>>>>> ', typeof (obj[i]));
            if (typeof (obj[i]) == 'object') {
                console.log('here', obj[i]);
                let base64Img = loadCanvasWithInputFile(obj[i]);
                arr.push({
                    name: uniqueId(),
                    image: base64Img
                });
                console.log('base64Img', base64Img);
            };
        };
        console.log('array', arr);

        addNewJob({
            model: document.getElementById('jobs-model').value,
            dateCreated: Date(),
            owner: document.getElementById('jobs-owner').value,
            description: document.getElementById('jobs-description').value,
            files: arr
        });
        jobsDisplay();
    };
    document.getElementById('content').innerHTML = `
    <div id="jobs-form" >

        <input type="text" value="" id="jobs-model" name="add-first-name" required placeholder="Model">
        <input type="text" value="" id="jobs-owner" name="add-phone" required placeholder="Owner">
        <input type="text" value="" id="jobs-description" name="add-email" required placeholder="Description">
        <input type="file" id="jobs-image" name="upload" multiple>

        <div id="jobs-form-btns">
            <div id="jobs-form-back-btn">Back</div>
        </div>
    </div>
    `;
    document.getElementById('jobs-form-btns').appendChild(button);


    document.getElementById('jobs-form-back-btn').addEventListener('click', jobsDisplay);
};

function addNewJob(job) {
    // var formData = new FormData();
    // for (var name in job) {
    //     formData.set(name, job[name]);
    // };
    // console.log(formData);

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


// FRONT END ============================
function loadCanvasWithInputFile(files) {
    // canvas
    var canvas = document.createElement('canvas');
    var context = canvas.getContext("2d");
    var img = new Image();
    img.crossOrigin = 'Anonymous';

    // fileinput.onchange = function (evt) {
    var file = files;
    console.log('FILE', file);
    if (file.type.match('image.*')) {
        var reader = new FileReader();
        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
        reader.onload = function (evt) {
            if (evt.target.readyState == FileReader.DONE) {
                img.src = evt.target.result;
                context.drawImage(img, 800, 600);
            };
        };

        var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
        // data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...9oADAMBAAIRAxEAPwD/AD/6AP/Z"
        var mediumQuality = canvas.toDataURL('image/jpeg', 0.5);
        var lowQuality = canvas.toDataURL('image/jpeg', 0.1);

        console.log('mediumquality', mediumQuality);
        return mediumQuality;
    } else {
        console.log('not an image');

    }
    //};
}