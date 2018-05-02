var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  const { headers, method, url } = req;
  res.writeHead(200, {'Content-Type': 'text/html'});
  console.log(url);
  var call = url.substr(1);
  
  
  const WolframAlphaAPI = require('wolfram-alpha-api');
  const waApi = WolframAlphaAPI('AH4R6V-3QUP7RQ6UU');

  API();
  function API(){
    if(call ===""){
      res.end('<html><body><h1>There was an error please refresh.</h1></body></html>');
    }
    else{
      waApi.getFull({input: "using induction, prove 1+3+5+...+(2n-1)=n^2",includepodid: 'Result', podstate: 'Step-by-step',format: 'plaintext'}).then((queryresult) => {   
      const output = queryresult.pods[0].subpods[0].plaintext + queryresult.pods[1].subpods[0].plaintext
     res.end(queryresult.pods[0].subpods[0].plaintext);
  }).catch(console.error);
    }
  }
}).listen(process.env.PORT || 5000);
