import { Api } from "../../../api/api.js";

document.addEventListener('DOMContentLoaded', async () => {
    const blogWrapper = document.querySelector('.blogs-wrapper');
    const api = Api().init();
    
    for (let i = 0; i < 5; i++) {
        blogWrapper.innerHTML += `
        <div class="col">
            <div class="card mt-4 card-blog">
                <div class="skeleton w-100" style="aspect-ratio: 2 / 1;"></div>
                <div class="card-body">
                    <div class="skeleton skeleton-text mb-3"></div>
                    <p class="skeleton skeleton-text"></p>
                    <div class="mt-4 skeleton skeleton-text"></div>
                </div>
            </div>
        </div>`
    }
    
    try {
        const blogs = await api.get('/blogs2');
        renderBlogs(blogs);
    } catch (error) {
        console.error('Failed to fetch blogs:', error);
        blogWrapper.innerHTML = `<div class="col-12 text-center py-5">
            <h3 class="text-danger">Không thể tải bài viết. Vui lòng thử lại sau.</h3>
        </div>`;
    }
    
    function renderBlogs(blogs) {
        blogWrapper.innerHTML = '';
        
        if (!blogs || blogs.length === 0) {
            blogWrapper.innerHTML = `<div class="col-12 text-center py-5">
                <h3>Không có bài viết nào.</h3>
            </div>`;
            return;
        }
        
        blogWrapper.innerHTML = blogs.map(blog => {
            return `
            <div class="col" data-blog-id="${blog.id}">
                <div class="card blog-card bg-white shadow-sm rounded-2">
                    <div class="card-img-wrapper position-relative">
                        <img style="aspect-ratio: 3/2;" src="${blog.imgUrl}" class="card-img" alt="${blog.title}">
                        <div class="card-img-overlay"></div>
                    </div>
                    <div class="card-body p-3">
                        <h5 class="card-title h3 mb-2 text-limit-1">${blog.title}</h5>
                        <p class="card-text mb-4 text-limit-2">${blog.desc}</p>
                        <div class="d-flex justify-between">
                            <span class="text-secondary">${blog.date}</span>
                            <a href="#" class="btn btn-primary">Đọc thêm</a>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }).join('');
    }
});