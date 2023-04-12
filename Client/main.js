

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
// const url = "https://api.telegram.org/bot1086684695:AAGUePIsqeOsnHABuEJ939JBv1hdjVZSYGQ/sendMessage";
// xhr.open("POST", url, true);
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     console.log(xhr.responseText);
//   }
// };
// const message = {
//   chat_id: "-1001819362362",
//   text: "вот так я могу)))!!!!",
// };
// xhr.send(JSON.stringify(message));

// console.log(xhr);