let employees=[];
let employeesList =[];
let matchedOptions= [];
let matchedNames = [];
let noMatchNames = [];
let dataOptions;
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
          <div class="employee" data-index="${index}">
          <div class="image"> <img src="${image}"> </div>
          <div class="details">
          <h2 class="name"> <span class="firstName">${name.first} ${name.last}</h2>
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
  //RESET CLOSE CLICK EVENT FUNCTION
  //------------------------------

  //FOCUS CLOSE EVENT
 const focusClose = event => {
    label.classList.remove('input-active');
            dataList.style.display = "none";
            main.classList.remove("main-search");
            employeesGrid.id ="employees-grid";
            searchInput.value = " ";
            
            let boxsDetails = employeesGrid.querySelectorAll('.employee');
            // console.log(boxsDetails);
            boxsDetails.forEach(detailBox => {
                let boxChild = detailBox; //EMPLOYEE DIV
                if (boxChild.classList.contains("employeeData")) {
                    boxChild.classList.remove('employeeData');
                } 
                
                if(boxChild.style.display === "none") {
                    boxChild.style.display = "flex";
                }
            
                //   console.log(boxChild);
               });

 };


 //KEYUP CLOSE EVENT
 const keyUpClose = (event) =>  {
    const emptyArrays = arr => arr.length = 0;
    const keyUpEmployees = employeesGrid.querySelectorAll('.employee');
    const names = document.querySelectorAll('.details .firstName');
    let optionItems = dataList.querySelectorAll('option');

    console.log(names, optionItems, keyUpEmployees, matchedOptions, matchedNames);
    main.classList.remove('main-search');
    searchInput.value = " ";
    label.classList.remove('input-active');
    employeesGrid.id ="employees-grid";
    emptyArrays(matchedOptions);
    emptyArrays(matchedNames);
    emptyArrays(noMatchNames);
    console.log(matchedOptions);
    console.log(matchedNames);
    optionItems.forEach(optionItem => {
        optionItem.classList.remove('hide', 'optionMatch');
        optionItem.removeAttribute('id');
            console.log(optionItem);

        
        
    });

    keyUpEmployees.forEach(employee => {
        employee.classList.remove('employeeData');
        employee.style.display = "flex";
    });
    

};




  
  //--------------------------
  //FOCUS EVENT FUNCTION
  //---------------------------
  const focusInput = (event) => {
      dataList.style.display = "block";
     const nameOpts = dataList.querySelectorAll('option');
    //  console.log(nameOpts);
     let activeOption;


     

     nameOpts.forEach(nameOpt => {
           nameOpt.onclick = () => {
               nameOpt.id= "active";
               activeOption = nameOpt;
               searchInput.value = activeOption.value;
               dataList.style.display = "none";
               label.classList.add('input-active');
               console.log(activeOption);
            const detailBoxs = employeesGrid.querySelectorAll('.employee .name');

                
                    detailBoxs.forEach(name => {
                        const textName = name.textContent;
                        const textNameParent = name.closest('.employee');

                                if (textName.includes(activeOption.value)) {
                                    console.log(textName);
                                    console.log(textNameParent);
                                    textNameParent.style.display = "flex";
                                    textNameParent.classList.add('employeeData');
                                    main.classList.add('main-search');
                                    employeesGrid.id ="grid-search";
                                    activeOption.removeAttribute('id');
                                    console.log(activeOption);
                                            
                                } else {
                                    textNameParent.style.display = "none";
                                }
                        
                    });
           
        } 

           
     });

     
        closeSearch.addEventListener('click', focusClose);
            
  };
  
  

  //--------------------------
  //KEYUP EVENT  FUNCTION
  //---------------------------
  
  const  searchInputKeyUp = (event) => {
    // dataList.style.display = "block";
    let text = searchInput.value.toLowerCase();
      let optionItems = dataList.querySelectorAll('option');
       // console.log(optionItems);
        const names = document.querySelectorAll('.details .firstName');
        // console.log(names);

        optionItems.forEach(optionItem => {
           
            let optionName = optionItem.value.toLowerCase();
            let optionBox = optionItem.closest('.autocomplete-list');
             
            if( optionName.startsWith(text) ) { 
                optionBox.classList.add('optionMatch');
                matchedOptions.push(optionBox);
                console.log(matchedOptions);
               
            } else {
                optionBox.classList.add('hide');
            }
        });
   
            names.forEach(name => {
                const displayName = name;
                 const textName = name.textContent.toLowerCase();
                // console.log(textName);
                const nameBox = name.closest('.employee');

                if(textName.startsWith(text)) {
                    nameBox.style.display = "flex"; 
                    matchedNames.push(displayName);
                   
                    
                } else {
                    noMatchNames.push(nameBox);
                   
                }

                console.log(nameBox);
            });

            console.log(matchedNames);
            console.log(matchedOptions);
            console.log(noMatchNames);
               matchedOptions.forEach(matchedOption => {
                   matchedOption.onclick = (evt) => {
                       let chosen = evt.target;
                        chosen = matchedOption;
                        chosen.id = "active";
                        searchInput.value = chosen.value;
                        dataList.style.display = "none";
                        label.classList.add('input-active');
                       console.log(chosen);
                       console.log(matchedNames);


                       matchedNames.forEach(matchedName => {
                             let chosenName = matchedName;
                             let chosenParent = matchedName.parentElement.closest('.employee');
                             
                             console.log(chosenName);
                             console.log(chosenParent);
                             if (chosenName.textContent === chosen.value) {
                                 console.log(chosenName);
                                 console.log(chosenParent);
                                 chosenParent.style.display = "flex";
                                 chosenParent.classList.add('employeeData');
                                 main.classList.add('main-search');
                                 employeesGrid.id ="grid-search";
                             } else {
                                   chosenParent.style.display = "none";
                             }
                    });
                     
                   }
               });

              
               noMatchNames.forEach(noMatch => {
                   noMatch.style.display = "none";
               });
            closeSearch.addEventListener('click', keyUpClose);
            
 
 
}; 



            
           
           
         






 //--------------------------
  //OVERLAY EVENT  FUNCTION
  //---------------------------
 
const modalDisplayOverlayClose = event => {
//CLOSE OVERLAY
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


     //HIDE LEFT ARROW 
      if (event.target.id === "arrow-left" && activeEmployee === 0) {
             event.target.style.visibility = "hidden";
       }
       //HIDE RIGHT ARROW 
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

  
  
  //EMPLOYEESGIRD EVENT LISTENER
  employeesGrid.addEventListener('click', evt => {
        if (evt.target !== employeesGrid){
             const employeeBox = evt.target.closest(".employee");
             const index = employeeBox.getAttribute("data-index");
             displayModal(index);
        }
  });

  

//----------------------------------------------------------
//OVERLAY & SEARCH EVENT LISTENERS
//---------------------------------------------------------
overlay.addEventListener('click', modalDisplayOverlayClose);
searchInput.addEventListener('focus', focusInput);
searchInput.addEventListener('keyup', searchInputKeyUp);




  
 