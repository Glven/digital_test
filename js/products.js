export const stickersValue = {
    hit: 'Хит',
    novelty: 'Новинка',
    percent: '%',
    stock: 'Акция'
}

export const products = [
    {
        id: 1,
        img: 'product1',
        comments: 5,
        article: '4501390',
        title: 'Ингалятор компрессорный компактный MED-125',
        isAvailable: true,
        stickers: ['hit'],
        price: {
            pastPrice: 1494,
            currentPrice: 24529
        }
    },
    {
        id: 2,
        img: 'product2',
        comments: 5,
        article: '4501390',
        title: 'Облучатель-рециркулятор медицинский СH111-115',
        isAvailable: false,
        stickers: ['hit'],
        price: {
            pastPrice: 1494,
            currentPrice: 6284
        }
    },
    {
        id: 3,
        img: 'product3',
        comments: 0,
        article: '4501390',
        title: 'Тонометр механический CS Medica CS-106 с фонедоскопом',
        isAvailable: true,
        stickers: ['novelty', 'stock'],
        price: {
            pastPrice: 1494,
            currentPrice: 1494
        }
    },
    {
        id: 4,
        img: 'product4',
        comments: 5,
        article: '4501390',
        title: 'Термометр мед.электр.WT-03',
        isAvailable: true,
        stickers: ['novelty'],
        price: {
            pastPrice: 1494,
            currentPrice: 994
        }
    },
    {
        id: 5,
        img: 'product5',
        comments: 5,
        article: '4501390',
        title: 'Ингалятор компрессорный компактный MED-125',
        isAvailable: false,
        stickers: ['novelty', 'percent'],
        price: {
            pastPrice: 1494,
            currentPrice: 3736
        }
    },
]

