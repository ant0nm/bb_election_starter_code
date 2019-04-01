document.addEventListener("DOMContentLoaded", function() {
  const candidateList = document.getElementById('election_results');
  const refreshButton = document.getElementById('refresh');
  refreshButton.addEventListener('click', event => {
    candidateList.innerHTML = '';
    displayVotes(candidateList);
  });
  displayVotes(candidateList);

  // function declarations are hoisted to the top
  function displayVotes(candidatelist) {
    axios.get('https://bb-election-api.herokuapp.com/').then(response => {
      response.data.candidates.forEach(candidate => {

        // add voting results for each candidate
        const newItem = document.createElement('li');
        const candidateString = `Name: ${candidate.name}\nVotes: ${candidate.votes}`;
        newItem.innerText = candidateString;
        candidateList.append(newItem);

        // add a voting form for each candidate
        const newForm = document.createElement('form');
        newForm.method = "POST";
        newForm.action = "https://bb-election-api.herokuapp.com/vote";
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'id';
        hiddenInput.value = candidate.id;
        const submitInput = document.createElement('input');
        submitInput.type = 'submit';
        submitInput.value = `VOTE for ${candidate.name}`;
        newForm.append(hiddenInput);
        newForm.append(submitInput);
        newItem.append(newForm);
      });
    })
  }
});

document.addEventListener('submit', event => {
  event.preventDefault();
  const candidate_id = event.target.querySelector('input[type=hidden]').value;
  axios.post('https://bb-election-api.herokuapp.com/vote', {id: candidate_id})
    .then(response => {
      console.log(response.data);
      const refreshButton = document.getElementById('refresh');
      refreshButton.click();
    })
    .catch(error => console.log(error))
});
