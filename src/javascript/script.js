function getChartTypes() {
    const uppercase = document.querySelector('#include_uppercase').checked;
    const lowercase = document.querySelector('#include_lowercase').checked;
    const number = document.querySelector('#include_number').checked;
    const specialcharacter = document.querySelector('#include_special_caracter').checked;
    return { uppercase, lowercase, number, specialcharacter };
}

document.querySelector('#generate_password').addEventListener('click', () => {
    const length = parseInt(document.querySelector('#password_length').value);
    const chartTypes = getChartTypes();
    const password = generatePassword(length, chartTypes);
    document.querySelector('#generated_password').value = password;
});