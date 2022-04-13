let employees=[];
let employeesList =[];
let activeEmployee;
const main = document.querySelector('main');
const employeesGrid = document.getElementById('employees-grid');
const searchDiv = document.getElementById('search');
let searchInput = document.getElementById('employee-search');
const label = document.querySelector('label');
const dataList = document.getElementById('names');
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
          <div class="employee" data-index="${index}">
          <div class="image"> <img src="${image}"> </div>
          <div class="details">
          <h2 class="name"> ${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="city">${city}</p>
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
  //DATALIST CLICK EVENT FUNCTION
  //------------------------------
 

  const clickDataList = (event) => {
    let option = event.target;
        if(option.tagName === "OPTION") {
        searchInput.value = option.value;
        dataList.style.display = 'none';
        label.classList.add('input-active');
        
        
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
  };

  //--------------------------
  //FOCUS EVENT FUNCTION
  //---------------------------
 
  
  const searchInputFocus = (event) => {
    const names = document.querySelectorAll('h2.name');
   
    dataList.style.display = 'block';
  
    dataList.addEventListener("click", clickDataList);

    
    searchInput.onblur = function () {

        if ( dataList.style.display === "block" && main.classList.contains("main-search")) {
            label.classList.remove('input-active');
            dataList.style.display = "none";
            main.classList.remove("main-search");
            employeesGrid.id ="employees-grid";
            
            let boxsDetails = document.querySelectorAll(".details");
            boxsDetails.forEach(detailBox => {
                const boxParent = detailBox.parentElement; //EMPLOYEE DIV
                  boxParent.style.display = "flex";
                  boxParent.classList.remove('employeeData');
               });

            
        }

       
        
      
    }
   

  }; 

  //--------------------------
  //KEYUP EVENT  FUNCTION
  //---------------------------
 

const searchInputKeyUp = (event) => {
    searchInput = event.target.value.toLowerCase();
    const names = document.querySelectorAll('.details .name');
    const opBoxs = document.querySelectorAll("option");
  
        names.forEach(name => {
            const textName = name.textContent.toLowerCase();
            const nameBox = name.closest('.employee');
        
            if(textName.includes(searchInput)) {
                nameBox.style.display = "flex";
                    } else {
                    nameBox.style.display = "none";
                    }
        });

        opBoxs.forEach(opBox => {
            let parent = opBox;
            let op = opBox.getAttribute("value");
            let opText = op.toLowerCase();

                if (opText.includes(searchInput)){
                    parent.style.display = "block";
                } else {
                    parent.style.display = "none";
                }
        });
         

        dataList.addEventListener("click", clickDataList)
          
        searchInput.onblur = function () {

            if ( dataList.style.display === "block" && main.classList.contains("main-search")) {
                label.classList.remove('input-active');
                dataList.style.display = "none";
                main.classList.remove("main-search");
                employeesGrid.id ="employees-grid";
                
                let boxsDetails = document.querySelectorAll(".details");
                boxsDetails.forEach(detailBox => {
                    const boxParent = detailBox.parentElement; //EMPLOYEE DIV
                      boxParent.style.display = "flex";
                      boxParent.classList.remove('employeeData');
                   });
    
                
            }
        
        }
    
       
};

 //--------------------------
  //OVERLAY EVENT  FUNCTION
  //---------------------------
 
const modalDisplayOverlayClose = event => {

    if(event.target.id === "modal-close") {
        overlay.classList.remove('activeO');
    }

    

    //LEFT ARROW EVENT
    if(event.target.id === "arrow-left" && activeEmployee > 0) {
       activeEmployee --;
       displayModal(activeEmployee);

       
            
     } 

      //RIGHT ARROW EVENT
    if(event.target.id === "arrow-right" && activeEmployee < employees.length - 1) {
        activeEmployee ++;
        displayModal(activeEmployee);
             
      } 

      if (event.target.id === "arrow-left" && activeEmployee === 0) {
        event.target.style.visibility = "hidden";
      }

    if(event.target.id === "arrow-right" && activeEmployee === employees.length - 1) {
       
        event.target.style.visibility = "hidden";

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
   
    
}

  searchInput.addEventListener('focus', searchInputFocus);
  searchInput.addEventListener('keyup', searchInputKeyUp);

  
  //EMPLOYEESGIRD EVENT LISTENER
  employeesGrid.addEventListener('click', evt => {
        if (evt.target !== employeesGrid){
             const employeeBox = evt.target.closest(".employee");
             const index = employeeBox.getAttribute("data-index");
             displayModal(index);
        }
  });

  

//----------------------------------------------------------
//OVERLAY EVENT LISTENER
//---------------------------------------------------------
overlay.addEventListener('click', modalDisplayOverlayClose);



  
 