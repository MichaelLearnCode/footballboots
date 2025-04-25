import { Api } from "../../../api/api.js";
import { alert } from "../utils.js";

const api = Api().init();

document.addEventListener('DOMContentLoaded', async () => {
    if (!localStorage.getItem('access_token')) {
        window.location.href = '/login.html';
    }
    const users = await api.get('/users2',{custom: (user) => user.access_token === localStorage.getItem('access_token')});
    const user = users[0];
    const cart = user.cart || [];

    const cartTableBody = document.querySelector('.cart-table-body');
    let totalPrice = 0;
    cart.forEach(item => {
        const product = item.product;
        const quantity = item.quantity;
        const formattedPrice = new Intl.NumberFormat('vi-VN').format(product.price * quantity);
        cartTableBody.innerHTML += `
            <tr data-product-id="${product.id}">
                <td><div class = "flex row row-cols-1 row-cols-md-2 items-center">
                        <div class = "col"><a class = "text-decoration-none" href = 'product.html?id=${product.id}'><img src="${product.imgUrl}" alt="${product.name}" class="cart-product-img"></a></div>
                        <div class = "col">${product.name}</div>
                    </div></td>
                <td>${formattedPrice} VNĐ</td>
                <td class="text-center">${quantity}</td>
                <td class="text-center"><button class="btn bg-error px-5 py-2 text-white cursor-pointer remove-from-cart">Xóa</button></td>
            </tr>
        `;
        totalPrice += product.price * quantity;
    });
    const checkoutTotal = document.querySelector('.checkout-total');
    checkoutTotal.innerHTML = `Tổng tiền: <span class="text-danger">${new Intl.NumberFormat('vi-VN').format(totalPrice)} VNĐ</span>`;
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const row = e.target.closest('tr');
            const productId = row.dataset.productId;
            const productIndex = cart.findIndex(item => item.product.id === productId);
            if (productIndex !== -1) {
                totalPrice -= cart[productIndex].product.price * cart[productIndex].quantity;
                cart.splice(productIndex, 1);
                user.cart = cart;
                await api.put(`/users2/${user.id}`, user);
                row.remove();
                checkoutTotal.innerHTML = `Tổng tiền: <span class="text-danger">${new Intl.NumberFormat('vi-VN').format(totalPrice)} VNĐ</span>`;
                alert('Xóa sản phẩm khỏi giỏ hàng thành công', 'success');
            }
        });
    });
})