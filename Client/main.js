

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