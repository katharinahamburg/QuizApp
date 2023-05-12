let questions = [
  {
    question: "In welchen Jahr verunglückte Nikki Lauda auf dem Nürburgring?",
    answer_1: "1978",
    answer_2: "1972",
    answer_3: "1976",
    answer_4: "1974",
    right_answer: 3,
  },
  {
    question:
      "Bei welchen Brüdern endete die Geschichte NICHT mit einem Brudermord?",
    answer_1: "Kain und Abel",
    answer_2: "Romulus und Remus",
    answer_3: "Seth und Osiris",
    answer_4: "Brüder Wright",
    right_answer: 4,
  },
  {
    question: "Bénédictine ist ein...?",
    answer_1: "Kartoffelbrot",
    answer_2: "untergäriges Bier",
    answer_3: "Kräuterlikör",
    answer_4: "Karottensalat",
    right_answer: 3,
  },
  {
    question: "Wie heißt die größte in Europa heimische Art der Finken?",
    answer_1: "Pollenlutscher",
    answer_2: "Samenfresser",
    answer_3: "Nussknacker",
    answer_4: "Kernbeißer",
    right_answer: 4,
  },
  {
    question: "510.072.000 qkm ist die Gesamtfläche von... ?",
    answer_1: "der Erde",
    answer_2: "Europa",
    answer_3: "der Antarktis",
    answer_4: "Deutschland",
    right_answer: 1,
  },
];

let rightQuestions = 0;
let currentQuestion = 0;
let audioSuccess = new Audio("sounds/success.mp3");
let audioFail = new Audio("sounds/fail.mp3");

function init() {
  allQuestions();
  showCurrentQuestion();
}

function allQuestions() {
  document.getElementById("all-questions-number").innerHTML = questions.length;
}

function showCurrentQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressbar();
    updateToNextQuestion();
  }
}


function gameIsOver() {
  return currentQuestion >= questions.length;
}


function updateProgressbar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById("progress-bar").innerHTML = `${percent} %`;
  document.getElementById("progress-bar").style.width = `${percent}%`;
}

function showEndScreen() {
  document.getElementById("endScreen").style = "";
  document.getElementById("questionBody").style = "display: none;";
  document.getElementById("allQuestionsAnswered").innerHTML = questions.length;
  document.getElementById("rightQuestionsAnswered").innerHTML = rightQuestions;
  document.getElementById("hide-by-win").src = "./img/pokal.png";
}

function updateToNextQuestion() {
  let question = questions[currentQuestion];
  document.getElementById("question").innerHTML = question["question"];
  document.getElementById("answer1").innerHTML = question["answer_1"];
  document.getElementById("answer2").innerHTML = question["answer_2"];
  document.getElementById("answer3").innerHTML = question["answer_3"];
  document.getElementById("answer4").innerHTML = question["answer_4"];
}

function answer(index) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = index.slice(-1);
  let idOfRightAnswer = `answer${question["right_answer"]}`;
  if (selectedQuestionNumber == question["right_answer"]) {
   document.getElementById(index).parentNode.classList.add("bg-success");
   audioSuccess.play();
   rightQuestions++;
  } else {
    
   document.getElementById(index).parentNode.classList.add("bg-danger");
   audioFail.play();
   document.getElementById(idOfRightAnswer).parentNode.classList.add("bg-success");
  }
   document.getElementById("next-button").disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  document.getElementById("current-question-number").innerHTML = currentQuestion + 1;
  document.getElementById("next-button").disabled = true;
  resetAnswerButtons();
  showCurrentQuestion();
}

function resetAnswerButtons() {
  document.getElementById("answer1").parentNode.classList.remove("bg-success");
  document.getElementById("answer1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer2").parentNode.classList.remove("bg-success");
  document.getElementById("answer2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer3").parentNode.classList.remove("bg-success");
  document.getElementById("answer3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer4").parentNode.classList.remove("bg-success");
  document.getElementById("answer4").parentNode.classList.remove("bg-danger");
}

function restartGame() {
  document.getElementById("hide-by-win").src = "./img/bird.jpg";
  document.getElementById("endScreen").style = "display: none;";
  document.getElementById("questionBody").style = "";

  rightQuestions = 0;
  currentQuestion = 0;

  init();
}
