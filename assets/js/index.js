
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

const response = document.getElementById('data');
const data = JSON.parse(response.value);
console.log(data);





function clientsDisplay() {
    console.log('Displaying Clients');
    header = 'Clients';
    document.getElementById('header-p').innerHTML = `${header}`;
    for (let i in data) {
        document.getElementById('root').innerHTML = `
        <div id="content">
        <div id="client-name">${data[i].firstName},${data[i].lastName}</div>     
        </div>
        <div id="add-btn"><i class="icon ion-md-add"></i></div>
        
        `
    }

    document.querySelector('.ion-md-add').addEventListener('click', clientsAdd);
    document.querySelector('#client-name').addEventListener('click', test);

};

function clientsAdd() {
    console.log('Displaying Clients Info');
    let container = document.createElement('div');
    let form = document.createElement('div');
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
    };
    form.innerHTML = `
    <div id="add-form">
    <input type="text" value="" id="add-first-name" name="add-first-name" required placeholder="First Name">
    <input type="text" value="" id="add-last-name" name="add-last-name" required placeholder="Last Name">    
    <input type="text" value="" id="add-phone" name="add-phone" required placeholder="Phone">
    <input type="text" value="" id="add-email" name="add-email" required placeholder="Email">
    <div id="add-form-btns">
    <div id="add-form-back-btn">Back</div>
    </div>
    </div>
    `
    form.appendChild(button);
    container.appendChild(form);
    document.getElementById('root').appendChild(container);

    // document.getElementById('add-form-back-btn').addEventListener('click', clientsDisplay);
};

function addNewClient(client) {
    console.log(client);
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
            console.log('RESPONSE',response);
        })
        .catch(error => console.error(error));
};

function test() {
    console.log(this);
};

function homeDisplay() {
    console.log('Displaying Home');
    header = 'Home';
    document.getElementById('header-p').innerHTML = `${header}`;
    document.getElementById('root').innerHTML = `
    <div id="content"></div>    
    `
};

function jobsDisplay() {
    console.log('Displaying Jobs');
    header = 'Jobs';
    document.getElementById('header-p').innerHTML = `${header}`;
    document.getElementById('root').innerHTML = `
    <div id="content"></div>    
    `
};


