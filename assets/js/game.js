const question = document.querySelector(".question");
const choice = document.querySelector(".choice");
const choices = document.querySelectorAll(".choice_text");
const progressText = document.querySelector(".progressText");
const scoreText = document.querySelector(".score");
const progressBarFull = document.querySelector(".progressBarFull");
const nextBtn = document.querySelector(".nextBtn");

let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What does HTML stand for?",
    choice1: "Hyper Trainer Marking Language",
    choice2: "Hyper Text Markup Language",
    choice3: "Hyper Text Marketing Language",
    choice4: "Hyper Text Markup Leveler",
    answer: 2,
  },
  {
    question: "Which HTML tag is used to link an external CSS file?",
    choice1: "<style>",
    choice2: "<script>",
    choice3: "<link>",
    choice4: "<css>",
    answer: 3,
  },
  {
    question:
      "Which HTML element is used to define the structure of a webpage's navigation links?",
    choice1: "<nav>",
    choice2: "<section>",
    choice3: "<header>",
    choice4: "<div>",
    answer: 1,
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    choice1: "<break>",
    choice2: "<lb>",
    choice3: "<br>",
    choice4: "<newline>",
    answer: 3,
  },
  {
    question:
      "Which attribute is used to provide alternative text for an image in HTML?",
    choice1: "title",
    choice2: "alt",
    choice3: "src",
    choice4: "description",
    answer: 2,
  },
  {
    question: "What does CSS stand for?",
    choice1: "Cascading Style Sheets",
    choice2: "Computer Style Sheets",
    choice3: "Creative Style Sheets",
    choice4: "Cascading Simple Sheets",
    answer: 1,
  },
  {
    question:
      "Which CSS property is used to change the text color of an element?",
    choice1: "font-color",
    choice2: "text-color",
    choice3: "color",
    choice4: "foreground-color",
    answer: 3,
  },
  {
    question:
      "Which CSS property controls the spacing between elements' borders and their content?",
    choice1: "margin",
    choice2: "padding",
    choice3: "spacing",
    choice4: "border-spacing",
    answer: 2,
  },
  {
    question:
      "Which CSS layout module is designed for one-dimensional layouts (row or column)?",
    choice1: "Grid",
    choice2: "Flexbox",
    choice3: "Float",
    choice4: "Position",
    answer: 2,
  },
  {
    question: "What is the default position value of an HTML element in CSS?",
    choice1: "relative",
    choice2: "fixed",
    choice3: "static",
    choice4: "absolute",
    answer: 3,
  },
  {
    question:
      "In Bootstrap, which class is used to create a responsive container that adjusts to the viewport?",
    choice1: ".wrapper",
    choice2: ".container",
    choice3: ".box",
    choice4: ".grid",
    answer: 2,
  },
  {
    question: "How many columns does the Bootstrap grid system use by default?",
    choice1: "10",
    choice2: "16",
    choice3: "12",
    choice4: "24",
    answer: 3,
  },
  {
    question:
      "Which Bootstrap class makes a button take up the full width of its parent container?",
    choice1: ".btn-full",
    choice2: ".btn-block",
    choice3: ".w-100",
    choice4: ".btn-wide",
    answer: 3,
  },
  {
    question:
      "Which Bootstrap class is used to hide an element only on small screens?",
    choice1: ".hidden-sm",
    choice2: ".d-sm-none",
    choice3: ".sm-hide",
    choice4: ".invisible-sm",
    answer: 2,
  },
  {
    question:
      "In Tailwind CSS, which utility class sets an element's display to flex?",
    choice1: ".flex-box",
    choice2: ".d-flex",
    choice3: ".flex",
    choice4: ".flexbox",
    answer: 3,
  },
  {
    question: 'In Tailwind CSS, what does the class "text-center" do?',
    choice1: "Centers an element vertically",
    choice2: "Centers text horizontally",
    choice3: "Aligns text to the center of the viewport only",
    choice4: "Centers an image",
    answer: 2,
  },
  {
    question:
      "Which Tailwind CSS prefix is used to apply a style only on hover?",
    choice1: "hover:",
    choice2: "on-hover:",
    choice3: ":hover",
    choice4: "hvr:",
    answer: 1,
  },
  {
    question:
      "What is the correct way to declare a variable in modern JavaScript that cannot be reassigned?",
    choice1: "var",
    choice2: "let",
    choice3: "const",
    choice4: "static",
    answer: 3,
  },
  {
    question:
      "Which JavaScript method is used to select an HTML element by its id?",
    choice1: "getElementById()",
    choice2: "querySelectorId()",
    choice3: "getElementByClass()",
    choice4: "selectId()",
    answer: 1,
  },
  {
    question:
      "Which JavaScript array method adds one or more elements to the end of an array?",
    choice1: "shift()",
    choice2: "unshift()",
    choice3: "pop()",
    choice4: "push()",
    answer: 4,
  },
  {
    question: 'What will "typeof null" return in JavaScript?',
    choice1: "null",
    choice2: "undefined",
    choice3: "object",
    choice4: "boolean",
    answer: 3,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 20;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset.number;
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswer = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswer) return;

    acceptingAnswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = parseInt(selectedChoice.dataset.number);
    let cssToApply =
      selectedAnswer === currentQuestion.answer ? "isCorrect" : "isNotCorrect";

    if (cssToApply === "isCorrect") {
      incrementScore(SCORE_POINTS);
      selectedChoice.parentElement.classList.add(cssToApply);
    } else {
      selectedChoice.parentElement.classList.add(cssToApply);
      choices.forEach((choice) => {
        if (parseInt(choice.dataset.number) === currentQuestion.answer) {
          choice.parentElement.classList.add("isCorrect");
        }
      });
    }

    nextBtn.classList.remove("hidden");
    nextBtn.addEventListener("click", () => {
      choices.forEach((choice) => {
        choice.parentElement.classList.remove("isCorrect", "isNotCorrect");
      });
      nextBtn.classList.add("hidden");
      getNewQuestion();
    });
  });
});

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
