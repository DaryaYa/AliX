document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('.search');
    const cartBtn = document.getElementById('cart');
    const wishListBtn = document.getElementById('wishlist');
    const goodsWrapper = document.querySelector('.goods-wrapper');
    const cart = document.querySelector('.cart');

    const createCardGoods = (id, title, price, img) => {
        const card = document.createElement('div');
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML = ` <div class="card">
                                    <div class="card-img-wrapper">
                                        <img class="card-img-top" src="./img/temp/${img}" alt="">
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

    goodsWrapper.append(createCardGoods(1, 'darts', 2000, 'Archer.jpg'));
    goodsWrapper.append(createCardGoods(2, 'flamingo', 3000, 'Flamingo.jpg'));
    goodsWrapper.append(createCardGoods(3, 'socks', 1500, 'socks.jpg'));

    const openCart = (e) => {

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
    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);
});