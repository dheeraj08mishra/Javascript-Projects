document.addEventListener("DOMContentLoaded", function () {
  const questionForm = document.getElementById("question");
  const fetchCategoryResponse = fetch("https://opentdb.com/api_category.php");
  const categorySelect = document.getElementById("category");
  const submitBtn = document.getElementById("submit");

  fetchCategoryResponse
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.trivia_categories.forEach((list) => {
        const option = document.createElement("option");
        option.value = list.id;
        option.innerHTML = list.name;
        categorySelect.appendChild(option);
      });
      fetchQuestion(categorySelect.value);
    })
    .catch((error) => {
      console.log(error);
    });
  let correct_answers = [];

  const fetchQuestion = (category) => {
    let url = `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        result.results.forEach((question, index) => {
          const answers = question.incorrect_answers;
          correct_answers.push(question.correct_answer);
          answers.push(question.correct_answer);
          answers.sort();
          let questionPara = document.createElement("p");
          questionPara.innerHTML = question.question;
          questionPara.id = `question${++index}`;
          let questionCount = document.createElement("p");
          questionCount.innerHTML = `Question ${index}`;
          questionForm.appendChild(questionCount);
          questionForm.appendChild(questionPara);

          answers.forEach((answer) => {
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `${questionPara.id}`;
            radio.value = answer;
            radio.id = `${questionPara.id}_${answer}`;
            const label = document.createElement("label");
            label.innerHTML = answer;
            label.htmlFor = `${questionPara.id}_${answer}`;
            questionForm.appendChild(radio);
            questionForm.appendChild(label);
            questionForm.appendChild(document.createElement("br"));
          });
        });
      });
  };
  categorySelect.addEventListener("change", (event) => {
    questionForm.innerHTML = "";
    correct_answers = [];
    fetchQuestion(event.target.value);
  });

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let score = 0;
    correct_answers.forEach((correct_answer, index) => {
      const questionId = `question${index + 1}`;
      const selectedOption = questionForm.querySelector(
        `input[name="${questionId}"]:checked`
      );
      if (selectedOption && selectedOption.value === correct_answer) {
        score++;
      }
    });
    alert(`You scored ${score} out of ${correct_answers.length}`);
  });
});
