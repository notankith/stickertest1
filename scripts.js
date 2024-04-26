// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const stickerForm = document.getElementById('stickerForm');
    const stickerDisplay = document.getElementById('stickerDisplay');
  
    stickerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(stickerForm);
      const stickerData = Object.fromEntries(formData.entries());
  
      try {
        const response = await fetch('/api/stickers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stickerData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save sticker');
        }
  
        const newSticker = await response.json();
  
        // Display the newly saved sticker
        const stickerElement = document.createElement('div');
        stickerElement.classList.add('border', 'rounded', 'p-4', 'mb-4');
        stickerElement.innerHTML = `
          <p><strong>Product Code:</strong> ${newSticker.productCode}</p>
          <p><strong>Product Name:</strong> ${newSticker.productName}</p>
          <p><strong>Expiry Date:</strong> ${newSticker.expiry}</p>
          <p><strong>MRP:</strong> ${newSticker.mrp}</p>
          <p><strong>Contact:</strong> ${newSticker.contact}</p>
        `;
        stickerDisplay.appendChild(stickerElement);
  
        // Clear form fields
        stickerForm.reset();
      } catch (error) {
        console.error(error.message);
      }
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', saveSticker);
});

async function saveSticker() {
    const productCode = document.getElementById('productCode').value;
    const productName = document.getElementById('productName').value;
    const expiry = document.getElementById('expiry').value;
    const mrp = document.getElementById('mrp').value;
    const contact = document.getElementById('contact').value;

    const stickerData = {
        productCode,
        productName,
        expiry,
        mrp,
        contact
    };

    try {
        const response = await fetch('/api/stickers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stickerData)
        });

        if (!response.ok) {
            throw new Error('Failed to save sticker');
        }

        // Clear input fields after successful save
        document.getElementById('productCode').value = '';
        document.getElementById('productName').value = '';
        document.getElementById('expiry').value = '';
        document.getElementById('mrp').value = '';
        document.getElementById('contact').value = '';

        alert('Sticker saved successfully!');
    } catch (error) {
        console.error('Error saving sticker:', error);
        alert('Failed to save sticker. Please try again.');
    }
}
