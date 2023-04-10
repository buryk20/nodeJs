

// xhr.onload = function() {
//     const data = JSON.parse(xhr.response)
//     console.log(data);
// }


function aiax({methods, url, success, error}) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('error', error.bind(xhr, xhr.response));
    xhr.addEventListener('load', () => success.call(xhr, xhr.response));
    xhr.open(methods, url);
    xhr.send();

}
// document.querySelector('#foo').addEventListener('click', function() {
//     aiax({
//         methods: "GET",
//         url: "http://localhost:3003/candidates/",
//         success(response) {
//             const data = JSON.parse(response)
//             console.log(data, 'response');
//         },
//         error(error) {
//             console.log(error);
//         }
//     });
// });

const reg

