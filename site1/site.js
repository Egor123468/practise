var counter = 0;
var cells = document.querySelectorAll('#field td');
var timerElement = document.getElementById('timer');
var currentPlayerElement = document.getElementById('current-player-name');
var chatMessagesElement = document.getElementById('chat-messages');
var chatInputElement = document.getElementById('chat-input');
var timer;
var seconds = 0;
var minutes = 0;
var currentTime = '00:00';
var players = [
    'Плюшкина Екатерина Викторовна',  // Крестики
    'Пупкин Владлен Игоревич'          // Нолики
];
var wins = [0, 0];  // Массив для подсчета побед каждого игрока

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    var secondsStr = seconds < 10 ? '0' + seconds : seconds;
    var minutesStr = minutes < 10 ? '0' + minutes : minutes;
    timerElement.innerText = minutesStr + ':' + secondsStr;
}


function isVictory() {
    var combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (var combo of combos) {
        if (cells[combo[0]].innerHTML == cells[combo[1]].innerHTML && cells[combo[1]].innerHTML == cells[combo[2]].innerHTML && cells[combo[0]].innerHTML != '') {
            return true;
        }
    }
    return false;
}

function getWinningCombination() {
    var combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (var combo of combos) {
        if (cells[combo[0]].innerHTML == cells[combo[1]].innerHTML && cells[combo[1]].innerHTML == cells[combo[2]].innerHTML && cells[combo[0]].innerHTML != '') {
            return combo;
        }
    }
    return [];
}

function highlightWinningCells(winningCombination) {
    var color = counter % 2 === 0 ? '#CFEDE6' : '#F3BBD0';
    winningCombination.forEach(index => {
        cells[index].style.backgroundColor = color;
    });
}

function updateCurrentPlayer() {
    var iconElement = document.getElementById('current-player-icon');
    var playerElement = document.getElementById('current-player');
    if (counter % 2 == 0) {
        iconElement.innerHTML = '<img src="cross.png" width="20" height="20">';
        playerElement.innerText = players[0];
    } else {
        iconElement.innerHTML = '<img src="zero.png" width="20" height="20">';
        playerElement.innerText = players[1];
    }
    currentPlayerElement.style.display = 'block';  
}

function tap(event) {
    if (event.target.innerHTML !== '') return;  

    if (counter % 2 == 0) {
        event.target.innerHTML = '<img src="cross.png" width=100>';
    } else {
        event.target.innerHTML = '<img src="zero.png" width=100>';
    }

    if (isVictory()) {
        clearInterval(timer);
        for (var cell of cells) {
            cell.removeEventListener('click', tap);
        }
        wins[counter % 2]++;  
        updateWinPercentages();
        document.getElementById('game-result').innerText = players[counter % 2] + ' выиграл, сыграем еще?';
        currentPlayerElement.style.display = 'none';  
        highlightWinningCells(getWinningCombination());
        showStartButton();  
    } else if (counter == 8) {
        clearInterval(timer);
        document.getElementById('game-result').innerText = 'Ничья!';
        currentPlayerElement.style.display = 'none';  
        showStartButton();  
    } else {
        counter++;
        updateCurrentPlayer();
    }
}
function startGame() {
    for (var cell of cells) {
        cell.innerHTML = '';
        cell.style.backgroundColor = ''; 
        cell.addEventListener('click', tap);
    }

    counter = 0;
    clearInterval(timer);
    timerElement.innerText = '00:00';
    seconds = 0;
    minutes = 0;
    timer = setInterval(updateTimer, 1000);
    updateCurrentPlayer();  
    hideStartButton();  
    document.getElementById('game-result').innerText = ''; 
}

function updateWinPercentages() {
    var totalGames = wins[0] + wins[1];
    var winPercentagePlayer1 = totalGames > 0 ? (wins[0] / totalGames * 100).toFixed(1) : 0;
    var winPercentagePlayer2 = totalGames > 0 ? (wins[1] / totalGames * 100).toFixed(1) : 0;

    document.getElementById('player2-win-percentage').innerText = winPercentagePlayer1 + '% побед';
    document.getElementById('player1-win-percentage').innerText = winPercentagePlayer2 + '% побед';
}

function sendMessage() {
    var messageText = chatInputElement.value.trim();
    if (messageText === '') return;

    var messageElement = document.createElement('div');
    messageElement.className = 'chat-message';
    messageElement.innerText = players[counter % 2] + ': ' + messageText;
    chatMessagesElement.appendChild(messageElement);
    chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;

    chatInputElement.value = '';
}

document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
document.getElementById('send-button').addEventListener('click', function() {
    sendMessage();
});

document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

var currentPlayer = null;

document.querySelectorAll('.player-select').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.player-select').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentPlayer = button.getAttribute('data-player');
    });
});

function hideStartButton() {
    document.getElementById('start-button').style.display = 'none';
}
function showStartButton() {
    document.getElementById('start-button').style.display = 'inline-block';
}
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message === '' || currentPlayer === null) return;

    const chatMessages = document.getElementById('chat-messages');

    const newMessage = document.createElement('div');
    newMessage.className = 'chat-message';

    const username = document.createElement('span');
    username.className = 'username';
    username.textContent = currentPlayer;

    const messageContent = document.createElement('span');
    messageContent.textContent = message;

    const time = document.createElement('span');
    time.className = 'time';
    const now = new Date();
    time.textContent = `${now.getHours()}:${now.getMinutes()}`;

    newMessage.appendChild(username);
    newMessage.appendChild(messageContent);
    newMessage.appendChild(time);

    chatMessages.appendChild(newMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    input.value = '';
}

startGame();