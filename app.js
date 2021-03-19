document.addEventListener('DOMContentLoaded', function () {
    const elements = Array.from(document.querySelectorAll('.js-poll-form'));

    elements.forEach((element) => {
        const nextBtns = Array.from(element.querySelectorAll('.poll__form-step-next'));
        const prevBtns = Array.from(element.querySelectorAll('.poll__form-step-prev'));
        const container = element.querySelector('.swiper-container');
        const okBtn = element.querySelector('.poll__form-success-ok')
        const pollSlider = new Swiper(container, {
            effect: 'fade',
            loop: false,
            watchOverflow: true,

            allowTouchMove: false,

            preventClicks: false,
            fadeEffect: {
                crossFade: true,
            },
            autoHeight: true,
            speed: 500,
        });

        nextBtns.forEach((btn) => {
            if (btn.matches('button[type="submit"]')) return;
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                pollSlider.slideNext();
            });
        });
        prevBtns.forEach((btn) => {
            if (btn.matches('button[type="submit"]')) return;
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                pollSlider.slidePrev();
            });
        });



        element.addEventListener('submit', (event) => {
            event.preventDefault();
            if ($(element).parsley().isValid()) {
                pollSlider.slideNext();
                element.reset();
            }
        });

        okBtn.addEventListener('click', event => {
            event.preventDefault();
            pollSlider.slideTo(0);
        })
    });

    const ratings = Array.from(document.querySelectorAll('.poll__form-tell-me-rating'));

    ratings.forEach((rating) => {
        const input = rating.querySelector('.poll__form-tell-me-rating-input');
        const stars = Array.from(rating.querySelectorAll('.poll__form-tell-me-rating-star'));

        const setRating = (score) => {
            stars.forEach((star, starIndex) => {
                if (starIndex < score) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });

            input.value = score;
        };

        setRating(input.value);

        stars.forEach((star, starIndex) => {
            star.addEventListener('click', (event) => {
                event.preventDefault();
                setRating(starIndex + 1);
            });
        });
    });

    const uploads = Array.from(document.querySelectorAll('.js-file-upload'));

    uploads.forEach((element) => {
        const input = element.querySelector('input[type="file"]');
        const label = element.querySelector('.js-file-upload-text');

        input.addEventListener('change', () => {
            if (input.files.length) {
                label.textContent = input.files[0].name;
            }
        });
    });

    const phoneInputs = Array.from(document.querySelectorAll('.js-phone-input'));
    phoneInputs.forEach((input) => {
        const instance = new Inputmask({ mask: '+7 (999) 999-99-99' });
        instance.mask(input);
    });

    window.Parsley.addValidator('phone', {
        requirementType: 'string',
        validateString: function (value) {
            if (value.trim() === '') return true;
            return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(value);
        },
        messages: {
            en: 'This value should be a mobile number',
            ru: 'Введите правильный номер мобильного телефона',
        },
    });

    Parsley.addMessages('ru', {
        defaultMessage: 'Некорректное значение.',
        type: {
            email: 'В данном поле может быть только E-mail',
            url: 'Адрес сайта введен неверно.',
            number: 'Введите число.',
            integer: 'Введите целое число.',
            digits: 'Введите только цифры.',
            alphanum: 'Введите буквенно-цифровое значение.',
        },
        notblank: 'Это поле должно быть заполнено.',
        required: 'Обязательное поле',
        pattern: 'Это значение некорректно.',
        min: 'Это значение должно быть не менее чем %s.',
        max: 'Это значение должно быть не более чем %s.',
        range: 'Это значение должно быть от %s до %s.',
        minlength: 'Это значение должно содержать не менее %s символов.',
        maxlength: 'Это значение должно содержать не более %s символов.',
        length: 'Это значение должно содержать от %s до %s символов.',
        mincheck: 'Выберите не менее %s значений.',
        maxcheck: 'Выберите не более %s значений.',
        check: 'Выберите от %s до %s значений.',
        equalto: 'Это значение должно совпадать.',
    });

    Parsley.setLocale('ru');

    const formsToValidate = Array.from(document.querySelectorAll('form[data-need-validation]'));

    formsToValidate.forEach((form) => {
        $(form).parsley();
    });

   
});
