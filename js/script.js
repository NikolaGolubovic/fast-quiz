const questions = {
   "Glavni grad Italije": [{ "Pariz": false }, { "Rim": true }, { "London": false }, { "Madrid": false }],
   "Koje godine je bila Kosovska bitka": [{ "1389": true }, { "1422": false }, { "1371": false }, { "1400": false }],
   "Koja je najbliza planeta Suncu?": [{ "Venera": false }, { "Jupiter": false }, { "Merkur": true }, { "Mars": false }],
   "Koje godine je Hitler dosao na vlast?": [{ "1930": false }, { "1928": false }, { "1933": true }, { "1935": true }],
   "Koje po zapremini vode najvece slatkovodno jezero na svetu?": [{ "Bajkalsko": true }, { "Superior": false }, { "Tanganjika": false }, { "Kaspijsko": false }],
   "Koji je bio Staljinov maternji jezik?": [{ "Ruski": false }, { "Poljski": false }, { "Gruzijski": true }, { "Tatarski": false }],
   "U kojoj zemlji je rodjen Hitler?": [{ "Ceska": false }, { "Svajcarska": false }, { "Nemacka": false }, { "Austrija": true }],
   "Koje rase je bila Lajka, prvi pas u svemiru?": [{ "Dalmatinac": false }, { "Ruski Hrt": false }, { "Mesanac": true }, { "Labrador": false }],
   "Glavni grad Sirije je?": [{ "Damask": true }, { "Rijad": false }, { "Teheran": false }, { "Bagdad": false }],
   "Glavnu ulogu u filmu Glupan i Tupan je igrao?": [{ "Carli Sin": false }, { "Edi Marfi": false }, { "Dzon Noa": false }, { "Dzef Daniels": true }]
};
quiz();
function quiz() {
   const numberOfQuestions = 5;
   const randQuest = randomQuestions();
   createStructure();
   const buttons = document.querySelectorAll("button");
   let score = 0;
   let time;
   const timerBar = document.querySelectorAll(".timer-bar");
   let timerBarWidthFixed = timerBar[0].clientWidth;
   // p is used for time pulse
   const timeLength = 6;
   let p = timeLength;
   let timerBarWidth = timerBarWidthFixed;
   let pulse = timerBarWidthFixed / (p - 1);
   let start = true;


   activeBox();

   // time to give correct answer
   function timer() {
      if (time) {
         clearInterval(time);
      }
      time = setInterval(() => {
         // escape first box aditional turn
         if (start && p < 2) {
            p = 0;
            start = !start;
         }
         timerBarWidth = timerBarWidth - pulse;
         timerBar.forEach(timer => {
            if (timerBarWidth < 0) {
               timer.style.width = "0px";
            }
            timer.style.width = timerBarWidth + "px";
         });
         if (!pulse) {
            pulse = timerBarWidth / (timeLength - 1);
         }
         if (p <= 0) {
            for (let i = 0; i < buttons.length; i++) {
               var currentButton = buttons[i].parentNode.parentNode.parentNode;
               var nextButton = buttons[i].parentNode.parentNode.parentNode.nextSibling;
               var currentWidth = buttons[i].parentElement.nextElementSibling.clientWidth;
               if (!nextButton) {
                  clearInterval(time);
                  scorePage();
               } else if (currentButton.classList.contains("active")) {
                  currentButton.classList.remove("active");
                  nextButton.classList.add("active");
                  p = timeLength;
                  timerBarWidth = currentWidth;
                  pulse = timerBarWidth / (timeLength - 1);
                  timerBar.forEach(timer => {
                     timer.style.width = timerBarWidth + "px";
                  });
                  break;
               }
            }
         }
         console.log(p--);
      }, 1000);
   }

   // random questions from questions obj
   function randomQuestions() {
      const randomArr = [];
      const randomQ = [];
      const arrQ = Object.entries(questions);
      outer:
      for (let i = 0; i < numberOfQuestions;) {
         const num = Math.floor(Math.random() * arrQ.length);
         if (randomArr.length === 0) {
            randomArr.push(num);
            i++;
         } else {
            for (let j = 0; j < randomArr.length; j++) {
               if (randomArr[j] === num) {
                  continue outer;
               }
            }
            randomArr.push(num);
            i++;
         }
      };
      // five random elements from arrQ
      for (let i = 0; i < randomArr.length; i++) {
         randomQ.push(arrQ[randomArr[i]])
      };
      return randomQ;
   };



   function createStructure() {
      const frame = document.querySelector(".quiz-frame");
      for (var i = 0; i < randQuest.length; i++) {
         const box = document.createElement("div");
         const boxLayout = document.createElement("div");
         const questionTop = document.createElement("div");
         const buttonsBottom = document.createElement("div");
         const question = document.createElement("h1");
         const button1 = document.createElement("button");
         const button2 = document.createElement("button");
         const button3 = document.createElement("button");
         const button4 = document.createElement("button");
         const buttonsArr = [button1, button2, button3, button4];
         const timerContainer = document.createElement("div");
         const timerBar = document.createElement("div");

         box.className = "box";
         boxLayout.className = "layout-box";
         questionTop.classList.add("question-top");
         buttonsBottom.classList.add("buttons-part");
         question.textContent = randQuest[i][0];
         for (var j = 0; j < buttonsArr.length; j++) {
            buttonsArr[j].textContent = Object.keys(randQuest[i][1][j]);
         }
         timerContainer.classList.add("timer-container");
         timerBar.classList.add("timer-bar");

         questionTop.appendChild(question);
         for (var j = 0; j < buttonsArr.length; j++) {
            buttonsBottom.appendChild(buttonsArr[j]);
         }
         boxLayout.appendChild(questionTop);
         boxLayout.appendChild(buttonsBottom);
         timerContainer.appendChild(timerBar);
         boxLayout.appendChild(timerContainer);
         box.appendChild(boxLayout);
         frame.appendChild(box);
      };
   }

   // create first page
   function activeBox() {
      for (let i = 0; i < 1; i++) {
         buttons[0].parentNode.parentNode.parentNode.classList.add("active");
      }
      timer();
   }

   function scorePage() {
      const frame = document.querySelector(".quiz-frame");
      const box = document.createElement("div");
      const h3 = document.createElement("h3");
      const playAgain = document.createElement("a");
      box.classList.add("score-page");
      h3.textContent = "You correctly answer " + score + " questions.";
      playAgain.classList.add("play-again");
      playAgain.textContent = "Play again";
      playAgain.setAttribute("href", "http://127.0.0.1:5500/")
      box.appendChild(h3);
      box.appendChild(playAgain);
      frame.appendChild(box);
   }

   buttons.forEach(button => button.addEventListener("click", function () {
      this.parentNode.parentNode.parentNode.classList.remove("active");
      if (this.parentNode.parentNode.parentNode.nextSibling) {
         let nextBar = this.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[2];
         let currentWidth = this.parentElement.nextElementSibling.clientWidth;
         timerBarWidthFixed = currentWidth;
         nextBar.style.width = timerBarWidthFixed + "px";
         nextBar.children[0].style.width = timerBarWidthFixed + "px";
         p = timeLength;
         pulse = timerBarWidthFixed / (p - 1);
         timerBarWidth = timerBarWidthFixed;
         this.parentNode.parentNode.parentNode.nextSibling.classList.add("active");
      };
      // checking if answer is true
      const key = this.parentNode.previousSibling.children[0].textContent;
      const solutions = questions[key];
      const tryAnswer = this.textContent;
      for (var i = 0; i < solutions.length; i++) {
         if (solutions[i][tryAnswer]) {
            score++;
         }
      }
      if (!this.parentNode.parentNode.parentNode.nextSibling) {
         this.parentNode.parentNode.parentNode.style.display = "none";
         scorePage();
         clearInterval(time);
         return;
      }
      timer();
   }));
}