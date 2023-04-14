var express = require("express"); // подключить express(упрощение для NodeJs) из папки node_modules

var fs = require("fs"); // fs -- обтект который дает возможность читать файлы(например json)
var app = express();
var bodyParser = require("body-parser"); // 'body-parser' -- библиотека дает возможность прочитать post запрос на NodeJs

const {read, write} = require('./helper/');


//Настройки
//(https://overcoder.net/q/7302/%D1%87%D1%82%D0%BE-%D0%B4%D0%B5%D0%BB%D0%B0%D0%B5%D1%82-body-parser-%D1%81-express)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers","X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const port = 3003;

// запусть наше nodeJs приложении на порту 3002 по адресу http://localhost:3002/
/*
 теперь мы знаем куда мы можем обращаться к нашей nodeJS программе
 чтоб получить данные.
 (по адресу) http://localhost:3000/.

*/
app.listen(port, function () {
  // говорим на каком порту запускать нашу  NODE_JS  программу.
  console.log(`Example app listening on port http://localhost:${port}/`);
});


// app.get('/candidates', function(request, response) {
//     console.log('candidates callback');

//     response.send('hello');
// });

app.get('/vacancies', function(request, response) {
  response.send('vacancies callback');
})
//------------------------------- ------------ end config ---------------------------
/*
 // экспресс-программа(app).метод-запроса(get,post)([path], ф-я котора вызовется при обращении
    на http://localhost:3000[path(напр. '/', '/user')]);
*/
//http://localhost:3003/candidates (GET)

//http://localhost:3003/vacancies (GET)


app.get('/candidates', function(request, response) {
  const page = request.query;
  // console.log(page, 'page');
  fs.readFile('./models/data.json', 'utf-8', function(error, data) {
    const users = JSON.parse(data);
    // console.log(JSON.stringify(users));
      response.status(200).send(JSON.stringify(users));
  });
});


app.post("/registration", function(req, responce) {
  sendMessage();
  // const body = req.body;

  // app.get('/candidates', function(req, responce) {
  //   read("./models/data.json", (eroor, jsonPayload) => {
  //     if(jsonPayload) {
  //       write("./models/data.json", {
  //         ...JSON.parse(jsonPayload),
  //         ...body
  //       })
  //     }
  //   })
  // })
  // responce.status(200).send(body);
})
app.get('/vacancies', function() {
  console.log('vacancies callback');
});

/*
 статусы (res.status(200) - говорят о том как совершился запрос, положиельно(получили необходимые данные) или
 негативно(что то пошло не так).
 200 - все прошло ок
 404- что то не найдено
 (https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP)
*/

//http://localhost:3000/all-users (GET)

app.get("/user", function (req, res) {});

/*
'/user/:id' - при запросе http://localhost:3000/user/123, мы можем получить значение :id
 как свойство обьекта req.params -> req.params.id == 123
 Если бы было '/user/:foo', то req.params.foo == 123
*/
app.get("/user/id", function (req, res) {});

// Получить список всех пользователей
function getAllusers(req, res) {
  // res.status(200);
  // res.send({content: 123});
}

//GET Получить юзера по id (data) \ params, query

//http://localhost:3000/registration (post)

async function sendMessage() {
  const fetch = await import('node-fetch');
  const TOKEN = '6094864110:AAFQoBlAqSTBoSc3pDTC3i-EwV9lBN3TpS8';
  const CHAT_ID = '-1001784985748';
  const MESSAGE = 'Hello, World!';

  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(MESSAGE)}`;

  const response = await fetch.default(url);
  const json = await response.json();

  console.log(json);
}

sendMessage();