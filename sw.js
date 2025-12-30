const scannerFrame = document.getElementById('scanner-frame');
const historyList = document.getElementById('history-list');
const clearBtn = document.getElementById('clear-btn');

// MOCK FUNCTION: Trigger this when your barcode library detects a code
function handleScanSuccess(barcodeData) {
    // 1. Visual Feedback: Change frame to Green
    scannerFrame.classList.add('scanning-success');

    // 2. Add item to the list
    const timestamp = new Date().toLocaleTimeString();
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span class="code">${barcodeData}</span>
        <span class="time">${timestamp}</span>
    `;
    historyList.prepend(listItem);

    // 3. Show the Clear Button
    clearBtn.classList.remove('hidden');

    // 4. Reset frame color after 600ms
    setTimeout(() => {
        scannerFrame.classList.remove('scanning-success');
    }, 600);
}

// THE CLEAR FUNCTION
function clearAll() {
    // Empty the list
    historyList.innerHTML = '';
    // Hide the button again
    clearBtn.classList.add('hidden');
}

// Example: Simulate a scan for testing purposes
// setTimeout(() => handleScanSuccess("1234567890"), 2000);