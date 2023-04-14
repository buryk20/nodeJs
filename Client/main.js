

// xhr.onload = function() {
//     const data = JSON.parse(xhr.response)
//     console.log(data);
// }


function ajax({methods, url, payload, success, error}) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('error', error.bind(xhr, xhr.response));
    xhr.addEventListener('load', () => success.call(xhr, xhr.response));
    xhr.open(methods, url);
    methods.toUpperCase() === "GET" ? xhr.send() : xhr.send(payload);

}

function registrationModule(selector) {

    const config = {
        $form: document.querySelector(selector),
        config: null,
        init(config) {
            this.config = config;
            this.bindEvent();
        },
        sendIn() {
            const payload =JSON.stringify(this.prepare());
            ajax({
                ...this.config,
                payload
            });
        },
        bindEvent() {
            this.$form.addEventListener('submit', event => {
                event.preventDefault();
                this.sendIn();
            })
        },
        prepare() {
            const data = {};
            [].forEach.call(this.$form, ({name, value, tagName}) => {
                if(tagName.toUpperCase() === 'BUTTON' || !(name && value)) return;
                data[name] = value;
            });
            return data;
        }
    }
    return {
        init: config.init.bind(config)
    }
}
const a = registrationModule('#registration').init({
    methods: "POST",
    url: "http://localhost:3003/registration/",
    success(response) {
        console.log(response, 'response');
    },
    error(error) {
        console.log(error);
    }
})


// const xhr = new XMLHttpRequest();
// const url = "https://api.telegram.org/bot6094864110:AAFQoBlAqSTBoSc3pDTC3i-EwV9lBN3TpS8/sendMessage";
// xhr.open("POST", url, true);
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     console.log(xhr.responseText);
//   }
// };
// const message = {
//   chat_id: "-1001784985748",
//   text: "вот так я могу)))!!!!",
// };
// xhr.send(JSON.stringify(message));

// console.log(xhr);

// const inP = document.querySelector('[data-logo]');
// const btm = document.querySelector('[data-btn]');

// const telegramBotToken = '6094864110:AAFQoBlAqSTBoSc3pDTC3i-EwV9lBN3TpS8';
// const chatId = '-1001784985748';


// const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;



// btm.addEventListener('click', function() {
//     const messageText = inP.value;
//     const data = {
//         chat_id: chatId,
//         text: messageText
//       };
//     console.log(data.messageText);
//     fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       })
//       .then(response => console.log('Сообщение отправлено успешно'))
//       .catch(error => console.error('Ошибка отправки сообщения:', error));
// });

// console.log(data.messageText);

