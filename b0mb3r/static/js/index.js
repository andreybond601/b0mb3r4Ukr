const input = document.querySelector('#phone');
let intlTelInput;

const countryPlaceholderMap = {
    ua: "50 123 4567"
};

document.addEventListener('DOMContentLoaded', () => {
    window.intlTelInputGlobals.getCountryData().push({
        name: "Нет в списке",
        iso2: "custom",
        dialCode: "",
        priority: 0,
        areaCodes: null
    });
    intlTelInput = window.intlTelInput(input, {
        onlyCountries: ['ua'],
        initialCountry: 'ua',
        separateDialCode: true,
    });
});

input.addEventListener("countrychange", () => {
    input.placeholder = countryPlaceholderMap[intlTelInput.getSelectedCountryData().iso2];
});

document.querySelector("#main-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelector('main').style.cssText = "animation:blur; animation-duration:0.6s; animation-fill-mode:both";
    document.querySelector('footer').style.cssText = document.querySelector('main').style.cssText;

    setTimeout(() => document.querySelector('#block-ui').style.display = "block", 600);

    const formData = new FormData(document.querySelector('#main-form'));
    formData.append('phone_code', intlTelInput.getSelectedCountryData().dialCode);

    const response = await fetch("/attack/start", {
        method: 'POST',
        body: formData,
    });
    if (response) {
        document.querySelector('main').style.cssText = "animation:blur; animation-duration:0.6s; animation-fill-mode:both; animation-direction:reverse";
        document.querySelector('footer').style.cssText = document.querySelector('main').style.cssText;

        setTimeout(() => document.querySelector('#block-ui').style.display = "none", 600);
    }
});
