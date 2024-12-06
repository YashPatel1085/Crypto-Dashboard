// Fetching crypto data from CoinGecko API
function fetchCryptoData() {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1')
  .then(response => response.json())
  .then(data => {
      if (data && data.length > 0) {
          const tableBody = document.querySelector('#cryptoTable tbody');
          tableBody.innerHTML = '';

          data.forEach(coin => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${coin.name}</td>
                  <td>${coin.symbol.toUpperCase()}</td>
                  <td>$${coin.current_price.toFixed(2)}</td>
                  <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
              `;
              tableBody.appendChild(row);
          });
      } else {
          console.error("No data returned from API.");
          document.querySelector('#cryptoTable tbody').innerHTML = '<tr><td colspan="4">Failed to load data. Try again later.</td></tr>';
      }
  })
  .catch(error => {
      console.error("Error fetching data: ", error);
      document.querySelector('#cryptoTable tbody').innerHTML = '<tr><td colspan="4">Failed to load data. Try again later.</td></tr>';
  });
}


fetchCryptoData();

// Contact Form Validation
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const feedback = document.getElementById('feedback');
  if (name && email && message) {
      feedback.textContent = 'Thank you for reaching out! We will get back to you soon.';
      feedback.style.color = 'green';
  } else {
      feedback.textContent = 'Please fill in all fields.';
      feedback.style.color = 'red';
  }
});


fetchCryptoData();
