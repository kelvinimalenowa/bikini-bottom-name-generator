document.querySelector('#generate').addEventListener('click', generateName)

function generateName() {
    const questions = ['q1', 'q2', 'q3', 'q4', 'q5']

    const answers = questions.map(function(question) {
        const picked = document.querySelector('input[name="' + question + '"]:checked')
        return picked ? picked.value : ''
    })

    if (answers.includes('')) {
        document.querySelector('#result').innerText = 'Answer every question!'
        return
    }

    const query = questions
        .map(function(question, index) {
            return question + '=' + answers[index]
        })
        .join('&')

    fetch('/api?' + query)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            document.querySelector('#result').innerText = 'Welcome to Bikini Bottom, ' + data.name + '!'
        })
}