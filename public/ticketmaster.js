document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const numberOfTickets = document.getElementById('numberOfTickets').value;
  const withDiscount = document.getElementById('discount').checked;
  fetch('/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ numberOfTickets, withDiscount }),
  }).then(x => {
    document.getElementById('results').innerHTML = `
      You purchased ${numberOfTickets} tickets with ${withDiscount ? 'a' : 'no'} discount.
      Thank you! Enjoy the Jonas Brothers concert!
      <img src="https://www.billboard.com/files/media/02-Jonas-Brothers-press-by-Peggy-Sirota-2019-billboard-1548.jpg" />
    `
  })
});
