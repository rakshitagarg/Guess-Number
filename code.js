let random =  parseInt(Math.random() * 100 +1 );
const submit = document.getElementById('subt')
const userinput = document.querySelector('#guessField')    // to chk ki input sahi values aa rahi h na   
const guessSlot= document.querySelector('.guesses')   // for storing previous inputs
const remaining = document.querySelector('.lastResult')
const loOrHi= document.querySelector('.lowOrHi')
const startover= document.querySelector('.resultParas')

const p= document.createElement('p');      // needed to display start over

let prevguess= [] // empty array initialised     , to keep and store userinput values 
let numguess= 1   // no of guesses attempted 
let playgame= true;

if(playgame){
    submit.addEventListener('click', function(e){
        e.preventDefault()      // should not go to the server 
       const guess = parseInt(userinput.value)
       console.log(guess);
       validateGuess(guess);
    })
}

function validateGuess(guess){                         //chk whether value is in 1-100
//    guess parseInt(userinput.value)
if(guess<1 || guess>100) {
// p.innerHTML ="Please Enter a valid number"          // not correct 
    alert("Please Enter a number between 1 to 100")
    userinput.value=''                                 // optional- additionally added 
}
else if(isNaN(guess)){
    alert("Please Enter a valid number")
    userinput.value=''                                // optional
}
else {
    // for whether no. is already present or not 
    // if(guess){
    //     for(let i=0;i<prevguess.length;i++){
    //         if(prevguess[i]==guess) {
    //         displaymessage(`Number is already entered ! GUESS something different.`)
    //         userinput.value='';

    //         }
    //     }
    // }   

    prevguess.push(guess);
    if(numguess>=11){
        displayguess(guess)      
        displaymessage(`No more Attempts... \n GAME OVER! Random Number was ${random} `)
        endgame()
    }
    else{
        // displayguess(guess)                      // no need of this here as we are chking and making change in chkguess function
        chkguess(guess)
    }
}
}


function chkguess(guess){                      // value exists , low or hi 
    
     if(guess===random){
    displaymessage(`CONGRATS !!\n You guessed it CORRECT!`)
    endgame();
}
else if(guess<random){
    displaymessage(`Number is TOO LOW!`)
    displayguess(guess)                    
}
else if(guess>random){
    displaymessage(`Number is TOO HIGH!`)
    displayguess(guess)
}


}

function displayguess(guess){         // or say clean up guess
    // no need of parameter also 
     // for taking new input and updating value in dom 
     userinput.value='';
    //  guessSlot.innerHTML=`${prevguess}`
     guessSlot.innerHTML = `${prevguess} `               // add krte ja rahe guess value in the slot
    //  console.log(guess);
     remaining.innerHTML = `${ 10- numguess }`
     numguess=numguess+1;
    
}

function displaymessage(message){
loOrHi.innerHTML=`<h2> ${message} </h2>`
// loOrHi.innerHTML= `hello`                          // next/ last statement read hota h 
}

function endgame(){
userinput.value=''
userinput.setAttribute('disabled', '')
p.classList.add('button')                  // adding a class name with button
 // The classList property is read-only, but you can use the methods listed below, to add, toggle or remove CSS classes from the list:
p.innerHTML =`<h2 id="newgame">Start New Game<h2>`
startover.appendChild(p)
playgame=false
newgame()
}

function newgame(){
    const newgamebutton= document.querySelector('#newgame')
    newgamebutton.addEventListener('click',function(){
        userinput.value=''
       userinput.removeAttribute('disabled', '')
       prevguess=[]
       guessSlot.innerHTML=''
       random= parseInt(Math.random() * 100 +1 );
       numguess=0;
       remaining.innerHTML=`${10-numguess}`
       loOrHi.innerHTML=''
       startover.removeChild(p)             // as appended child in startover
       
       playgame=true
    })

}