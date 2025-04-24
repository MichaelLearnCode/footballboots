import { Api } from "../../../api/api.js";

document.addEventListener('DOMContentLoaded', async () => {
    const productsWrapper = document.querySelector('.products-wrapper');
    const api = Api().init();
    
    for (let i = 0; i < 8; i++) {
        productsWrapper.innerHTML += `
        <div class="col">
            <div class="card mt-4 card-product">
                <div class="skeleton w-100" style="aspect-ratio: 1 / 1;"></div>
                <div class="card-body">
                    <div class="skeleton skeleton-text mb-3"></div>
                    <div class="d-flex justify-between">
                        <div class="skeleton skeleton-text" style="width: 40%;"></div>
                        <div class="skeleton skeleton-text" style="width: 30%;"></div>
                    </div>
                </div>
            </div>
        </div>`
    }
    
    try {
        const products = await api.get('/products');
        renderProducts(products);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        productsWrapper.innerHTML = `<div class="col-12 text-center py-5">
            <h3 class="text-danger">Không thể tải sản phẩm. Vui lòng thử lại sau.</h3>
        </div>`;
    }
    
    function renderProducts(products) {
        productsWrapper.innerHTML = '';
        
        if (!products || products.length === 0) {
            productsWrapper.innerHTML = `<div class="col-12 text-center py-5">
                <h3>Không có sản phẩm nào.</h3>
            </div>`;
            return;
        }
        
        productsWrapper.innerHTML = products.map(product => {
            const formattedPrice = new Intl.NumberFormat('vi-VN').format(product.price);
            
            return `
            <div class="col" onclick = "window.location.href = 'product.html?id=${product.id}'" data-product-id="${product.id}">
                <div class="card bg-white shadow-sm rounded-2 product-card position-relative">
                    <div class="card-img-wrapper position-relative">
                        <img src="${product.imgUrl}" class="card-img product-img" alt="${product.name}">
                        <div class="card-img-overlay"></div>
                    </div>
                    <div class="card-body p-3">
                        <h5 class="card-title h4 mb-2 text-limit-2">${product.name}</h5>
                        <div class="d-flex justify-between items-center">
                            <span class="text-danger weight-3 h3">${formattedPrice} VNĐ</span>
                            <span class="text-secondary">Đã bán ${product.sold}</span>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }).join('');
    }
});