var playing = false;
var scoreVal;
var action;
var timeremaining;
var correctAnswer;
/*FUNCTIONS*/
function startCountdown(){
    action = setInterval(function(){
        //decreases time by 1
        timeremaining -=1;
        //sets the timeremaining value as the innerHTML value of 
        document.getElementById("timeremainingvalue").innerHTML = timeremaining + "secs";;
        //make game over visible when time is over
        if (timeremaining == 0){
            //executes when time runs out
            stopCountdown();
            //shows gameover screen
            show("gameover");
            document.innerHTML = "<p>GAME OVER</p><p>Your score is: "+ scoreVal + "</p>";
                //hides elements
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML="Start";
        }

    }
    , 1000)
}

function stopCountdown(){
    clearInterval(action);
}
//generates new questions
function generateQA(){
    var x = 1 + Math.round(Math.random()*9);
    var y = 1 + Math.round(Math.random()*9);
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + " x " + y;
    
    var correctPosition = 1 + Math.round(Math.random()*3);
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fills one box with the correct answer;
    //answers array
    var answers = [correctAnswer];
    for(var i = 1; i <5; i++){
        //verifies that wrong answers are not equal to the right answers.
        if(i !== correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer= ((1 + Math.round(Math.random())*9)*(1 + Math.round(Math.random()*9)));
                document.getElementById("box"+i).innerHTML = wrongAnswer;
            }while(answers.indexOf(wrongAnswer)>-1);//checks if the wrong answer is the first element of the array, generates new wrong answer if true.
            //adds wrong answer to the answers array.
            answers.push(wrongAnswer);
            
        }

    }
}
//hide/show elements
function hide(id){
    document.getElementById(id).style.display = "none"
}

function show(id){
    document.getElementById(id).style.display = "block";
}

/*boxes*/
for(var i = 1; i < 5; i++){
document.getElementById("box"+i).onclick = function(){
    if(playing == true){
        if(this.innerHTML == correctAnswer){
           //hides wrong box
           hide("wrong");
           show("correct");
           setTimeout(function(){
               hide("correct");
           },1000);
           scoreVal++;
           document.getElementById("scoreValue") = scoreVal;

           generateQA();
        }
       else{
           //hides correct box
           hide("correct");
           show("wrong");
           setTimeout(function(){
               window.console.log("wrong timeout executed");
               hide("wrong");
           },1000);
        }
   }
   }
}
/*FUNCTIONS*/

/*MAIN */
document.getElementById("startreset").onclick =
function(){
    //if you are playing
    if(playing == true){
        location.reload();
    } 
    //if you are not playing
    else{
        playing = true;
        //set time remaining to 60 secs
        timeremaining = 60;
        
        //set score to 0
        scoreVal = 0;
        

        document.getElementById("scoreValue").innerHTML = scoreVal;
        //show the counter
        show("timeremaining");
        //start the countdown
        startCountdown();
        //stop at 0
        //hides game over box
        hide("gameover")
        //generates Question and Answer
        generateQA();

        //change start button
        document.getElementById("startreset").innerHTML = "Reset";
    }
 }

 /*MAIN */

 /*Boxes */

 