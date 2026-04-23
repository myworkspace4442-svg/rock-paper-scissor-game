let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0,
    winstreak: 0
};

// Sound Files
const winSound = new Audio('sound1.mp3');
const loseSound = new Audio('sound2.mp3');
const tieSound = new Audio('sound3.mp3');
const changeSound = new Audio('sound4.mp3');

function playGame(playerChoice) {
    // ခလုတ်တွေကို ခဏပိတ်ထားမယ် (Double click မဖြစ်အောင်)
    document.querySelectorAll('.img-movesty').forEach(btn => btn.disabled = true);

    document.querySelector('.sc-result').innerHTML = 'Thinking... 🤔';

    setTimeout(() => {
        // --- ဒီနေရာမှာ သင့်ရဲ့ မူလ playGame logic တွေကို ထည့်ပါ ---  
        const randomNumber = Math.random();
        let result = '';
        let computerChoice = '';

        // Computer ရွေးချယ်မှု
        if (randomNumber < 1 / 3) {
            computerChoice = 'Rock';
        } else if (randomNumber < 2 / 3) {
            computerChoice = 'Paper';
        } else {
            computerChoice = 'Scissors';
        }

        // ရလဒ်တွက်ချက်ခြင်း
        if (playerChoice === 'Rock') {
            if (computerChoice === 'Rock') result = 'Tie.';
            else if (computerChoice === 'Paper') result = 'You lose.';
            else result = 'You win.';
        } else if (playerChoice === 'Paper') {
            if (computerChoice === 'Rock') result = 'You win.';
            else if (computerChoice === 'Paper') result = 'Tie.';
            else result = 'You lose.';
        } else if (playerChoice === 'Scissors') {
            if (computerChoice === 'Rock') result = 'You lose.';
            else if (computerChoice === 'Paper') result = 'You win.';
            else result = 'Tie.';
        }

        // Score နဲ့ Win Streak တွက်ချက်ခြင်း
        if (result === 'You win.') {
            score.wins++;
            score.winstreak++; // နိုင်ရင် streak တိုးမယ်
            winSound.play();

            // နိုင်တဲ့အခါမှ စက္ကူပန်းကြဲမယ်
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else if (result === 'You lose.') {
            score.losses++;
            score.winstreak = 0; // ရှုံးရင် streak ပြန်စမယ်
            loseSound.play();
        } else {
            score.ties++;
            tieSound.play();
        }

        // LocalStorage မှာ သိမ်းမယ်
        localStorage.setItem('score', JSON.stringify(score));

        // UI ပြောင်းလဲခြင်း
        updateScore();
        document.querySelector('.sc-result').innerHTML = result;
        document.querySelector('.sc-move').innerHTML = `
        You <img src="${playerChoice.toLowerCase()}-emoji.png" class="img-move">
        <img src="${computerChoice.toLowerCase()}-emoji.png" class="img-move"> Computer
    `;

        // ScoreBox အရောင်ပြောင်းခြင်း
        const scoreBox = document.querySelector('.sc-score');
        if (result === 'You win.') scoreBox.style.background = 'rgba(0,255,0,0.2)';
        else if (result === 'You lose.') scoreBox.style.background = 'rgba(255,0,0,0.2)';
        else scoreBox.style.background = 'rgba(255,255,0,0.2)';

        scoreBox.style.transition = '0.5s';

        // ရလဒ်ထွက်ရင် ခလုတ်တွေကို ပြန်ဖွင့်ပေးမယ်
        document.querySelectorAll('.img-movesty').forEach(btn => btn.disabled = false);
    }, 700); // 0.7 စက္ကန့် စောင့်မယ်


}

function updateScore() {
    document.querySelector('.sc-score').innerHTML =
        `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}, Streak: ${score.winstreak}`;
}

function resetScore() {
    score = { wins: 0, losses: 0, ties: 0, winstreak: 0 };
    localStorage.removeItem('score');
    updateScore();
}

// ဂိမ်းစဖွင့်ချင်း score ပြပေးထားမယ်
updateScore();

const themeToggle = document.getElementById('themeToggle');


// အရင်သိမ်းထားတဲ့ theme ရှိမရှိ စစ်မယ်
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerText = '☀️';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    const isLight = document.body.classList.contains('light-mode');
    themeToggle.innerText = isLight ? '☀️' : '🌙';

    // Theme ကို သိမ်းထားမယ်
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    changeSound.play();
});



