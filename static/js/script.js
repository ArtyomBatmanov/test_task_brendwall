// Получаем элементы формы и таблицы
const productForm = document.getElementById('product-form');
const productsTableBody = document.querySelector('#products-table tbody');

// Функция для отправки POST-запроса и добавления нового продукта
productForm.addEventListener('submit', async function(event) {
    event.preventDefault();  // Останавливаем стандартное поведение формы

    // Получаем данные из формы
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    // Формируем объект для отправки
    const productData = {
        name: name,
        description: description,
        price: parseFloat(price)
    };

    // Отправляем POST-запрос на сервер
    const response = await fetch('/api/products/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
    });

    // Проверяем, что продукт успешно добавлен
    if (response.ok) {
        // Очищаем форму
        productForm.reset();
        // Обновляем список продуктов
        loadProducts();
    } else {
        alert('Ошибка при добавлении продукта.');
    }
});

// Функция для загрузки продуктов и обновления таблицы
async function loadProducts() {
    const response = await fetch('/api/products/');
    const products = await response.json();

    // Очищаем таблицу перед добавлением новых данных
    productsTableBody.innerHTML = '';

    // Заполняем таблицу продуктами
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.description ? product.description : 'Нет описания'}</td>
            <td>${product.price}</td>
        `;
        productsTableBody.appendChild(row);
    });
}

// Загружаем продукты при загрузке страницы
loadProducts();
