var express = require('express');
var router = express.Router();
var cors = require('cors');
var passport  = require('passport');


require('../../../config/passport')(passport);

const index_controller = require('../../controllers/indexController');

if(process.env.NODE_ENV == 'test'){

}else{
  // console.log(cors());
  router.get('/',cors(),index_controller.index);
  
}

/* GET home page. */

module.exports = router;
