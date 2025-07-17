alert("HEY")

const question = [
    {
        question: "Qu'elle est l'attaque la plus puissante du neuveu d'Eray ?",
        answer: ["DEMACIAA", "Il sont ou tous !", "Prière ventrale"],
        correctIndex: 1
    },
    {
        question: "Quelle est la replique de Jibrol la plus utilisée",
        answer: ["Si tu veux hein", "Comment ca monstuff", "Purée d'haceleur"],
        correctIndex: 0
    }

];

var currentQuestionIndex = 0
var score = 0

const reponse = getElementsByClassName("answer-button")
const questionText = getElementById("question-text").textContent

function showQuestion(){
    reponse.textContent = question;

    const currentQuestion = questions[currentQuestionIndex]
    questionText = currentQuestion.question
    const buttons = getElementsByClassName("answer-button")

    buttons.forEach((button, index) =>{
        button.textContent = currentQuestion.answers[index]
        button.disabled = false
        button.computedStyleMap.backgroundColor = ""
    })
};

showQuestion