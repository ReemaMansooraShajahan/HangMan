const WordList=[{
    hint: "Like a colorless, odourless gas, essential for living",
    word: "Oxygen"
},
{
    hint: "The largest mammal on Earth",
    word: "Whales"
},
{
    hint: "The chemical element with the symbol Na",
    word: "Sodium"
},
{
    hint: "The longest river in Asia",
    word: "Ganges"
},
{
    hint: "The chemical element with the symbol Cu",
    word: "Copper"
}, 
{
    hint: " The capital city of India",
    word: "Mumbai"
},
{
    hint: "The largest desert in the world",
    word: "Sahara"
},
{
    hint: " The chemical element with the symbol Ag",
    word: "Silver"
},
{
    hint: "The capital city of Spain",
    word: "Madrid"
},
{
    hint: "The capital city of Australia",
    word: "Sydney"
},
{
    hint: "The unit of measurement for time",
    word: "Minute"
},
{
    hint: "The largest bay in the world",
    word: "Hudson"
},
{
    hint: "The process of a liquid turning into a solid",
    word: "Freeze"
},
{
    hint: "The chemical element with the symbol He",
    word: "Helium"
},
{
    hint: "The largest island in the Mediterranean Sea",
    word: "Cyprus"
},

]

const WordDisplay=document.querySelector(".letters");
const HangManImg=document.querySelector(".hangman-game img");
const guessesText=document.querySelector(".incorrect b");
const keyboarddiv=document.querySelector(".keyboard");
const gameModal=document.querySelector(".game-modal");
const PlayAgainBtn=document.querySelector(".play-again");
let currentWord,correctLetters=[],wrongGuessCount=0;
const maxGuesses=6;

const resetGame=()=>{
    correctLetters=[];
    wrongGuessCount=0;
    HangManImg.src=`images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText=`${wrongGuessCount}/ ${maxGuesses}`;
    keyboarddiv.querySelectorAll("button").forEach(btn=>btn.disabled=false);
    WordDisplay.innerHTML=currentWord.split("").map(()=>`<li class="letter"></li>`).join("");

    gameModal.classList.remove("show");
}
const getRandomWord=()=>{
const{word,hint}=WordList[Math.floor(Math.random()*WordList.length)];

currentWord=word;
document.querySelector(".Hint b").innerText=hint;
resetGame();
WordDisplay.innerHTML=word.split("").map(()=>`<li class="letter"></li>`).join("");
}


const gameOver=(isVictory)=>{
    setTimeout(()=>{
        const modalText=isVictory?`You found the word:` :`The correct word was:`;
        gameModal.querySelector("img").src=`images/${isVictory?'victory':'lost'}.gif`;
        gameModal.querySelector("h2").innerText=`${isVictory?'Congrats!':'Game Over!'}`;

        gameModal.querySelector("p").innerHTML = `${modalText} <b> ${currentWord} </b>`;


gameModal.classList.add("show");
    },300);
}


const initGame = (button, clickedLetter) => {
    const clickedLetterLowercase = clickedLetter.toLowerCase(); // Convert clicked letter to lowercase

    let found = false;
    [...currentWord].forEach((letter, index) => {
        const letterLowercase = letter.toLowerCase(); // Convert letter in word to lowercase
        if (letterLowercase === clickedLetterLowercase) {
            found = true;
            correctLetters.push(letter);
            WordDisplay.querySelectorAll("li")[index].innerText = letter;
            WordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
    });

    if (!found) {
        wrongGuessCount++;
        HangManImg.src=`images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled=true;

    guessesText.innerText=`${wrongGuessCount}/ ${maxGuesses}`;
    if(wrongGuessCount===maxGuesses)return gameOver(false);
    if(correctLetters.length===currentWord.length) return gameOver(true);
};


//Keyboard Buttons
for(let i=97;i<=122;i++){
    const button=document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboarddiv.appendChild(button);
    button.addEventListener("click",e=>initGame(e.target,String.fromCharCode(i)))
}
getRandomWord();
PlayAgainBtn.addEventListener("click",getRandomWord);