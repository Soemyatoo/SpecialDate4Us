import { foodData, drinkDate } from './product.js';
import { cart, ForDrinkCart } from './cart.js';

const buttonYes = document.querySelector('.yes-btn');
const buttonNo = document.querySelector('.no-btn');

buttonNo.addEventListener("mouseover", () => {
  const noBtn = buttonNo.getBoundingClientRect();
  const maxX = window.innerWidth - noBtn.width;
  const maxY = window.innerHeight - noBtn.height;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  buttonNo.style.left = randomX + "px";
  buttonNo.style.top = randomY + "px";
});

buttonYes.addEventListener('click', () => {
  document.querySelector('.js-container').innerHTML = `
    <div class="innerContainer">
      <div class="happyImg">
        <img src="happyCute.gif" class="aptGIF">
      </div>
      <p>Yay! I'm so happy! 🥳💖</p>
      <p>I knew you wanted to go out with me! 😄💖</p>
    </div>
  `;

  setTimeout(() => {
    showFoodPage();
  }, 3000);
});

//Food page//
function showFoodPage() {
  document.body.innerHTML = `<div class="MotherContainer"></div>`;
  const motherContainer = document.querySelector('.MotherContainer');

  let foodGenHTML = `
    <div class="title">
      <h2>Pick your favorite dish for our date! 🍔🥗</h2>
    </div>
    <div class="mealContainer">
  `;

  let spansHTML = `<div class="con-food">`;

  foodData.forEach((product) => {
    foodGenHTML += `<img src="${product.img}" class="meal chooseImg" data-id="${product.id}">`;
    spansHTML += `<span class="hide hide-${product.id}">Yummy choice! 💖 (${product.name})</span>`;
  });

  foodGenHTML += `</div>${spansHTML}</div>
    <div class="drinkBtn">
      <button class="wth forDrinkBtn">Let's Pick a Drink! 💖</button>
    </div>`;

  motherContainer.innerHTML = foodGenHTML;
  
//main point//
  document.querySelectorAll(".chooseImg").forEach((link) => {
    link.addEventListener('click', () => {
      const id = link.dataset.id;
      //Main Point is this//
      console.log(id)
      const selected = foodData.find(item => item.id === id);
      if (cart.length < 5 && !cart.find(item => item.id === id)) {
        cart.push(selected);
        document.querySelector(`.hide-${id}`).classList.add('show');
      }
      console.log(cart)
    });
  });

  document.querySelector('.forDrinkBtn').addEventListener('click', showDrinkPage);
}
//drink Page//
function showDrinkPage() {
  let drinkHTML = `
    <div class="title">
      <h2>A perfect date needs a perfect drink — pick yours! 🍷💖</h2>
    </div>
    <div class="mealContainer">
  `;

  let spansHTML = `<div class="con-food">`;

  drinkDate.forEach((drink) => {
    drinkHTML += `<img src="${drink.img}" class="meal chooseDrink" data-id="${drink.id}">`;
    spansHTML += `<span class="hide hide-${drink.id}">Yummy choice! 💖 (${drink.name})</span>`;
  });

  drinkHTML += `</div>${spansHTML}</div>
    <div class="drinkBtn">
      <button class="wth forDateBtn">I can't wait! Choose when we’ll meet! 💖🗓️</button>
    </div>`;

  document.querySelector('.MotherContainer').innerHTML = drinkHTML;

  document.querySelectorAll('.chooseDrink').forEach((link) => {
    link.addEventListener('click', () => {
      const id = link.dataset.id;
      const selected = drinkDate.find(item => item.id === id);
      if (ForDrinkCart.length < 5 && !ForDrinkCart.find(item => item.id === id)) {
        ForDrinkCart.push(selected);
        document.querySelector(`.hide-${id}`).classList.add('show');
      }
    });
  });

  document.querySelector('.forDateBtn').addEventListener('click', showCalendarPage);
}
//calendear Page
function showCalendarPage() {
  const motherContainer = document.querySelector('.MotherContainer');

  let summaryHTML = `
    <div class="title">
      <h2>Your delicious picks for our date! 💕</h2>
    </div>
    <div class="twoDishContainer" style="display: flex; align-items: center; gap: 10px;">
  `;
//main//
  cart.forEach((food, index) => {
    summaryHTML += `<img src="${food.img}" class="meal">`;
    if (index < cart.length - 1 || ForDrinkCart.length > 0) {
      summaryHTML += `<span class="plusIcon">+</span>`;
    }
  });

  ForDrinkCart.forEach((drink, index) => {
    summaryHTML += `<img src="${drink.img}" class="meal">`;
    if (index < ForDrinkCart.length - 1) {
      summaryHTML += `<span class="plusIcon">+</span>`;
    }
  });

  summaryHTML += `
    </div>
    <div class="title adjust">
      <h2>Choose a day for our date! 🗓️</h2>
      
    </div>
    
   <div class="calendarSectionContainer">
    <div>
     <div class="calendarSection">
      <input type="date" id="datePicker">
     </div>

     <div class="calendarSection">
      <button id="confirmDateBtn" class="wth">Confirm Date 💖</button>
     </div>
    </div>
   </div>
    
  `;

  motherContainer.innerHTML = summaryHTML;

  document.getElementById('confirmDateBtn').addEventListener('click', () => {
    const selectedDate = document.getElementById('datePicker').value;
    if (selectedDate) {
      document.querySelector('.MotherContainer').innerHTML = `
      <div class="title">
       <h2>See you on <span style="color: #ff859b;">${selectedDate}</span>! 😘</h2>
      </div>
       
        <div class="couple">
         <img src="output-onlinegiftools.gif" class="aptGIF">
        </div>
        <h2 class="title aj">How excited are you?🥰</h2> 
        <div class="rating-container">
    <div class="rating-row">
      <div class="rating-button" data-value="1"></div>
      <div class="rating-button" data-value="2"></div>
      <div class="rating-button" data-value="3"></div>
      <div class="rating-button" data-value="4"></div>
      <div class="rating-button" data-value="5"></div>
    </div>
    <p id="rating-result" class="rating-text"></p>
  </div>
        `;
        const buttons = document.querySelectorAll('.rating-button');
const result = document.getElementById('rating-result');

buttons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    buttons.forEach((b, i) => {
      b.classList.toggle('selected', i <= index);
    });
    result.textContent = `Yay! You gave a rating of ${index + 1} / 5🎉 `;
  });
});

    } else {
      alert('Please select a date first! 💡');
    }
  });
}
