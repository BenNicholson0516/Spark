

const Submit = document.getElementById('Submit')
const ReportedProblem = document.getElementById('ReportedProblem').value;
Submit.addEventListener("click", function(event) {
    event.preventDefault();
    if (ReportedProblem == "The man") {
        alert("Who sold the world")
    }
})