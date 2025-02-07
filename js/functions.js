function onInputWrapperClick (block) {
    const input = block.querySelector('input')
    const clear = block.querySelector('.clear')

    clear.addEventListener('click', () => {
        input.value = ''
        if (input.classList.contains('required')) {
            input.classList.remove('valid')
            input.classList.add('invalid')
        }
    })
}