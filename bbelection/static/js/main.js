document.addEventListener("DOMContentLoaded", function() {
  const candidateList = document.getElementById('election_results');
  axios.get('https://bb-election-api.herokuapp.com/').then((response) => {
    response.data.candidates.forEach((candidate) => {
      const newItem = document.createElement('li');
      const candidateString = `Name: ${candidate.name}\nVotes: ${candidate.votes}`;
      newItem.innerText = candidateString;
      candidateList.append(newItem);
    });
  })
});
