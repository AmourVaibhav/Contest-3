// Function to fetch data from API using .then
function fetchDataWithThen() {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
      .then(response => response.json())
      .then(data => renderData(data))
      .catch(error => console.log(error));
  }
  
  // Function to fetch data from API using async/await
  async function fetchDataWithAsyncAwait() {
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
      const data = await response.json();
      renderData(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  // Function to render data in the table
  function renderData(data) {
    const tableBody = document.getElementById('cryptoTableBody');
    tableBody.innerHTML = '';
  
    data.slice(0, 8).forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><img src="images/${coin.id}.png" alt="${coin.name} Logo" class="coin-image">${coin.name}</td>
          <td>${coin.symbol}</td>
          <td>$${coin.current_price}</td>
          <td>$${coin.total_volume}</td>
          <td class="${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}">${coin.price_change_percentage_24h.toFixed(2)}%</td>
          <td>Market Cap: $${formatMarketCap(coin.market_cap)}</td>
        `;
      tableBody.appendChild(row);
    });
  }
  
  // Function to filter data based on user input
function search() {
    const searchInput = document.getElementById('searchInput');
    const filter = searchInput.value.toUpperCase();
    const table = document.getElementById('cryptoTable');
    const rows = table.getElementsByTagName('tr');
  
    for (let i = 0; i < rows.length; i++) {
      const nameCell = rows[i].getElementsByTagName('td')[0];
      if (nameCell) {
        const nameValue = nameCell.textContent || nameCell.innerText;
        const symbolCell = rows[i].getElementsByTagName('td')[2];
        const symbolValue = symbolCell.textContent || symbolCell.innerText;
        if (nameValue.toUpperCase().indexOf(filter) > -1 || symbolValue.toUpperCase().indexOf(filter) > -1) {
          rows[i].style.display = '';
        } else {
          rows[i].style.display = 'none';
        }
      }
    }
  }
  
  // Function to filter data based on user input
  function search() {
    const searchInput = document.getElementById('searchInput');
    const filter = searchInput.value.toUpperCase();
    const table = document.getElementById('cryptoTable');
    const rows = table.getElementsByTagName('tr');
  
    for (let i = 0; i < rows.length; i++) {
      const nameCell = rows[i].getElementsByTagName('td')[0];
      if (nameCell) {
        const nameValue = nameCell.textContent || nameCell.innerText;
        if (nameValue.toUpperCase().indexOf(filter) > -1) {
          rows[i].style.display = '';
        } else {
          rows[i].style.display = 'none';
        }
      }
    }
  }
  
  // Function to sort data based on market cap
  function sortMarketCap() {
    const tableBody = document.getElementById('cryptoTableBody');
    const rows = Array.from(tableBody.getElementsByTagName('tr'));
  
    rows.sort((a, b) => {
      const marketCapA = parseFloat(a.getElementsByTagName('td')[3].textContent.replace('$', '').replace(/,/g, ''));
      const marketCapB = parseFloat(b.getElementsByTagName('td')[3].textContent.replace('$', '').replace(/,/g, ''));
  
      return marketCapB - marketCapA;
    });
  
    rows.forEach(row => tableBody.appendChild(row));
  }
  
  // Function to sort data based on percentage change
  function sortPercentageChange() {
    const tableBody = document.getElementById('cryptoTableBody');
    const rows = Array.from(tableBody.getElementsByTagName('tr'));
  
    rows.sort((a, b) => {
      const percentageChangeA = parseFloat(a.getElementsByTagName('td')[4].textContent.replace('$', '').replace(/,/g, ''));
      const percentageChangeB = parseFloat(b.getElementsByTagName('td')[4].textContent.replace('$', '').replace(/,/g, ''));
  
      return percentageChangeB - percentageChangeA;
    });
  
    rows.forEach(row => tableBody.appendChild(row));
  }
  
  // Event listeners
  document.getElementById('searchInput').addEventListener('keyup', search);
  document.getElementById('sortMarketCap').addEventListener('click', sortMarketCap);
  document.getElementById('sortPercentageChange').addEventListener('click', sortPercentageChange);
  
  // Initial data fetch
  fetchDataWithThen();
  // OR
  // fetchDataWithAsyncAwait();
  