import {products, stickersValue} from './products.js'
import {
    heart,
    equal,
    cart,
    comments,
    loupe
} from './icons.js'
import {slider} from './slide.js'

const productsWrapper = document.getElementById('products-wrapper')
const body = document.querySelector('body')

products.forEach(createProduct)


function createProduct (p) {
    
    const product = document.createElement('div');
    product.classList.add('product', 'slider-item')

    const productBlock = createProductBlock(p)

    const productTitle = createProductTitle(p)

    const productInfo = createProductInfo(p)

    product.appendChild(productBlock)
    product.appendChild(productTitle)
    product.appendChild(productInfo)

    productsWrapper.appendChild(product)
}

function createProductBlock (product) {
    const productBlock = document.createElement('div')
    productBlock.classList.add('product__block', 'block')

    const quickView = document.createElement('button')
    quickView.classList.add('sticker', 'sticker--light', 'product__quickView')
    quickView.innerHTML = `${loupe} Быстрый просмотр`

    const productBLockButtons = document.createElement('div')
    productBLockButtons.classList.add('block__buttons')

    const equalBtn = document.createElement('button')
    equalBtn.classList.add('block__btn', 'icon')
    equalBtn.innerHTML = equal

    const heartBtn = document.createElement('button')
    heartBtn.classList.add('block__btn', 'icon')
    heartBtn.innerHTML = heart

    productBLockButtons.appendChild(equalBtn)
    productBLockButtons.appendChild(heartBtn)

    const productImg = document.createElement('img')
    productImg.classList.add('block__img')
    productImg.setAttribute('alt', product.img)
    productImg.setAttribute('src', `./img/products/product${product.id}.png`)

    const productBlockOther = document.createElement('div')
    productBlockOther.classList.add('block__other')

    const articleSpan = document.createElement('span')
    articleSpan.classList.add('sticker', 'sticker--light', 'sticker--thin')
    articleSpan.textContent = `Арт. ${product.article}`

    const commentsCount = document.createElement('span')
    commentsCount.classList.add('sticker', 'sticker--light')

    if (product.comments) {
        commentsCount.innerHTML = `${comments} ${product.comments}`
    }

    
    productBlockOther.appendChild(articleSpan)
    productBlockOther.appendChild(commentsCount)

    productBlock.appendChild(quickView)
    productBlock.appendChild(productBLockButtons)
    productBlock.appendChild(productImg)
    productBlock.appendChild(productBlockOther)

    return productBlock
} 

function createProductTitle (product) {
    const title = document.createElement('p')
    title.classList.add('product__title')
    title.textContent = product.title

    return title
}

function createProductInfo (product) {
    const info = document.createElement('div')
    info.classList.add('product__info', 'info')

    const stickers = document.createElement('div')
    stickers.classList.add('info__stickers')
    const isAvailable = document.createElement('span')
    
    isAvailable.classList.add(...(product.isAvailable ? 
        ['sticker', 'sticker--availability'] : 
        ['sticker', 'sticker--notAvailability'])
    )
    isAvailable.textContent = product.isAvailable ? 
        'В наличии' : 'Нет в наличии' 

    stickers.appendChild(isAvailable)

    for (const s of product.stickers) {
        const sticker = document.createElement('span')
        sticker.classList.add('sticker', `sticker--${s}`)
        sticker.textContent = stickersValue[s]
        stickers.appendChild(sticker)
    }

    const priceBlock = document.createElement('div')
    priceBlock.classList.add('info__price', 'price')

    const {price: {pastPrice, currentPrice}} = product

    const pieceSpan = '<span>шт</span>'
    const currentPriceP = document.createElement('p')
    currentPriceP.classList.add('price__basic')
    currentPriceP.innerHTML = `${currentPrice.toLocaleString('ru-RU')} ₽ ${pieceSpan}` 

    priceBlock.appendChild(currentPriceP)

    if (pastPrice) {
        const pastPriceP = document.createElement('p')
        pastPriceP.classList.add('price__before')
        pastPriceP.textContent = `${pastPrice.toLocaleString('ru-RU')} ₽`
        priceBlock.appendChild(pastPriceP)
    }


    const productBtn = document.createElement('button')
    let classes = []

    if (product.isAvailable) {
        classes = ['btn', 'btn--secondary', 'info__btn']
        const buttonText = '<span>В корзину</span>'
        productBtn.innerHTML = `${cart} ${buttonText}`
    } else {
        classes = ['btn', 'btn--bordered', 'info__btn']
        productBtn.textContent = 'Заказать'
    }

    productBtn.classList.add(...classes)

    

    info.appendChild(stickers)
    info.appendChild(priceBlock)
    info.appendChild(productBtn)

    setupProductButton(productBtn, product, info)

    return info 
}

function createSubmitButton (p) {
    const button = document.createElement('button')
    button.classList.add('btn', 'btn--primary')
    button.textContent = 'Готово'
    button.style.marginTop = '12px'

    button.addEventListener('click', () => {
        const products = document.querySelectorAll('.product')
        const product = products[p.id - 1]
        const quantity = product.querySelector('.quantity')
        const input = quantity.querySelector('input')
        const value = input.value
    })
    
    return button
}

function createProductQuantityBlock () {

    let quantityValue = 1;

    const quantity = document.createElement('div')
    quantity.classList.add('product__quantity', 'quantity')

    const minus = document.createElement('button')
    minus.textContent = '-'
    minus.classList.add('quantity__btn')
    minus.addEventListener('click', () => changeValue('min'))

    const plus = document.createElement('button')
    plus.textContent = '+'
    plus.classList.add('quantity__btn')
    plus.addEventListener('click', () => changeValue('plus'))

    const qInput = document.createElement('input')
    qInput.setAttribute('type', 'number')
    qInput.setAttribute('min', '1')
    qInput.value = quantityValue
    qInput.addEventListener('input', (e) => {
        const value = +e.target.value

        if (value < 1) {
            quantityValue = 1;
            return;
        }

        quantityValue = value
    })
    qInput.addEventListener('blur', () => {
        qInput.value = quantityValue
    })

    function changeValue (op) {
        if (op === 'min' && quantityValue > 1) {
            quantityValue--;
        } else if (op === 'plus') {
            quantityValue++;
        }

        qInput.value = quantityValue
    }


    quantity.appendChild(minus)
    quantity.appendChild(qInput)
    quantity.appendChild(plus)

    return quantity
}

function setupProductButton (productBtn, product, info) {
    const handleProductBtnClick = () => {
        if (!product.isAvailable) return;

        const quatity = createProductQuantityBlock();
        const submitBtn = createSubmitButton(product)

        const initialButton = productBtn.cloneNode(true)

        info.removeChild(productBtn)
        info.appendChild(quatity)
        info.appendChild(submitBtn)

        submitBtn.addEventListener('click', () => {
            info.removeChild(quatity)
            info.removeChild(submitBtn)
            info.appendChild(initialButton)

            setupProductButton(initialButton, product, info)
        })
    }

    productBtn.addEventListener('click', handleProductBtnClick)
}

const feedbackForm = document.getElementById('feedback-form')
const feedbackFormSubmit = feedbackForm.querySelector('button[type=submit]')

feedbackFormSubmit.addEventListener('click', (e) => validateFeedbackForm(e, feedbackForm))

function validateFeedbackForm (e, form) {
    e.preventDefault()

    const requiredFields = feedbackForm.querySelectorAll('input[type=text].required')
    const requiredCheck = feedbackForm.querySelectorAll('input[type=checkbox].required')

    let flag = true

    requiredFields.forEach(item => {
        flag = true
        if (item.value.trim() === '') {
            item.classList.add('invalid')
            flag = false
        }
    })

    requiredCheck.forEach(item => {
        flag = true
        if (!item.checked) {
            item.classList.add('invalid')
            flag=false
        }
    })

    if (!flag) return;

    const modal = document.getElementById('modal-thanks')
    const modalClose = modal.querySelector('#modal-close')
    const modalBtn = modal.querySelector('.modal__btn')
    body.style.overflow = 'hidden'

    const removeActiveClass = () => {
        modal.classList.remove('active')
        body.style.overflow = 'auto'
    }

    modalClose.addEventListener('click', removeActiveClass)
    modalBtn.addEventListener('click', removeActiveClass)

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            removeActiveClass()
            return () => {
                document.removeEventListener('keydown')
            }
        }
    })

    modal.classList.add('active')
    form.reset()
    requiredFields.forEach(item => item.classList.remove('valid'))

}

const allRequiredFields = document.querySelectorAll('input[type=text].required')
const allRequiredCheckboxes = document.querySelectorAll('input[type=checkbox].required')

allRequiredCheckboxes.forEach(item => {
    item.addEventListener('change', () => handleCheckboxChange(item))
})

allRequiredFields.forEach(item => {
    item.addEventListener('input', () => handleInputChange(item))
})

function handleCheckboxChange (checkbox) {
    if (checkbox.checked) {
        checkbox.classList.remove('invalid')
    }
}

function handleInputChange (input) {
    const val = input.value

    if (val.trim() === '') {
        input.classList.add('invalid')
        input.classList.remove('valid')
        return
    }

    input.classList.add('valid')
    input.classList.remove('invalid')
} 

slider('products-wrapper')