let questionsTest = [];
let arrAnsQuestionsTest = [];
const oprations = ['+','-','*','/'] ;
let countToArrAnsQueTest = -1;
let numQ = 5; //def test Exam
let flag = true;
  

  

function NextQues() {

     console.log('numQ :'+numQ);
     console.log('Cont :'+ countToArrAnsQueTest);
    if (document.getElementById('rad1').checked || document.getElementById('rad2').checked ||
           document.getElementById('rad3').checked) {
        PushObjOnArrAnsQuestionsTest(FillObj());
        DisplyQues();

    }
    else{
        document.getElementById('err').hidden = false;
    }

    if(countToArrAnsQueTest === (numQ - 1)){
        document.getElementById('nextId').disabled = true;
        document.getElementById('finshId').hidden = false;
    }

}

function DisplyQues() {
    if( countToArrAnsQueTest < numQ)
        countToArrAnsQueTest++;
        DisplyAns();
    if(countToArrAnsQueTest >= arrAnsQuestionsTest.length){
        let radIds = ['rad1','rad2','rad3'];
        for (let radId of radIds) {
            document.getElementById(radId).checked = false;    
        }
        document.getElementById('questionId').innerText = questionsTest[countToArrAnsQueTest].question;
        document.getElementById('numQId').innerText = questionsTest[countToArrAnsQueTest].id;
        
    }else{
        document.getElementById('questionId').innerText = arrAnsQuestionsTest[countToArrAnsQueTest].question;
        document.getElementById('numQId').innerText = arrAnsQuestionsTest[countToArrAnsQueTest].id;
        document.getElementById(arrAnsQuestionsTest[countToArrAnsQueTest].ansSelctedId).checked = true; 
        document.getElementById('lans1').innerText = arrAnsQuestionsTest[countToArrAnsQueTest].ans1; 
        document.getElementById('lans2').innerText = arrAnsQuestionsTest[countToArrAnsQueTest].ans2;
        document.getElementById('lans3').innerText = arrAnsQuestionsTest[countToArrAnsQueTest].ans3; 
    }
    
   
}

function BackQues() { 

    document.getElementById('nextId').disabled = false;
    document.getElementById('finshId').hidden = true;

    if(countToArrAnsQueTest > 0)
    countToArrAnsQueTest -- ;
     document.getElementById('numQId').innerText = arrAnsQuestionsTest[countToArrAnsQueTest].id;
     document.getElementById('questionId').innerText = arrAnsQuestionsTest[countToArrAnsQueTest].question;
     document.getElementById(arrAnsQuestionsTest[countToArrAnsQueTest].ansSelctedId).checked = true;
     document.getElementById('lans1').innerText = arrAnsQuestionsTest[countToArrAnsQueTest].ans1;
     document.getElementById('lans2').innerText = arrAnsQuestionsTest[countToArrAnsQueTest].ans2;
     document.getElementById('lans3').innerText = arrAnsQuestionsTest[countToArrAnsQueTest].ans3;
}

function DisplyAns() {
    let numlabel = getRandomArbitrary(1, 4);
    document.getElementById('lans' + numlabel).innerText = questionsTest[countToArrAnsQueTest].ans ;

    if (numlabel !== 1) {
        document.getElementById('lans1').innerText = +(questionsTest[countToArrAnsQueTest].ans - 1).toFixed(2) ;

    }
    if (numlabel !== 2) {
        document.getElementById('lans2').innerText = +(questionsTest[countToArrAnsQueTest].ans + 1).toFixed(2);

    }

    if (numlabel !== 3) {
        document.getElementById('lans3').innerText = +(questionsTest[countToArrAnsQueTest].ans + 2).toFixed(2);

    }
}

function PushObjOnArrAnsQuestionsTest(obj){
    for(let i = 0; i< arrAnsQuestionsTest.length; i++){
          if(arrAnsQuestionsTest[i].id === obj.id){
            arrAnsQuestionsTest[i] = obj;
            return;
          }
    }
    arrAnsQuestionsTest.push(obj);
}

function getRandomArbitrary(min, max) {

    return Math.floor(Math.random() * (max - min) + min);
}

function FillObj(){
    let numQ = document.getElementById('numQId').innerText;
    let question = document.getElementById('questionId').innerText;
    let ansSelctedId = '';
    let ans1 = document.getElementById('lans1').innerText;
    let ans2 = document.getElementById('lans2').innerText;
    let ans3 = document.getElementById('lans3').innerText;
    let valueTrue = '';
    if (document.getElementById('rad1').checked){
        ansSelctedId = 'rad1';
        valueTrue = document.getElementById('lans1').innerText;
    }
    else if (document.getElementById('rad2').checked) {
        ansSelctedId = 'rad2';
        valueTrue = document.getElementById('lans2').innerText;
    }
     else {
        ansSelctedId = 'rad3';
        valueTrue = document.getElementById('lans3').innerText;
    }

    let obj = {
        id : numQ,
        question :question,
        ansSelctedId :ansSelctedId,
        ans1:ans1,
        ans2:ans2,
        ans3:ans3,
        valueTrue: valueTrue
    }

    return obj;
}

 function MoveNextLavel(){
    
      if(document.getElementById('rad1').checked || document.getElementById('rad2').checked ||
      document.getElementById('rad3').checked){

        let mark = CalculatMarke();
 
        if(flag){
        if(mark < 5){
            document.getElementById('til').innerText = 'Easy level';
           ResetData();
           GenrateQusetions(0,2,5);
           DisplyQues();
           numQ = 5 ;
        }
        else if(mark < 7){
           document.getElementById('til').innerText = 'Intermediate Level';
           ResetData();
           GenrateQusetions(2,4,10);
           DisplyQues();
           numQ = 10;
        }else{
            document.getElementById('til').innerText = 'Hard Level';
            ResetData();
            GenrateQusetionsHard(0,4,25);
            DisplyQues();
            numQ = 25;
        }
        flag = false;
    }
    else{

        localStorage.setItem('mark', mark);
        localStorage.setItem('numQ', numQ);
        window.location.href = "result.html";
        
    }

      }
      else{
        document.getElementById('err').hidden = false;
      }
 }
 
  function CalculatMarke(){
    let mark = 0;
    for (let i = 0; i < arrAnsQuestionsTest.length; i++) {

            if(Number( (questionsTest[i].ans) ) === Number( (arrAnsQuestionsTest[i].valueTrue) )){
                mark += 2 ;
            }
    }
    return mark;
  }
  
 function HiddenErr(){
    document.getElementById('err').hidden = true;
 }

function GenrateQusetions( starRandom , lastRandom, numQquestions){
    for (let i = 1; i <= numQquestions; i++) {

        let num1 = getRandomArbitrary(5, 10);
        let num2 = getRandomArbitrary(1, 6);
    
            let obj = {
                question: '',
                id: i,
                ans: -1
            };
            
            let opration = oprations[getRandomArbitrary(starRandom,lastRandom)];
            obj.question = num1 +' '+ opration +' '+ num2 + " =";
            obj.ans =  (opration === '+' ) ? num1 + num2 :(opration === '-' ) ? num1 - num2 :(opration === '*' ) ? num1 * num2 : num1 / num2;
            questionsTest.push(obj);
         
    }
}

function ResetData(){
    questionsTest = [];
    arrAnsQuestionsTest = [];
    countToArrAnsQueTest = -1;
    document.getElementById('nextId').disabled = false;
    document.getElementById('finshId').hidden = true;
    document.getElementById('til').style.color ="#FFD700";
   document.getElementById("backG").style.border = "thick solid #FFD700";
}

function GenrateQusetionsHard(starRandom , lastRandom, numQquestions){
    for (let i = 1; i <= numQquestions; i++) {

        let num1 = getRandomArbitrary(11, 21);
        let num2 = getRandomArbitrary(6, 11);
        let num3 = getRandomArbitrary(1, 6);
    
            let obj = {
                question: '',
                id: i,
                ans: -1
            };
            
            let opration1 = oprations[getRandomArbitrary(starRandom,lastRandom)];
            let opration2 = oprations[getRandomArbitrary(starRandom,lastRandom)];
            obj.question = num1 +' '+ opration1 +' '+ num2 +' '+ opration2 +' '+num3 +' =';
            let val = eval(`${num1} ${opration1} ${num2} ${opration2} ${num3}`);
            obj.ans  = +val.toFixed(2);
            questionsTest.push(obj);
         
    }
}

GenrateQusetions(0,3,5);
DisplyQues();
