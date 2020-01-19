document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('.search');
    const cartBtn = document.getElementById('cart');
    const wishListBtn = document.getElementById('wishlist');
    const goodsWrapper = document.querySelector('.goods-wrapper');
    const cart = document.querySelector('.cart');
    const category = document.querySelector('.category');

    const getGoods = (handler, filter) => {
        fetch('db/db.json')
            .then(response => response.json())
            .then(filter)
            .then(handler);
    };

    const randomSort = item => item.sort(() => Math.random() - 0.5);

    const createCardGoods = (id, title, price, img) => {
        const card = document.createElement('div');
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML = ` <div class="card">
                                    <div class="card-img-wrapper">
                                        <img class="card-img-top" src="${img}" alt="">
                                        <button class="card-add-wishlist" data-goods-id='${id}'></button>
                                    </div>
                                    <div class="card-body justify-content-between">
                                        <a href="#" class="card-title">${title}</a>
                                        <div class="card-price">${price} ₽</div>
                                        <div>
                                            <button class="card-add-cart" data-goods-id='${id}'>Добавить в корзину</button>
                                        </div>
                                    </div>
                                </div>`;

        return card;
    };

    const renderCard = items => {
        goodsWrapper.textContent = '';
        items.forEach(({ id, title, price, imgMin }) => {
            goodsWrapper.append(createCardGoods(id, title, price, imgMin))
        });
    }

    // goodsWrapper.append(createCardGoods(1, 'darts', 2000, './img/temp/Archer.jpg'));
    // goodsWrapper.append(createCardGoods(2, 'flamingo', 3000, './img/temp/Flamingo.jpg'));
    // goodsWrapper.append(createCardGoods(3, 'socks', 1500, './img/temp/socks.jpg'));

    const openCart = e => {
        e.preventDefault();
        cart.style.display = 'flex';
    }

    const closeCart = (event) => {
        const target = event.target;
        if (target === cart || target.classList.contains('cart-close')) {
            cart.style.display = '';
        }
    }

    document.addEventListener('keyup', (e) => {
        if (e.keyCode === 27) {
            cart.style.display = '';
        };
    })

    const choiceCategory = event => {
        event.preventDefault();
        const target = event.target;

        if (target.classList.contains('category-item')) {
            const category = target.dataset.category;
            getGoods(renderCard, goods => goods.filter(item => item.category.includes(category)))
        }
    }


    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);
    category.addEventListener('click', choiceCategory);

    getGoods(renderCard, randomSort);
});