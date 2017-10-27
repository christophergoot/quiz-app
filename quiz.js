$(() => {
'use strict';

let quizLength = 5;
let currentQuestionNumber = 1;
let scoreCard = [];
let quizList = [];
const MasterQuizList = [
{ 'Question' : 'What age can you legally stop wearing a helmet?', 'Correct Answer' : '16', 'Answers' : [ '16', '13', 'Any Age', 'Never. All cyclists must wear helmets'], 'Feedback' : 'Additionally, it is against the law to carry a passenger under the age of 16 on your bicycle if the passenger is not wearing a helmet.', 'Source' : 'https://www.portlandoregon.gov/transportation/article/301187' },
{ 'Question' : 'What year was the "Bike Bill" written? <br>It states that all road projects must accomodate bicycles', 'Correct Answer' : '1971', 'Answers' : [ '1971', '1993', '2000', '2015'], 'Feedback' : 'It applies to ODOT, cities and counties and requires spending reasonable amounts of their share of the state highway fund on facilities for pedestrians and bicyclists. These facilities must be located within the right-of-way of public roads, streets or highways open to motor vehicle traffic. The funds cannot be spent on trails in parks or other areas outside of a road, street or highway right-of-way.', 'Source' : 'http://www.oregon.gov/odot/programs/pages/bikeped.aspx' },
{ 'Question' : 'On a road with no shoulder or bike lane you should ride', 'Correct Answer' : 'In the <strong>center</strong> of the lane', 'Answers' : [ 'In the <strong>center</strong> of the lane', 'The <strong>far right</strong> of the lane', 'Ride on the <strong>grass</strong>', 'Walk on the <strong>sidewalk</strong>'], 'Feedback' : 'This will prevent motorists from passing you when there isn\'t room. You should also take the lane when you\'re traveling at the same speed as traffic. This will keep you out of motorists\' blind spots and reduce conflicts with right-turning traffic.', 'Source' : 'https://docs.google.com/viewer?url=http%3A%2F%2Fwww.oregon.gov%2FODOT%2FPrograms%2FTDD%2520Documents%2FOregon-Bicyclist-Manual.pdf' },
{ 'Question' : 'In a car, at a red light with a "Bike Box". You are legally required to:', 'Correct Answer' : 'Wait <strong>behind box</strong> for the green light', 'Answers' : [ 'Wait <strong>behind box</strong> for the green light', 'Make a <strong>right hand turn</strong> if clear', 'Wait <strong>inside box</strong> if no bicycles are present', 'Bike Boxes are <strong>unregulated</strong>'], 'Feedback' : 'When you bike: Roll up to the front of the line when there\'s a yellow or red light. If the light is green, watch for vehicles turning right before continuing through the intersection. Only cyclists can take a right on red when there\'s a bike box.', 'Source' : 'https://www.portlandoregon.gov/transportation/article/594206' },
{ 'Question' : 'A bicycle with electric assist is legally considered:', 'Correct Answer' : 'A Bicycle', 'Answers' : [ 'A Bicycle', 'A Motor Vehicle', 'Illegal', 'A grey area'], 'Feedback' : 'This one has been on the books for over 20 years. 814.405: Status of electric assisted bicycle.', 'Source' : 'https://bikeportland.org/resources/bicyclelaws#814405' },
{ 'Question' : 'A bicyclist can ride on the sidewalk or crosswalk:', 'Correct Answer' : 'If it <strong>is safe</strong> to do so', 'Answers' : [ 'If it <strong>is safe</strong> to do so', 'They can <strong>only walk</strong> the bike', 'As if it were a <strong>bicycle lane</strong>', '<strong>Never</strong>'], 'Feedback' : 'Operation of an electric assisted bicycle on a sidewalk is NEVER permitted', 'Source' : 'https://bikeportland.org/resources/bicyclelaws#814405' },
{ 'Question' : 'A vehicle can park in a bicycle lane:', 'Correct Answer' : 'If they are <strong>making a delivery</strong>', 'Answers' : [ 'If they are <strong>making a delivery</strong>', 'Between <strong>8pm and 6am</strong>', 'If outside a <strong>job site</strong>', '<strong>Never</strong>'], 'Feedback' : 'An implement of husbandry may also momentarily cross into a bicycle lane to permit other vehicles to overtake and pass the implement of husbandry.', 'Source' : 'https://www.oregonlaws.org/ors/811.440' },
{ 'Question' : 'The average age of bicyclists killed in crashes with motor vehicles is', 'Correct Answer' : '45', 'Answers' : [ '45', '25', '35', '55'], 'Feedback' : 'The average age of bicyclists killed in crashes with motor vehicles continues to increase, climbing to 45 years old in 2014, up from 39 in 2004, 32 in 1998, and 24 in 1988.', 'Source' : 'http://www.pedbikeinfo.org/data/factsheet_crash.cfm' },
{ 'Question' : 'A bicyclist may proceed though a red light:', 'Correct Answer' : 'If the light does not turn green after <strong>one full cycle</strong>', 'Answers' : [ 'If the light does not turn green after <strong>one full cycle</strong>', 'After coming to a <strong>complete stop</strong>', '<strong>Never</strong>', 'If there are <strong>no cars</strong> around'], 'Feedback' : 'The 2015 law holds motorcyclists and bicyclists proceeding through a red liable if there\'s a collision with other road users proceeding through a green light. For motorcyclists, it would also apply to highway ramp meters.  Rolling through stop signs remains illegal.', 'Source' : 'http://www.oregonlive.com/commuting/index.ssf/2015/03/bicycles_oregon_law_run_red_li.html' },
{ 'Question' : 'A cyclist must signal a stop or turn while operating a bicycle:', 'Correct Answer' : '<strong>Always</strong> if they can', 'Answers' : [ '<strong>Always</strong> if they can', 'If they <strong>want</strong>', '<strong>Never</strong>', 'Only in a <strong>dense</strong> urban core'], 'Feedback' : 'Failure to signal for a bicycle turn is a Class D traffic violation since 1983', 'Source' : 'https://bikeportland.org/resources/bicyclelaws#814405' },
{ 'Question' : 'Unlawful passengers on bicycle', 'Correct Answer' : 'Where there are <strong>more butts</strong> than seats', 'Answers' : [ 'Where there are <strong>more butts</strong> than seats', 'Is <strong>not</strong> a real thing', 'Is only enforced at the <strong>circus</strong>', 'Only applies to riding on the <strong>handlebars</strong>'], 'Feedback' : 'A person operating an electric personal assistive mobility device is not subject to this section.', 'Source' : 'https://bikeportland.org/resources/bicyclelaws#814405' }
];

function getCorrectAnswer() {
	return(quizList[currentQuestionNumber-1]['Correct Answer']);
}

function showSection (section) {
	$('section').not(section).addClass('hidden');
	$(section).removeClass('hidden');
}

function add(a, b) {
    return(a + b);
}

function shuffle(arr) {
    let newArr = [];
    let currentHigh = 0;
    randArr = arr.map(() => Math.random());
    arr.forEach(() => {
        currentHigh = randArr.indexOf(Math.max(...randArr));
        newArr.push(arr[currentHigh]);
        randArr[currentHigh] = 0;
        currentHigh = 0;
    });
    return(newArr);
}

function createQuestionString(i) {
	let question = quizList[i].Question;
	let correctAnswer = quizList[i]['Correct Answer'];
	let correctAnswerCount = scoreCard.reduce(add, 0);
	let answers = quizList[i].Answers;
	const	string = (`
		<form>
			<h2>${question}</h2>
			<div>
				<label for="answer-a">a)</label>
				<button id="answer-a" value="${answers[0]}" class="button">${answers[0]}</button></div>
			<div>
				<label for="answer-b">b)</label>
				<button id="answer-b" value="${answers[1]}" class="button">${answers[1]}</button></div>
			<div>
				<label for="answer-c">c)</label>
				<button id="answer-c" value="${answers[2]}" class="button">${answers[2]}</button></div>
			<div>
				<label for="answer-d">d)</label>
				<button id="answer-d" value="${answers[3]}" class="button">${answers[3]}</button></div>
		</form>
		<div class="progress">
			<h4>Question ${currentQuestionNumber} of ${quizLength}
			<br>${correctAnswerCount} out of ${currentQuestionNumber-1} correct</h4>
		</div>`);
	return (string);
}

function renderQuizPage() {
	$('.js-quiz-section').html(createQuestionString(currentQuestionNumber-1))
}

function createFeedbackString(i, answerStatus) {
	let obj = MasterQuizList[i];
	let question = quizList[i]['Question'];
	let correctAnswer = quizList[i]['Correct Answer'];
	let correctAnswerCount = scoreCard.reduce(add, 0);
	let feedback = quizList[i]['Feedback'];
	let source = quizList[i]['Source'];
	let textResponse = "Sorry, that's not correct";
	if (answerStatus == 1) textResponse = "Correct!"
	let buttonAction = '<button value="next" class="button js-feedback-button">Next Question</button>'
	if (scoreCard.length === quizLength) buttonAction = '<button value="final" class="button js-feedback-button">See Results</button>'
	let optCorrectResponse = `<p>${question}</p><h2>${correctAnswer}</h2>`
	const string = (`
		<div class="feedback-splash"><h2>${textResponse}</h2>
			<div class="answer-recall">${optCorrectResponse}</div>
			<p>${feedback}
			<cite><a href="${source}">source</a></cite></p>
			<div class="progress">
				<h4>Question ${currentQuestionNumber} of ${quizLength}
				<br>${correctAnswerCount} out of ${currentQuestionNumber} correct</h4>
			</div>	
			${buttonAction}
		</div>
	`);
	return (string);
}

function visualizeAnswerStatus(answerStatus) {
	if (answerStatus === 1) {
		$('.js-feedback-section').removeClass('incorrect');
		$('.js-feedback-section').addClass('correct');  
	}
	if (answerStatus === 0) {	
		$('.js-feedback-section').removeClass('correct');
		$('.js-feedback-section').addClass('incorrect'); 
	}
}

function renderFeedback(answerStatus) {
	visualizeAnswerStatus(answerStatus);
	$('.js-feedback-section').html(createFeedbackString(currentQuestionNumber-1, answerStatus));
}

function critiqueScore(score) {
	let string = "a Terrible";
	if (score >= 100) string = "an Absolutely Perfect";
	else if (score >= 80) string = "a Rather Impressive";
	else if (score >= 60) string = "a Solid";
	else if (score >= 40) string = "an Unispiring";
	return(string);
}


function renderFinal() {
	let correctAnswerCount = scoreCard.reduce(add, 0);
	let correctPercent = correctAnswerCount/quizLength*100;
	let scoreCritique = critiqueScore(correctPercent);
	let string = (`<h2>Quiz Complete</h2>
				<h1>${correctPercent}% Correct</h1>
				<p>Thank you for taking the quiz. It turns out you have 
				<span class="critique">${scoreCritique}</span>
				knowledge of bicycle laws and safety in Oregon</p>
				<button value="Start Again" class="button">Take The Quiz Again</button>
		<div class="progress">
			<h4>${correctAnswerCount} out of ${currentQuestionNumber} correct</h4>
		</div>
				`);
	$('.js-final-section').html(string);
}

function quizStart() {
	renderQuizPage ();
	showSection ('.js-quiz-section')
}

function resolveAnswer(answer) {
	event.preventDefault();
	let status = 0;
	if (answer == getCorrectAnswer()) status = 1;
	scoreCard.push(status);
	renderFeedback(status);
	showSection('.js-feedback-section');
}

function resolveFeedbackButton() {
	event.preventDefault();
	let buttonValue = $('.js-feedback-button').val();
	if (buttonValue === "next") {
		currentQuestionNumber++;
		renderQuizPage();
		showSection('.js-quiz-section');	}
	else if (buttonValue === "final") {
		renderFinal();
		showSection('.js-final-section');	}
}



function handleTheClicks() {
	$('.js-quiz-start').click(function() { quizStart() });
	$('.js-quiz-section').on('click', 'button', function() { 
				event.preventDefault();
				resolveAnswer($(this).val()); });
	$('.js-feedback-section').on('click', 'button', function(event) { 
		event.preventDefault();
		resolveFeedbackButton($(this).val());
	});
	$('.js-final-section').on('click', 'button', function(event) { 
		reInitialize();
	});
}

function handleTheKeys() {
	$('body').keypress(function(event) {
		let key = event.which;
		if (!$('.js-quiz-section').hasClass("hidden")) {
			if (key == 97 || key == 65) resolveAnswer($('#answer-a').val());
			if (key == 98 || key == 66) resolveAnswer($('#answer-b').val());
			if (key == 99 || key == 67) resolveAnswer($('#answer-c').val());
			if (key == 100 || key == 68) resolveAnswer($('#answer-d').val());			}
		else if (!$('.js-start-section').hasClass("hidden")) 	quizStart();
		else if (!$('.js-feedback-section').hasClass("hidden"))	resolveFeedbackButton();
		else if (!$('.js-final-section').hasClass("hidden")) 	reInitialize();
		})
	}

function generateQuestions() {
	quizList = shuffle(MasterQuizList).slice(0,quizLength);
}

function shuffleAnswers() {
	quizList.forEach((val) => val.Answers = shuffle(val.Answers));
}

function reInitialize() {
	currentQuestionNumber = 1;
	scoreCard = [];
	quizList = [];
	generateQuestions();
	shuffleAnswers();
	renderQuizPage();
	showSection('.js-quiz-section');

}

function initialize() {
	generateQuestions();
	shuffleAnswers();
	handleTheClicks();
	handleTheKeys();
}

initialize();

});