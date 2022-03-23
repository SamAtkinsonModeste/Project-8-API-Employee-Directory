let employees=[];
let employeesList =[];
const employeesGrid = document.getElementById('employees-grid');
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
  /*
  It seems as though I can't access the innerText of the elements on the page.
  So going by the study guide work out a function using the displayEmployees function
  as a templete
  Watch https://teamtreehouse.com/library/displaying-the-content
  */

  
  const searchInput = document.getElementById('employee-search');
  

  const detailDivs = document.querySelectorAll('div.detail');

  

// const handleSearch = event => {
//   const searchTerm = event.target.value.toLowerCase();
  
//   detailDivs.forEach(detailDiv => {
//     const text = detailDiv.textContent.toLowerCase();
//     const box = detailDiv.parentElement;
//     console.log(box);
    
//     if(text.includes(searchTerm)) {
//       box.style.display = "block";
//     } else {
//       box.style.display = "none";  
//     }
//   });
   
// }




  

searchInput.addEventListener('click', (evt) =>{
  const names = document.querySelectorAll('h2.name');
  const images = document.querySelectorAll('.image');
  console.log(names, images);
  const searchDiv =  document.getElementById('search');
  const dataList = document.getElementById('names');
    names.forEach(name => {
      // console.log(name);
     
      let options = `<option value="${name.innerText}">${name.innerText}</option>`;
     console.log(options);
     
     console.log(name);
     dataList.innerHTML = options;
    
    });

  
 
});

// names.forEach( name=> {
//   name = name.textContent;
//   let options = `<option>${name}</option>`;
//   dataList.appendChild(options);

// });
