var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  const { headers, method, url } = req;
  res.writeHead(200, {'Content-Type': 'text/html'});
  console.log(url);               
  var call = url.substr(1);
  console.log(call);
  
  
  const WolframAlphaAPI = require('wolfram-alpha-api');
  const waApi = WolframAlphaAPI('AH4R6V-3QUP7RQ6UU');

  API();
  function API(){
    if(call ==="/"){
      res.end('<html><body><h1>There was an error please refresh.</h1></body></html>');
    }
    else{
      waApi.getFull(call).then((queryresult) => {
      const pods = queryresult.pods;
      const output = pods.map((pod) => {
      const subpodContent = pod.subpods.map(subpod =>
        `  <img src="${subpod.img.src}" alt="${subpod.img.alt}">`
      ).join('\n');
      return `<h2>${pod.title}</h2>\n${subpodContent}`;
      }).join('\n');
    res.end(output);
  }).catch(console.error);
    }
  }
}).listen(process.env.PORT || 5000);
