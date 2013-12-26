// サーバ起動の魔法のリクアイアー♪
var http = require('http');

var pages = [
  {route: '/',output: 'WooHoo!'},// /を追加
  {route: '/about/this',output: 'Nodeで複数階層ルーティング'},//追加
  {route: '/about/node',output: 'V8エンジンってなに？？？イベントI/O'},//追加
  {route: '/another page', output: function() {return 'これが' + this.route;}}
];


http.createServer(function (request, response){
  // encodeing utf-8
  request.setEncoding('utf8');
  var lookup = decodeURI(request.url);
  console.log(lookup);
  // pages配列のプロパティごとの状態と判定
  pages.forEach(function(page){
    if (page.route === lookup){
      response.writeHead(200,{'Content-Type':'text/html'});
      response.end(typeof page.output === 'function' ? page.output() : page.output);
    }
  });

  // 404
  if(!response.finished) {
    response.writeHead(404);
    response.end('ページが見つかりません！');
  }
}).listen(8080);