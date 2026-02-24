function getChartTypes() {
    const uppercase = document.querySelector('#include_uppercase').checked;
    const lowercase = document.querySelector('#include_lowercase').checked;
    const number = document.querySelector('#include_number').checked;
    const specialCharacter = document.querySelector('#include_special_character').checked;

    const charTypes = [];

    if (uppercase) {
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }
    if (lowercase) {
        charTypes.push('abcdefghijklmnopqrstuvwxyz');
    }
    if (number) {
        charTypes.push('0123456789');
    }
    if (specialCharacter) {
        charTypes.push('!@#$%^&*()_-+={}[]|\\/?><:;"\'.,~`');
    }

    return charTypes;
}

function getPasswordSize() {
    const size = document.querySelector('#size').value;
    
    if (isNaN(size) || size < 4 || size > 50) {

        message('Invalid size, enter a number between 4 and 50!', 'danger');
    }

    // Return the validated size
    return size;
}

function generatePassword(size, charTypes) {
    let passwordGenerated = '';
    const selectedChars = charTypes.join('');

    charTypes.forEach(type => {
        passwordGenerated += type[Math.floor(Math.random() * type.length)];
    });

    while (passwordGenerated.length < size) {
        passwordGenerated += selectedChars[Math.floor(Math.random() * selectedChars.length)];
    }

    passwordGenerated = passwordGenerated.split('').sort(() => Math.random() - 0.5).join('');

    return passwordGenerated;
}

function message(text, status = 'success') {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: status === 'success' ? '#84cc16' : '#dc2626',
            boxShadow: 'none'
        }
    }).showToast();
}

document.querySelector('#generate').addEventListener('click', function () {

    const size = getPasswordSize();
    const charTypes = getChartTypes();

    if (!size) {
        return;
    }
    
    if (!charTypes.length) {
        message('Select at least one character type!', 'danger');
        return;
    }

    const passwordGenerated = generatePassword(size, charTypes);

    document.querySelector('#password_container').classList.add('show');
    document.querySelector('#password').textContent = passwordGenerated;
});

document.querySelector('#copy').addEventListener('click', function () {

    navigator.clipboard.writeText(document.querySelector('#password').textContent);

    message('Password copied successfully!', 'success');
});
