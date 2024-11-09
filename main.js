let now = new Date();
let birthDay= new Date();
let myButton = document.querySelector("button");
let day = document.getElementById("inDay");
let month = document.getElementById("inMonth");
let year = document.getElementById("inYear");
let daysOfMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
/* better way for filed
year.setAttribute("min", 1);
year.setAttribute("max", now.getFullYear());
month.setAttribute("min", "1");
month.setAttribute("max", "12");
day.setAttribute("min", "1");
day.setAttribute("max", "31");
// */

myButton.onclick = ()=>{  
  validField(year);
  validField(month);
  validField(day);
  
  let isYearValid = validation(year, now);
  let isMonthValid = validation(month, 12);
  let isDayValid = validation(day, daysOfMonths[month.value-1] || 31);

  if ( isYearValid && isMonthValid && isDayValid){
    birthDay = new Date(year.value, month.value - 1, day.value);
    let age = now - birthDay;
    let years = age/1000/60/60/24/365;
    let months = (years - parseInt(years)) * 12;
    let days = (months - parseInt(months)) * 30;
    counter(document.getElementById("yearsNo"), parseInt(years));
    counter(document.getElementById("monthsNo"), parseInt(months));
    counter(document.getElementById("daysNo"), parseInt(days));
  }
};

// validation
// i use this long way to check while the user input and when he Click
function validation(field, biggerThan, smallerThan = 1, wrongEnterMsg = "Please Enter Valid Value", emptyMsg = "Filed is Required"){
  let valid = false;
  valid = validationMethods(field, biggerThan, smallerThan, wrongEnterMsg, emptyMsg);
  field.onblur = ()=>validationMethods(field, biggerThan, smallerThan, wrongEnterMsg, emptyMsg);
  return valid;
}
function validationMethods(field, biggerThan, smallerThan, wrongEnterMsg, emptyMsg){
  if(field.value =="") 
    notValidField(field, emptyMsg);  
  else if(field.value>biggerThan || field.value<smallerThan)
    notValidField(field, wrongEnterMsg);
  else {
    validField(field);
    return true;
  }
  return false;
}


function notValidField(field, msg){
  let parents = document.querySelector(`.${field.getAttribute("id")} p`);

  // color the filed
  parents.classList.add("not-valid-color");
  field.classList.add("not-valid-boarder");
  document.querySelector(`.${field.getAttribute("id")} label`).classList.add("not-valid-color");
  
  // create the element and appended
  let mySpan = document.createElement("span");
  mySpan.appendChild(document.createTextNode(msg));
  parents.appendChild(mySpan);
  field.onfocus = ()=>{
    validField(field);
  }
}
function validField(field){
  let parents = document.querySelector(`.${field.getAttribute("id")} p`);
  parents.classList.remove("not-valid-color");
  field.classList.remove("not-valid-boarder");
  document.querySelector(`.${field.getAttribute("id")} label`).classList.remove("not-valid-color");
  parents.innerHTML = "";
}

// counter

function counter(element, finish){
  let counter=0;
  element.innerText = counter;
  let timer = setInterval(()=>{
    element.innerText++;
    if(element.innerText==finish) clearInterval(timer);
  }, 60)
}