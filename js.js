
        const apiKey = '328274ac3aa144df31608013'; // Replace with your actual API key
        const apiUrl = 'https://v6.exchangerate-api.com/v6/328274ac3aa144df31608013/latest/USD';

        let currencyData = {}; // Store exchange rate data

        // Fetch exchange rates and populate dropdowns
        async function fetchCurrencies() {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                currencyData = data.conversion_rates;

                const currencyList = Object.keys(currencyData);
                const fromSelect = document.getElementById("fromCurrency");
                const toSelect = document.getElementById("toCurrency");

                currencyList.forEach(currency => {
                    let option1 = new Option(currency, currency);
                    let option2 = new Option(currency, currency);
                    fromSelect.add(option1);
                    toSelect.add(option2);
                });

                fromSelect.value = "USD";  // Default selection
                toSelect.value = "EUR";   // Default selection
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
            }
        }

        // Convert currency based on user input
        function convertCurrency() {
            const amount = parseFloat(document.getElementById("amount").value);
            const fromCurrency = document.getElementById("fromCurrency").value.toUpperCase();
            const toCurrency = document.getElementById("toCurrency").value.toUpperCase();

            if (isNaN(amount) || amount <= 0) {
                alert("Please enter a valid amount.");
                return;
            }

            if (currencyData[fromCurrency] && currencyData[toCurrency]) {
                const conversionRate = currencyData[toCurrency] / currencyData[fromCurrency];
                const convertedAmount = (amount * conversionRate).toFixed(3);
                document.getElementById("result").innerText =
                    `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            } else {
                alert("Invalid currency selection.");
            }
        }

        // Initialize dropdowns
        fetchCurrencies();
