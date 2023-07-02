const selectBox = document.querySelector('.select_box');
const selectBtnX = selectBox.querySelector('.playerX');
const selectBtnO = selectBox.querySelector('.playerO');
const playBoard = document.querySelector('.play_board');
const allBox = document.querySelectorAll('section span');
const players = document.querySelector('.players');
const resultBox = document.querySelector('.result_box');
const  wonText = resultBox.querySelector('.won_text');
const  replayBtn = resultBox.querySelector('button');



window.onload = () => { // once window loaded
    for (let i = 0; i < allBox.length; i++) { // add onclick attribute in all avaiable section's spans
        allBox[i].setAttribute('onclick', 'clickedBox(this)')
    }
}
selectBtnX.onclick = () => {
    selectBox.classList.add('hide'); // hide the select box on playerX button clicked
    playBoard.classList.add('show');// show the playerboard section on playerX button clicked
 }
selectBtnO.onclick = () => {
    selectBox.classList.add('hide') // hide the select box on playerX button clicked
    playBoard.classList.add('show') // show the playerboard section on playerX button clicked
    players.setAttribute("class","players active player") // adding three class name in player element
}

let playerXicon = 'fas fa-times'; // class name of fontawesom cross icon 
let playerOicon = 'far fa-circle'; //class name of fontawesom circle  icon 
let playerSign = 'X'; // suppose player will be X 
let runBot = true
// user click function

function clickedBox (element) {
    // console.log(element)
    if (players.classList.contains("player")) { // if players element has contains .player
        playerSign = 'O'// if player will be O then we'll change the sign
        element.innerHTML = `<i class = "${playerOicon}"></i>`; // adding circle icon tag inside user clicked element 
        players.classList.add('active');
        // if player select O then we'll change the playerSign value to O
        playerSign = 'O'
        element.setAttribute('id', playerSign)
    } else {
        element.innerHTML = `<i class = "${playerXicon}"></i>`; // adding cross icon inside user clicked element 
        players.classList.add('active');
        element.setAttribute('id', playerSign)
    }
    selectWinner() // calling the winner function 
        playBoard.style.pointerEvents = 'none'; // once user select then can't select any other box until box select 
        element.style.pointerEvents = 'none'; // once user select any box then that box can't be selected again
        let randomDelayTime = ((Math.random() *1000 ) + 200).toFixed() // generating random time delay so bot will delay randomly to select box 
        // console.log(randomDelayTime)
        // playBoard.style.pointerEvents = 'none';
        setTimeout(() => {
            bot(runBot) // calling bot function 
        }, randomDelayTime) // passing random  delay time 
        
}


// bot click function

function bot (runBot) {
    if (runBot) { // if runBot is true then run the following codes
         // first change the playerSign... so if user has X value in id then bot will have O
    playerSign = 'O'
    let array = []; // creating empty array... we'll store unselected box index in this array 

        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) { // if span has no any child element 
                array.push(i) // inserting unclicked or unselected boxes inside array means that span has no children 
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        // console.log(randomBox)
        if (array.length > 0) {
            if (players.classList.contains("player")) { // if players element has contains .player 
                // console.log(playerOicon)
                allBox[randomBox].innerHTML = `<i class = "${playerXicon}"></i>`; // adding cross icon tag inside user clicked element 
                players.classList.remove('active');
                // if user is O then the box id value will be X
                playerSign = 'X'
                allBox[randomBox].setAttribute('id',playerSign)
            } else {
                // console.log(playerXicon)
                allBox[randomBox].innerHTML = `<i class = "${playerOicon}"></i>`; // adding circle icon inside user clicked element 
                players.classList.remove('active');
                allBox[randomBox].setAttribute('id',playerSign)
            }
            selectWinner() // calling the winner 
        }
        allBox[randomBox].style.pointerEvents = 'none' // once bot select any box then user can't select or click on that box 
        playBoard.style.pointerEvents = 'auto'
        playerSign = 'X' // passing the X value 
    }
    }

function getClass (idname) { 
    return document.querySelector('.box' + idname).id // returning id name 
}

function checkClass (val1,val2,val3,sign) {
    if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
        return true;
    }
}

function selectWinner () { // if one combination of them matched then select the winnner
    if (checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign) || checkClass(7,8,9,playerSign) || checkClass(1,4,7,playerSign)
    || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign) || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign)) {
        console.log(playerSign + ' ' + 'is the winner ')
        // once match won by someone then stop the bot
        runBot = false
        bot(runBot)
        setTimeout (() => { // we'll delay to show result box 
            playBoard.classList.remove('show')
            resultBox.classList.add('show')
        },700)
        wonText.innerHTML = `Player  <p>${playerSign}</p> won the game!`
    } else {
        // if match has drawn 
        // first we'll check all id if all span has id and no one won the game then we'll draw the game 
        if (getClass(1) != '' && getClass(2) != '' && getClass(3) != '' && getClass(4) != '' && getClass(5) != '' && getClass(6) != '' && 
        getClass(7) != '' && getClass(8) != '' && getClass(9) != '') {
            runBot = false
            bot(runBot)
            setTimeout (() => { // we'll delay to show result box 
                playBoard.classList.remove('show')
                resultBox.classList.add('show')
        },700)
                wonText.textContent = `Match has been drawn!`
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload() //reload the currentn page 
}
