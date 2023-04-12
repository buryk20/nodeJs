var fs = require("fs");

module.exports = {
    read(url, callback) {
        fs.readFile(url, "utf-8", callback);
    },
    write(url, data) {
        console.log(data, 'DATA');
        fs.writeFile(url, JSON.stringify(data));
    }
}