document.addEventListener('DOMContentLoaded', async () => {
    const menuContainer = document.querySelector('.menu-container');

    // Fungsi untuk memuat menu dari API
    const loadMenu = async () => {
        try {
            const response = await fetch('http://localhost:3000/menu');
            const menuItems = await response.json();
            menuContainer.innerHTML = ''; // Clear the container

            menuItems.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';
                menuItem.dataset.menuId = item.id;
                
                menuItem.innerHTML = `
                    <h3>${item.nama}</h3>
                    <p>Harga: <span class="price">${item.harga}</span></p>
                    <p>${item.deskripsi}</p>
                    <img src="${item.foto}" alt="${item.nama}" class="menu-image">
                    <button class="buy-button">Beli</button>
                    <div class="quantity-controls" style="display: none;">
                        <button class="minus">-</button>
                        <input type="number" class="quantity" value="1" min="1">
                        <button class="plus">+</button>
                        <button class="confirm">Konfirmasi</button>
                    </div>
                `;
                
                menuContainer.appendChild(menuItem);
            });
            
            addEventListeners();
        } catch (error) {
            console.error('Error loading menu:', error);
        }
    };

    // Fungsi untuk menambahkan event listener ke tombol dan kontrol
    const addEventListeners = () => {
        const menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            const buyButton = item.querySelector('.buy-button');
            const quantityControls = item.querySelector('.quantity-controls');
            const quantityInput = item.querySelector('.quantity');
            const minusButton = item.querySelector('.minus');
            const plusButton = item.querySelector('.plus');
            const confirmButton = item.querySelector('.confirm');

            buyButton.addEventListener('click', () => {
                buyButton.style.display = 'none';
                quantityControls.style.display = 'flex';
            });

            minusButton.addEventListener('click', () => {
                let quantity = parseInt(quantityInput.value);
                if (quantity > 1) {
                    quantityInput.value = quantity - 1;
                }
            });

            plusButton.addEventListener('click', () => {
                let quantity = parseInt(quantityInput.value);
                quantityInput.value = quantity + 1;
            });

            confirmButton.addEventListener('click', async () => {
                const menuId = item.dataset.menuId;
                const jumlah = quantityInput.value;

                try {
                    const response = await fetch('http://localhost:3000/transaksi', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTcyMzczNjA3MSwiZXhwIjoxNzIzNzM5NjcxfQ.WeaobmaqQI9WmkaIHlYaQ-M31OQP8JE7Uj9gwdzbKXA' // replace with actual token
                        },
                        body: JSON.stringify({ menuId, jumlah })
                    });

                    const data = await response.json();
                    if (response.ok) {
                        window.open(data.payment_url, '_blank'); // Open payment URL in a new tab
                    } else {
                        alert(data.error || 'Terjadi kesalahan saat memproses transaksi.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Terjadi kesalahan saat memproses transaksi.');
                }
            });
        });
    };

    // Memuat menu saat halaman dimuat
    loadMenu();
});
