let employees =[];
let activeEmployee;
const main = document.querySelector('main');
const employeesGrid = document.getElementById('employees-grid');
const searchDiv = document.getElementById('search');
let searchInput = document.getElementById('employee-search');
const label = document.querySelector('label');
const closeSearch = document.querySelector('#search-close');
const dataList = document.getElementById('data-names');
const overlay = document.getElementById('overlay');
const randomUsersUrl = "https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob &noinfo &nat=gb,us";



fetch(randomUsersUrl)
// .then(response => console.log(response))
.then(res => res.json())
.then(data => data.results)
.then(data => {
  awesomeEmployees(data)
})
.catch(err => console.log(err));


 // --------------------------
 //EMPOLYEE DATA
 // --------------------------

  function awesomeEmployees(employeeData) {
      employees = employeeData;

      let employeeHTML = '';
      let options = '';
       
      employees.forEach((employee,index) =>{
          let name = employee.name;
          let image = employee.picture.large;
          let city = employee.location.city;
          let email = employee.email;
        
          employeeHTML += `
          <div class="employee-container" data-index="${index}">
          <div class="employee">
          <div class="image"> <img src="${image}"> </div>
          <div class="details">
          <h2 class="name"> <span class="firstName">${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="city">${city}</p>
          </div>
          </div>
          </div>
    
          `;
           /**for my generated option elements*/
    //for each value and text of my option elements insert the employee name variables
    options += `<option class="autocomplete-list" value="${name.first} ${name.last}">${name.first} ${name.last}</option>`;
    

});
  
    
      console.log(employees);
  employeesGrid.innerHTML = employeeHTML;
  //populate the datalist with the option elements
  dataList.innerHTML = options;
  }

  //-------------------------------------------------------------
  //SEARCH FUNCTIONALITY AUTO COMPLETE
  //------------------------------------------------------------
  //-------------------------------
  //RESET CLOSE CLICK EVENT FUNCTION
  //------------------------------

  //FOCUS CLOSE EVENT
 const keyUpClose = event => {
           label.classList.remove('input-active');
            dataList.style.display = "none";
            main.classList.remove("main-search");
            employeesGrid.id="employees-grid";
            searchInput.value = " ";
            filterEmployees()
 };
  
  //--------------------------
  //FOCUS EVENT FUNCTION
  //---------------------------
  const focusInput = (event) => {
      dataList.style.display = "block";
      const nameOpts = dataList.querySelectorAll('option');
    //  console.log(nameOpts);
      employeesGrid.id="employees-grid";
      main.classList.remove('main-search');
      let activeOption;


     

     nameOpts.forEach(nameOpt => {
           nameOpt.onclick = () => {
               nameOpt.id= "active";
               activeOption = nameOpt;
               searchInput.value = activeOption.value;
               dataList.style.display = "none";
               label.classList.add('input-active');
               console.log(activeOption);
               filterEmployees();
               employeesGrid.id = 'employeesFound-grid';
               main.classList.add('main-search');

           };
     });
};
            

                
                  
           
        
  //--------------------------
  //FILTER  FUNCTION
  //---------------------------
  
  const  filterEmployees = () => {
    let query = searchInput.value.toLowerCase();
      let optionItems = dataList.querySelectorAll('option');
       // console.log(optionItems);
        const names = document.querySelectorAll('.employee-container');
        // console.log(names);
      
        optionItems.forEach((optionItem, i) => {
            let optionName = optionItem.value.toLowerCase();
            
            if( optionName.includes(query) ) { 
                optionItem.classList.add('optionMatch');
                optionItem.classList.remove('hide');
                names[i].style.display = "initial";
               
            } else {
                optionItem.classList.add('hide');
                optionItem.classList.remove('optionMatch');
                names[i].style.display = 'none';
            }
        });

        closeSearch.addEventListener('click', keyUpClose);
}
            
 //--------------------------
  //OVERLAY EVENT  FUNCTION
  //---------------------------
 
const modalButtons = event => {
//CLOSE OVERLAY
    if(event.target.id === "modal-close") {
        overlay.classList.remove('activeO');
    }

    //LEFT ARROW EVENT
    if(event.target.id === "arrow-left") {
       activeEmployee --;
       displayModal(activeEmployee);
   } 

      //RIGHT ARROW EVENT
    if(event.target.id === "arrow-right") {
            activeEmployee ++;
            displayModal(activeEmployee);
    } 


     //HIDE LEFT & RIGHT ARROW 
      if (activeEmployee === 0) {
              console.log(activeEmployee);
             document.querySelector('#arrow-left').style.visibility = "hidden";
       } else if(activeEmployee === employees.length -1) {
        document.querySelector('#arrow-right').style.visibility = "hidden";
       }
      
};


//---------------------------------------
// MODAL FUNCTION
//----------------------------------------
function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
   
    
    
    
    const modalHTML = `
    <div class="modal">
    <button id="modal-close" class="modal-close">X</button>
    <div class="modal-content">
        <div class="top-content">
            <button id="arrow-left"></button>
        <div class="image-modal"><img src="${picture.large}"/></div>
        <button id="arrow-right"></button>
       
    </div>
      
    <div class="text-container">
    <h2 class="modal-name">${name.first} ${name.last}</h2>
    <p class="modal-email">${email}</p>
    <p class="modal-city">${city}</p>
    <hr id="modal-separator"/>
    <p class="modal-mobile">${phone}</p>
    <p class="modal-address">${street.number} ${street.name}</p>
    <p class="modal-address">${state}</p>
    <p class="modal-address">${postcode}</p>
    <p class="modal-birth">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    </div>
    </div>
    
    </div>
    `;
    
    
    
    activeEmployee = parseInt(index);
    overlay.classList.add("activeO");
    overlay.innerHTML = modalHTML; 
   
    if(activeEmployee === 0) {
         overlay.querySelector('#arrow-left').style.visibility = "hidden";
       
    }
    
}

  
  
  //EMPLOYEESGIRD EVENT LISTENER
  employeesGrid.addEventListener('click', evt => {
        if (evt.target !== employeesGrid){
             const index = evt.target.closest('.employee-container').getAttribute("data-index");
             displayModal(index);
        }
  });

  

//----------------------------------------------------------
//OVERLAY & SEARCH EVENT LISTENERS
//---------------------------------------------------------
overlay.addEventListener('click', modalButtons);
searchInput.addEventListener('focus', focusInput);
searchInput.addEventListener('input', filterEmployees);




  
 