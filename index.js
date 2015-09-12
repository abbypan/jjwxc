var cm = require("sdk/context-menu");
var selection = require("sdk/selection");
var tabs = require("sdk/tabs");
var self=require("sdk/self");
var pageMod = require("sdk/page-mod");
 
cm.Menu({
  label: "绿晋江",
  image: self.data.url("16.png"), 
  context: cm.SelectionContext(),
  contentScript: 'self.on("click", function (node, qtype) { \
                var qdata = window.getSelection().toString(); \
                self.postMessage({ d : qdata, t: qtype }); \
                 });',
  onMessage: function(m){
      var kw = encodeURI(m.d);
      if(m.t=="blur"){
          var url = 'http://www.google.com/cse/home?cx=002715881505881904928:lxsfdlsvzng&q=' + kw + '&oq=' + kw;
          tabs.open(url);
      }else if(m.t=="set"){
          var url = 'http://cse.google.com/cse?cx=009772050743998195273:tk5ofqzqsvo&q=' + kw + '&oq=' + kw;
          tabs.open(url);
      }else{
          var attachScript = function (tab) {
              tab.attach({
                  contentScript: ' document.getElementById("kw").value = "' + m.d + '"; \
                  document.getElementById("t").value="' + m.t + '"; \
                  document.getElementById("f").submit();\
                  '
              });
          };

          tabs.open({
              url: self.data.url("jjwxc.html"),
              onReady: attachScript
          });
      }
  },
  items: [
    cm.Item({ label: "模糊", data: "blur" }),
    cm.Item({ label: "限定", data: "set" }),
    cm.Item({ label: "作品", data: "1" }),
    cm.Item({ label: "作者", data: "2" }),
    cm.Item({ label: "主角", data: "4" }),
    cm.Item({ label: "配角", data: "5" }),
    cm.Item({ label: "其他", data: "6" })
  ]
});
