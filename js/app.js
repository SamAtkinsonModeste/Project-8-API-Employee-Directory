let employees=[];
let employeesList =[];
const main = document.querySelector('main');
const employeesGrid = document.getElementById('employees-grid');
const searchDiv = document.getElementById('search');
let searchInput = document.getElementById('employee-search');
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
  //--------------------------
  //FOCUS FUNCTION
  //---------------------------
 
  
  const searchInputFocus = (event) => {
    const names = document.querySelectorAll('h2.name');
    let options = [];/**for my generated option elements*/

    //loop through each name in the h2 and insert into option elements
    names.forEach(name => {
      name = `<option class="autocomplete-list" value="${name.innerText}">${name.innerText}</option>`;
      
      options.push(name);;
    
    });
//populate the datalist with the option elements
    dataList.innerHTML = options.join('');
    dataList.style.display = 'block';
  
    
   
//make sure my label stays out of the input    
    if (dataList.style.display === 'block') {
      label.classList.add('input-active');
     } else {
      dataList.style.display = 'none';
     label.classList.remove('input-active');


}



        console.log(dataList);
        console.log(options);
//function for clicking the option buttons and displaying the employee
        dataList.addEventListener('click', (evt)=> {
          let option = evt.target;
                if(option.tagName === "OPTION") {
                  searchInput.value = option.value;
                  dataList.style.display = 'none';
                 
                  const detailBoxs = document.querySelectorAll('.details');
                //  console.log(detailBoxs);
               detailBoxs.forEach(detailBox => {
                const textBox = detailBox.textContent;
                const boxParent = detailBox.parentElement; //EMPLOYEE DIV

                if(textBox.includes(option.value)){
                  boxParent.style.display = "flex";
                  boxParent.classList.add('employeeData');
                  main.classList.add('main-search');
                  employeesGrid.id ="grid-search";
                  
                 
                } else {
                 boxParent.style.display = "none";
                }
               });
              }
      
        });
  }; 
  
  

  //--------------------------
  //KEYUP FUNCTION
  //---------------------------
 

const searchInputKeyUp = (event) => {
 const optionItems = dataList.querySelectorAll('option');
 console.log(optionItems);
 searchInput = event.target.value.toLowerCase();
 const names = document.querySelectorAll('.details');
console.log(searchInput);
 console.log(names);


 names.forEach(name => {
   const textName = name.textContent.toLowerCase();
   const nameBox = name.parentElement;

      if(textName.includes(searchInput)) {
        nameBox.style.display = "flex";
        nameBox.classList.add('employeeData');
        main.classList.add('main-search');
        employeesGrid.id ="grid-search";
        //controlling the datalist options
        if(dataList.style.display === "block") {
          optionItems.forEach(option => {
            let parent = option;
            let op = option.getAttribute('value');
            op = op.toLowerCase();
            console.log(op);
            // let opParent = op.innerHTML;
            console.log(parent);
           
            if (op.includes(searchInput)) {
              parent.style.display = "block";
             
              
            } else {
              parent.style.display = "none";
            }
            
                  
            
          });

        }
      } else {
        nameBox.style.display = "none";
       
      }
 });

 dataList.addEventListener('click', (evt)=> {
  let theOne = evt.target;
  console.log(theOne);
  if(theOne.tagName === "OPTION") {
    theOne = theOne.innerText;
  searchInput.value = theOne;
  console.log(searchInput);
   dataList.style.display = 'none';
   
  }
   
 });  


  
};

 //--------------------------
  //CHANGE FUNCTION EVENT
  //---------------------------
 
  const searchInputChange = (event) => {
    searchInput.value = " ";
        
    if( searchInput.value === " ") {
       main.classList.remove('main-search');
       employeesGrid.id ="employees-grid";
      
      let  detailBoxs = document.querySelectorAll('.details');
        //  console.log(detailBoxs);
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

  }

  

 


searchInput.addEventListener('keyup', searchInputKeyUp); 
searchInput.addEventListener('focus', searchInputFocus);
// searchInput.addEventListener('change', searchInputChange);






