let currentQuestionNumber = 1;
let correctAnswerCount = 0;
const quizLength = 10;
const scoreCard = [];
let quizList = [];
const MasterQuizList = [
{ 'Question' : 'Under Oregon law, who must wear a bicycle helmet?', 'Correct Answer' : 'Anyone under the age of 16', 'Answers' : [ 'Anyone under the age of 16', 'Anyone under the age of 13', 'Any cyclist, regardless of age', 'Helmet use is strongly encouraged, but unregulated in Oregon'], 'Feedback' : 'Additionally, it is against the law to carry a passenger under the age of 16 on your bicycle if the passenger is not wearing a helmet.', 'Source' : 'https://www.portlandoregon.gov/transportation/article/301187' },
{ 'Question' : 'Oregon has a "Bike Bill", which requires the inclusion of facilities for pedestrians and bicyclists wherever a road, street or highway is built or rebuilt. Which year was it passed?', 'Correct Answer' : '1971', 'Answers' : [ '1971', '1993', '2000', '2015'], 'Feedback' : 'ORS 366.514, aka the bike bill, was passed by the Oregon Legislature in 1971. It applies to ODOT, cities and counties and requires spending reasonable amounts of their share of the state highway fund on facilities for pedestrians and bicyclists. These facilities must be located within the right-of-way of public roads, streets or highways open to motor vehicle traffic. The funds cannot be spent on trails in parks or other areas outside of a road, street or highway right-of-way.', 'Source' : 'http://www.oregon.gov/odot/programs/pages/bikeped.aspx' },
{ 'Question' : 'When on a road with no shoulder or bike lane, and the travel lane is narrow, you should', 'Correct Answer' : 'Ride in the center of the lane', 'Answers' : [ 'Ride in the center of the lane', 'Ride to the far right of the lane', 'Ride on the sidewalk', 'Dismount and walk on the sidewalk'], 'Feedback' : 'This will prevent motorists from passing you when there isn’t room. You should also take the lane when you’re traveling at the same speed as traffic. This will keep you out of motorists’ blind spots and reduce conflicts with right-turning traffic.', 'Source' : 'https://docs.google.com/viewer?url=http%3A%2F%2Fwww.oregon.gov%2FODOT%2FPrograms%2FTDD%2520Documents%2FOregon-Bicyclist-Manual.pdf' },
{ 'Question' : 'When driving, you aproach a red light at an intersection with a green "Bike Box". You are legally required to. . .', 'Correct Answer' : 'Stop in advance of the box, and remain parked until the light turns green and the box is empty', 'Answers' : [ 'Stop in advance of the box, and remain parked until the light turns green and the box is empty', 'Stop in advance of the box, and proceed to make a right hand turn ONLY if the box is clear', 'Stop in advance of the box if there are bicycles present, otherwise proceed to pull up to the front of the intersection', 'Approach the bicycle box with caution, but be aware that there is no additional legal requirement to accomodate bicyclists'], 'Feedback' : 'When you bike: Roll up to the front of the line when there’s a yellow or red light. If the light is green, watch for vehicles turning right before continuing through the intersection. Only cyclists can take a right on red when there’s a bike box.', 'Source' : 'https://www.portlandoregon.gov/transportation/article/594206' },
{ 'Question' : 'A bicycle equiped with and electric assist system, for the purposes of the Oregon Vehicle Code, shal be considered:', 'Correct Answer' : 'a Bicycle', 'Answers' : [ 'a Bicycle', 'a Motor Vehicle in practice', 'illegal, unless registered as a motor vehicle', 'There is no statute in place regarding electric assisted bicycles.'], 'Feedback' : 'This one has been on the books for over 20 years. 814.405: Status of electric assisted bicycle.', 'Source' : 'https://bikeportland.org/resources/bicyclelaws#814405' },
{ 'Question' : 'A bicyclist is legally permitted to', 'Correct Answer' : 'Ride their bicycle on the sidewalk or crosswalk in a safe manner', 'Answers' : [ 'Ride their bicycle on the sidewalk or crosswalk in a safe manner', 'Only walk their bicycle on the sidewalk or crosswalk', 'Treat the sidewalk or crosswalk as a defacto bicycle lane in the absence of pedestrians', 'Overtake a pedestrian at a speed greater than an ordinary walk to long as an audible warning is given'], 'Feedback' : 'Operation of an electric assisted bicycle on a sidewalk is NEVER permitted', 'Source' : 'https://bikeportland.org/resources/bicyclelaws#814405' },
{ 'Question' : 'A commercial vehicle is permitted to park in a bicycle lane', 'Correct Answer' : 'If they are in the process of making a delivery', 'Answers' : [ 'If they are in the process of making a delivery', 'Between the hours of 8am and 5pm', 'Only if they are speciffically licenced to do so', 'Never.'], 'Feedback' : 'An implement of husbandry may also momentarily cross into a bicycle lane to permit other vehicles to overtake and pass the implement of husbandry.', 'Source' : 'https://www.oregonlaws.org/ors/811.440' },
{ 'Question' : 'The average age of bicyclists killed in crashes with motor vehicles is', 'Correct Answer' : '45', 'Answers' : [ '45', '25', '35', '55'], 'Feedback' : 'The average age of bicyclists killed in crashes with motor vehicles continues to increase, climbing to 45 years old in 2014, up from 39 in 2004, 32 in 1998, and 24 in 1988.', 'Source' : 'http://www.pedbikeinfo.org/data/factsheet_crash.cfm' },
{ 'Question' : 'A bicyclist may proceed at a red light', 'Correct Answer' : 'If the signal fails to turn green after a "one full cycle."', 'Answers' : [ 'If the signal fails to turn green after a "one full cycle."', 'After coming to a complete stop', 'Never', 'Only in the absence of motor vehicles'], 'Feedback' : 'The 2015 law holds motorcyclists and bicyclists proceeding through a red liable if there\'s a collision with other road users proceeding through a green light. For motorcyclists, it would also apply to highway ramp meters.  Rolling through stop signs remains illegal.', 'Source' : 'http://www.oregonlive.com/commuting/index.ssf/2015/03/bicycles_oregon_law_run_red_li.html' },
{ 'Question' : 'A cyclist must signal a stop or turn while operating a bicycle', 'Correct Answer' : 'If they can safely do so', 'Answers' : [ 'If they can safely do so', 'If they are so inclined', 'Never', 'Only in a dense urban core'], 'Feedback' : 'Failure to signal for a bicycle turn is a Class D traffic violation since 1983', 'Source' : 'https://bikeportland.org/resources/bicyclelaws#814405' },
{ 'Question' : 'Unlawful passengers on bicycle', 'Correct Answer' : 'Occurs where there are more persons on the bicycle than the number for which it is designed or safely equipped', 'Answers' : [ 'Occurs where there are more persons on the bicycle than the number for which it is designed or safely equipped', 'Is not a real thing', 'Is only enforced at the circus', 'Only applies to riding on the handlebars'], 'Feedback' : 'A person operating an electric personal assistive mobility device is not subject to this section.', 'Source' : 'https://bikeportland.org/resources/bicyclelaws#814405' }
];
// Keys in each Object
	// 'Question'
	// 'Correct Answer'
	// 'Answers'
	// 		[0,1,2,3]
	// 'Feedback'
	// 'Source'




/*
Game Plan
we will be starting with start page
listen for start button
	hide start page
For Each question:
	render quiz page
		get current question number
		retrieve current question
		shuffle current answers

	show quiz page
	listen for button click

*/


function getCorrectAnswer() {
	let test = quizList[currentQuestionNumber-1]
	let correct = test['Correct Answer'];
	return(correct);
}

function testAlert(passedAlert) { alert(`you have been alerted to: ${passedAlert}`);}


function showSection (section) {
	$('section').not(section).addClass('hidden');
	$(section).removeClass('hidden');
}

function shuffle (array) {
// That’s a Fisher-Yates shuffle. 	
  let i = 0, j = 0, temp = null
  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}



function shuffleCurrentAnswers() {
// pull answers to
}



function createQuestionString(i) {
	// let obj = MasterQuizList[i];
	let question = MasterQuizList[i].Question;
	let correctAnswer = MasterQuizList[i]['Correct Answer'];
	const answers = MasterQuizList[i].Answers;
	// const	string = '<form><h2 class="question js-question">' + question + '</h2><div class="answer-option"><label for="answer-a" class="answer-label js-answer-label">a)</label><button name="answer-a" class="box answer js-answer-a">' + answerA + '</button></div><div class="answer-option"><label for="answer-a" class="answer-label js-answer-label">b)</label><button name="answer-b" class="box answer js-answer-b">' + answerB + '</button></div><div class="answer-option"><label for="answer-a" class="answer-label js-answer-label">c)</label><button name="answer-c" class="box answer js-answer-c">' + answerC + '</button></div><div class="answer-option"><label for="answer-a" class="answer-label js-answer-label">d)</label><button name="answer-d" class="box answer js-answer-d">' + answerD + '</button></div></form><div class="progress js-progress"><h4>Question <span class="js-question-number">1</span> of <span class="js-total-questions">10</span></h4><h4><span class="js-correct-answers">0</span> out of <span class="js-given-answers">0</span> correct</h4></div>';
	const	string = (`
		<form><h2 class="question js-question">${question}</h2><div class="answer-option"><label for="answer-a" class="answer-label js-answer-label">a)</label><button value="${answers[0]}" class="box answer js-answer-a">${answers[0]}</button></div>
		<div class="answer-option">
			<label for="answer-b" class="answer-label js-answer-label">b)</label>
			<button value="${answers[1]}" class="box answer js-answer-b">${answers[1]}</button></div>
		<div class="answer-option">
			<label for="answer-c" class="answer-label js-answer-label">c)</label>
			<button class="box answer js-answer-c">${answers[2]}</button></div><div class="answer-option"><label for="answer-d" class="answer-label js-answer-label">d)</label><button class="box answer js-answer-d">${answers[3]}</button></div></form><div class="progress js-progress"><h4>Question <span class="js-question-number">${currentQuestionNumber}</span> of <span class="js-total-questions">${quizLength}</span></h4><h4><span class="js-correct-answers">${correctAnswerCount}</span> out of <span class="js-given-answers">${currentQuestionNumber-1}</span> correct</h4></div>`);
	return (string);
}

function renderQuizPage() {
	$('.js-quiz-section').html(createQuestionString(currentQuestionNumber-1))
	console.log(`from renderQuizPage(), the correct answer is "${getCorrectAnswer()}"`);
}

function createFeedbackString(i) {
	let obj = MasterQuizList[i];
	let question = obj['Question'];
	let correctAnswer = obj['Correct Answer'];
	let feedback = obj['Feedback'];
	let source = obj['Source'];
	// changed based on answerStatus
	let textResponse = "Sorry, that's not correct";
	let optCorrectResponse = `<p>${question}</p><div class="box button correct">${correctAnswer}</div> Is the right answer.`
	const string = (`
<h2>${textResponse}</h2>
<div class="answer-option">${optCorrectResponse}</div>
<p>${feedback}</p>
<p class="citation"><a href="${source}">source</a></p>
<button class="box button js-next-question">Next Question</button>
`);
	return (string);
}

function renderFeedback() {
	$('.js-feedback-section').html(createFeedbackString(currentQuestionNumber-1))


	// render, changing response based on right or wrong
}

function handleStartButton() {
	 $('.js-quiz-start').click(function() {
  		renderQuizPage ();
  		showSection ('.js-quiz-section')
  		runQuiz(currentQuestionNumber);

});
}


function getAnswerClicks() {

	// should return the array location of the answer

	$('.js-quiz-section').on('click', 'button', function(event) { 
	// $('.js-quiz-section').click($('.js-answer-a') =>nt) { 
		event.preventDefault();
		// let answer = $('.js-answer-a').click();
		let answer = event;
		// console.log($(answer).val()) ;
		console.log($(this).val());

		// alert($(this).attr("value"));
		// if ($(answer).hasClass('.js-answer-a')) {testAlert('it does')}
		console.log(`was A clicked? ${$(this).hasClass('js-answer-a')}`);


			
		// testAlert(answer.val());

	})
		// listen for answer
	
	// retrieve answer number
	// check for true against MasterQuizList
}



function checkAnswerStatus(answer) {
	// if 

		
}


function stopFormLoad() {
	$('.js-quiz-section').on('submit', 'button', function(event) { 
		event.preventDefault();
		// console.log($('.js-quiz-section').val);  
	})
}

function generateQuestions() {
	shuffle(MasterQuizList);
	quizList = MasterQuizList.slice(0,quizLength);
}

function shuffleAnswers() {
	for (i=0; i<quizList.length; i++) {
		let a = quizList[i];
		let b = a['Answers'];
		shuffle(b);
	}
}


function runQuiz(i) {
	// for(i; i<=quizLength; i++) {
	// 	renderQuizPage();
	// 	showSection('.js-quiz-section');
	// 	stopFormLoad();
	// 	getAnswerClicks();
	// 	checkAnswerStatus();
	// 	renderFeedback();
	// 	showSection('.js-feedback-section');
	// }
}


function initialize() {
	generateQuestions();
	shuffleAnswers();
	// stopFormLoad();
	handleStartButton();

	stopFormLoad();
	getAnswerClicks();
	// showSection(".js-feedback-section");


}


// $('.js-answer-a').on('click', testAlert());
// currentQuestionNumber++;
initialize();

	// renderFeedback();
	// showSection(".js-feedback-section");




