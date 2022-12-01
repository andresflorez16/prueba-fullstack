const { connect } = require('mongoose')

const conenctDB = async () => {
    try {
        await connect('mongodb://localhost/likes-app')
        console.log('DB connected!');
    }catch(err) {console.log(err);}
}

module.exports = conenctDB
