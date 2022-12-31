const quiz = [
  {
    question :'祝賀 ↔︎',
    correct : '弔悼',
    suggest : 'ちょうとう'
  },
  {
    question: '陰鬱 ↔︎',
    correct: '明朗',
    suggest : 'めいろう'
  },
  {
    question :'混同 ↔︎',
    correct : '峻別',
    suggest : 'しゅんべつ'
  },
  {
    question: '灌木 ↔︎',
    correct: '喬木',
    suggest : 'きょうぼく'
  },
  {
    question :'暗愚 ↔︎',
    correct : '聡明',
    suggest : 'そうめい'
  },
  {
    question: '忠告 ≒',
    correct: '諫言',
    suggest : 'かんげん'
  },
  {
    question: '軽少 ≒',
    correct: '些細',
    correct2: '瑣細',
    suggest : 'ささい'
  },
  {
    question: '可憐 ≒',
    correct: '清楚',
    suggest : 'せいそ'
  },
  {
    question: '消長 ≒',
    correct: '浮沈',
    suggest : 'ふちん'
  },
  {
    question: '動向 ≒',
    correct: '趨勢',
    suggest : 'すうせい'
  }
];
quiz.sort(() => 0.5 - Math.random());

const quizLength = quiz.length;
let quizIndex = 0;
let score = 0;

const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');

// クイズの問題文を表示
const setupQuiz = () => {
  document.getElementById('js-question').textContent = quiz[quizIndex].question;
  answerInput.value = '';
};

setupQuiz();

const clickHandler = () => {
  quiz[quizIndex].input = answerInput.value;
  if (quiz[quizIndex].correct === answerInput.value) {
    window.alert('正解');
    score++;
  } else if (quiz[quizIndex].correct2 === answerInput.value) {
    window.alert('正解');
    score++;
  } else {
    window.alert('不正解');
  }
  quizIndex++; // 次の問題へ
  if (quizIndex < quizLength) {
    setupQuiz();
  } else {
    window.alert('終了 正解数は' + score + '/' + quizLength + 'です');
    showAllAnswers();
  }
};

// ボタンクリックで正誤判定
submitButton.addEventListener('click', () => {
  clickHandler();
});

const showAllAnswers = () => {
  const container = document.getElementById('all-answers-container');
  container.style.display = 'block';
  
  const tbody = document.getElementById('all-answers-tbody');
  for (const q of quiz) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${q.question}</td><td>${q.input}</td><td>${q.correct}</td><td>${q.input === q.correct ? '○' : '×'}</td>`;
    tbody.appendChild(row);
  }
};