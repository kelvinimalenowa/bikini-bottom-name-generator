document.querySelector('button').addEventListener('click', wuTang)

function wuTang() {
    const questions = ['q1', 'q2', 'q3', 'q4', 'q5']
    const answers = questions.map(function (question) {
        const picked = document.querySelector('input[name = "' + question + '"]:checked')
        return picked ? picked.value : '' // <- the spot stays empty for an unchecked question, doesn't give a false return
    })
    if (answers.includes('')) {
        document.querySelector('#result').innerText = 'Protect ya NECK'
        return
    }
    const query = questions
        .map(function (question, index) {
            return question + '=' + answers[index];
        })
        .join('&')

        fetch('/api?' + query)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            document.querySelector('#result').innerText = 'Your name is' + data.name
        })
}