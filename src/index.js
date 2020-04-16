require('dotenv').config();
require('./database.js');
const app = require('./app.js')
//import app from './app';//export default app;

async function main(){

    await app.listen(app.get('port'), () =>{
        console.log('backend server: '+app.get('port'));
    });
}

main();