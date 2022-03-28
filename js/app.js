let employees=[];
let employeesList =[];
const main = document.querySelector('main');
const employeesGrid = document.getElementById('employees-grid');
const searchDiv = document.getElementById('search');
const searchInput = document.getElementById('employee-search');
const label = document.querySelector('label');
const dataList = document.getElementById('names');
const overlay = document.getElementById('overlay');
const randomUsersUrl = "https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob &noinfo &nat=gb,us";



fetchData(randomUsersUrl)
// .then(response => console.log(response))
.then(checkStatus)
.then(parseJSON)
.then(data => data.results)
.then(data => {
  awesomeEmployees(data)
})
.catch(printError)
//-------------------------------
//FETCH FUNCTIONS
//-------------------------------

function fetchData(url) {
    return fetch(url);
}

function checkStatus(response) {
  if (response.ok) {
      return Promise.resolve(response);
  } else {
      return Promise.reject(new Error(response.error));
  }
}

function parseJSON(response) {
    return response.json();
  }


  function printError(error) {
      error = "Oops something went wrong!";
      return console.log(error);
  }


 // --------------------------
 //EMPOLYEE DATA
 // --------------------------

  function awesomeEmployees(employeeData) {
      employees = employeeData;

      let employeeHTML = '';

      employees.forEach((employee,index) =>{
          let name = employee.name;
          let image = employee.picture.large;
          let city = employee.location.city;
          let email = employee.email;

          employeeHTML += `
          <div class="employee" data-index="${index}">
          <div class="image"> <img src="${image}"> </div>
          <div class="details">
          <h2 class="name"> ${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="city">${city}</p>
          </div>
          </div>
          `
      });
      console.log(employees);
      employeesGrid.innerHTML = employeeHTML;

  }

  //-------------------------------------------------------------
  //SEARCH FUNCTIONALITY AUTO COMPLETE
  //------------------------------------------------------------
  const searchInputFocus = (event) => {
    const names = document.querySelectorAll('h2.name');
    let options = [];/**for my option elements*/

    //loop through each name in the h2 and insert into option elements
    names.forEach(name => {
      name = `<option class="autocomplete-list" value="${name.innerText}">${name.innerText}</option>`;
      options.push(name); 
    });
//populate the datalist with the option elements
    dataList.innerHTML = options.join('');
    dataList.style.display = 'block';
    if (dataList.style.display === 'block') {
      label.classList.add('input-active');
     } else {
      dataList.style.display = 'none';
     label.classList.remove('input-active');


}

        console.log(dataList);
        console.log(options);
        dataList.onclick = function (evt) {
          let option = evt.target;
                if(option.tagName === "OPTION") {
                  searchInput.value = option.value;
                  dataList.style.display = 'none';
                 
                  const detailBoxs = document.querySelectorAll('.details');
                 console.log(detailBoxs);
               detailBoxs.forEach(detailBox => {
                const textBox = detailBox.textContent;
                const boxParent = detailBox.parentElement;

                if(textBox.includes(option.value)){
                  boxParent.style.display = "flex";
                  boxParent.classList.add('employeeData');
                  // boxParent.style.margin = "auto";
                  main.classList.add('main-search');
                  employeesGrid.id ="grid-search";
                  
                 
                } else {
                 boxParent.style.display = "none";
                }
               });
              }
      
        }
        searchInput.value = " ";
        if( searchInput.value === " ") {
           main.classList.remove('main-search');
           employeesGrid.id ="employees-grid";
          
          let  detailBoxs = document.querySelectorAll('.details');
             console.log(detailBoxs);
             detailBoxs.forEach(detailBox => {
               const boxParent = detailBox.parentElement;
               if (boxParent.classList.contains('employeeData')){
                      boxParent.classList.remove('employeeData');
               }
                if (boxParent.style.display === "none") {
                  boxParent.style.display = "flex";
                  dataList.style.display = "none";
                  label.classList.remove('input-active');                
                }
             });
             
               
      }
     
  };  

 

searchInput.addEventListener('focus', searchInputFocus);



