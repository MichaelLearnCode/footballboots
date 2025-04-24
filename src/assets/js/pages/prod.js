import { Api } from "../../../api/api.js";

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    const productDetailWrapper = document.querySelector('.product-detail-wrapper');
    
    const api = Api().init();
    
    productDetailWrapper.innerHTML = `
        <div class="row g-0 g-md-2 g-lg-6 g-xl-8">
            <div class="col-12 col-md-5 mb-4 mb-md-0">
                <div class="bg-light p-3 rounded-2 d-flex justify-center align-center">
                    <div class="skeleton w-100" style="aspect-ratio: 1 / 1;"></div>
                </div>
            </div>
            <div class="col-12 col-md-7">
                <div class="px-0 px-md-3">
                    <div class="skeleton skeleton-text mb-3" style="height: 2.5rem; width: 80%;"></div>
                    
                    <div class="mb-4">
                        <div class="skeleton skeleton-text mb-2" style="height: 2rem; width: 50%;"></div>
                        <div class="d-flex items-center">
                            <div class="skeleton skeleton-text me-2" style="width: 30%;"></div>
                            <div class="skeleton skeleton-text" style="width: 15%;"></div>
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <div class="skeleton skeleton-text mb-2" style="width: 40%; height: 1.5rem;"></div>
                        <div class="skeleton skeleton-text mb-1" style="width: 100%;"></div>
                        <div class="skeleton skeleton-text mb-1" style="width: 90%;"></div>
                        <div class="skeleton skeleton-text" style="width: 80%;"></div>
                    </div>
                    
                    <div class="mb-4">
                        <div class="skeleton skeleton-text" style="width: 25%;"></div>
                    </div>
                    
                    <div class="mb-4">
                        <div class="skeleton skeleton-text mb-2" style="width: 30%; height: 1.5rem;"></div>
                        <div class="d-flex items-center">
                            <div class="skeleton" style="width: 30px; height: 30px;"></div>
                            <div class="skeleton mx-2" style="width: 50px; height: 30px;"></div>
                            <div class="skeleton" style="width: 30px; height: 30px;"></div>
                        </div>
                    </div>
                    
                    <div class="skeleton" style="width: 200px; height: 48px;"></div>
                </div>
            </div>
        </div>
    `;
    
    function formatPrice(price) {
        return new Intl.NumberFormat('vi-VN').format(price);
    }
    
    function addToCart(id, quantity) {
        
    }
    
    try {
        if (!productId) {
            throw new Error('Missing product ID');
        }
        
        const product = await api.get(`/products/${productId}`);
        
        if (!product) {
            throw new Error('Product not found');
        }
        
        const originalPriceValue = Math.round(product.price * 1.37);
        
        productDetailWrapper.innerHTML = `
            <div class="row g-0 g-md-2 g-lg-6 g-xl-8">
                <div class="col-12 col-md-5 mb-4 mb-md-0">
                    <div class="product-image-container bg-light p-3 rounded-2 d-flex justify-center align-center">
                        <img src="${product.imgUrl}" alt="${product.name}" class="product-image">
                    </div>
                </div>
                <div class="col-12 col-md-7">
                    <div class="product-info">
                        <h1 class="weight-3 mb-3">${product.name}</h1>
                        
                        <div class="product-price mb-4">
                            <div class="current-price h1 text-danger weight-3 mb-1">${formatPrice(product.price)} VNĐ</div>
                            <div class="price-info d-flex items-center">
                                <span class="original-price h4 me-2">${formatPrice(originalPriceValue)} VNĐ</span>
                                <span class="bg-danger text-white py-1 px-2 rounded">-37%</span>
                            </div>
                        </div>
                        
                        <div class="product-description mb-4">
                            <h3 class="mb-2">Mô tả sản phẩm</h3>
                            <p class="text-secondary">${product.desc}</p>
                        </div>
                        
                        <div class="product-sold mb-4">
                            <span class="text-secondary">Đã bán ${product.sold}</span>
                        </div>
                        
                        <div class="product-quantity mb-4">
                            <h3 class="mb-2">Số lượng</h3>
                            <div class="d-flex items-center">
                                <button class="btn-quantity" id="decreaseQuantity">-</button>
                                <input type="number" min="1" value="1" class="quantity-input mx-2" id="quantityInput">
                                <button class="btn-quantity" id="increaseQuantity">+</button>
                            </div>
                        </div>
                        
                        <div class="product-actions">
                            <button class="btn bg-success text-white px-4 py-3 cursor-pointer" id="addToCartBtn">
                                <i class="fa-solid fa-cart-plus me-2"></i>Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Set page title
        document.title = product.name + ' - Football Boots';
        
        // Add event listeners after rendering the HTML
        const quantityInput = document.getElementById('quantityInput');
        const decreaseQuantity = document.getElementById('decreaseQuantity');
        const increaseQuantity = document.getElementById('increaseQuantity');
        const addToCartBtn = document.getElementById('addToCartBtn');
        
        decreaseQuantity.addEventListener('click', () => {
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });
        
        increaseQuantity.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });
        
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            addToCart(productId, quantity);
        });
        
    } catch (error) {
        console.error('Failed to fetch product details:', error);
        
        // Show error message
        productDetailWrapper.innerHTML = `
            <div class="text-center py-5">
                <i class="fa-solid fa-circle-exclamation text-danger" style="font-size: 3rem;"></i>
                <h3 class="text-danger mt-3">Không thể tải thông tin sản phẩm</h3>
                <p class="text-secondary mt-2">Vui lòng thử lại sau hoặc quay lại trang sản phẩm</p>
                <a href="products.html" class="btn btn-outline-primary mt-3">Quay lại trang sản phẩm</a>
            </div>
        `;
    }
});