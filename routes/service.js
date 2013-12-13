var endpoint = "http://webservices.amazon.com/onca/xml";
var strReq = "http://webservices.amazon.com/onca/xml?AWSAccessKeyId=%s&AssociateTag=%s&Keywords=%s&Operation=ItemSearch&ResponseGroup=Large&SearchIndex=%s&Service=AWSECommerceService";
var sprintf = require('../lib/sprintf.js').sprintf;

var signer = require('../lib/AwsQuerySigner.js');

var config = require('../config.json');

var DomJS = require("dom-js").DomJS;

exports.service = function(req, res){
  function handleAWSResponse(error,response,body){
    var domjs = new DomJS();
    domjs.parse(response.body,function(err,obj){
        res.json({content:JSON.stringify(obj)});
    });
  }
  var request = require('request');

  var strEndpoint = sprintf(strReq,config.awsKeyID,config.awsTag,req.params.query,req.params.index);

  var ep = signer.signQuery(strEndpoint,config.awsKey);
  
  request({url:ep},handleAWSResponse);

};