const express = require('express');
const router = express.Router();
const request = require('superagent');

function getToken(promiseRes) {
    request
        .post('http://localhost:3000/promise/token')
        .send({name: "tsemach", game: "is the man"}) // sends a JSON post body
        .set('Accept', 'application/json')
        .end((err, res) => {
            // Calling the end function will send the request
            console.log("getToken: res = " + res.body.toString());
            promiseRes.send({promise: 'done'});
        });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("router.post/promise: got req = " + req.body);
    res.send('promise is working: req = ' + req.body);
});

router.post('/', function(req, res, next) {
    //res.send({promise: 'in progress'});
    getToken(res);
});

router.post('/token', function(req, res, next) {
    console.log("router.post/promise/token: got req = " + req.body);
    res.send({token: '123-xyz-321'});
});

module.exports = router;
