const express = require('express');
const router = express.Router();
const request = require('superagent');

/**
 * This code is an example of sending a http request receive a response with in another http session.
 *
 * First post request http://localhots:3000/promise come in to route point router.post('/token', ...);
 * Then before send a reply back to client another request is generating using superagent l
 * ibrary to http://localhost:3000/promise/token. once reply is coming in (with the .end method) the
 * the reply to the "original" first request is send to the client using the promiseRes response object.
 *
 * @param promiseRes
 */

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
