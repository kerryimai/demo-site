

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const comment = document.getElementById('comment').value;
  const userId = document.getElementById('name').value;

  fetch('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment, userId}),
  })
    .then(fetchData)
});

const fetchData = () => {
  const filterText = document.getElementById('filterText').value;
  const endpoint = filterText ? `/comments?userId=${filterText}` : `/comments`;
  fetch(endpoint).then(x => x.json())
    .then(x => x.response[0])
    .then(comments => {
      const commentNode = document.getElementById('comments');
      commentNode.innerHTML = '';
      for (let commentContainer of comments) {
        const { user_id, comment } = commentContainer;
        const div = document.createElement('div');
        div.innerHTML = `<div>A comment by <b>${user_id}</b>: ${comment}</div>`;
        commentNode.appendChild(div);
      }

    })
}

document.getElementById('filter').addEventListener('submit', (e) => {
  e.preventDefault();
  fetchData();
});

fetchData();