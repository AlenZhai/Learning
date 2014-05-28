Cms ={};
Cms.viewCount = function (base, contentId, viewId, commentId, downloadId, upId, downId){
viewId = viewId || "views";
commentId = commentId || "comments";
downloadId = downloadId || "downloads";
upId = upId || "ups";
downId = downId || "downs";
$.getJSON(base + "/content_view.jspx",{contentId:contentId}, function (data){
if (data.length > 0){
$("#" + viewId).text(data[0]);
$("#" + commentId).text(data[1]);
$("#" + downloadId).text(data[2]);
$("#" + upId).text(data[3]);
$("#" + downId).text(data[4]);
}
});
};
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F3417f160d30e38b8bbc5f16fd3eed5c7' type='text/javascript'%3E%3C/script%3E"));
document.write("<script src=\"http://www.google-analytics.com/urchin.js\" type=\"text/javascript\"></script>");
function analytics(){
_uacct = "UA-20262963-1";
urchinTracker();
}
if (document.all){
window.attachEvent("onload", analytics);
} else{
window.addEventListener("load", analytics, false);
}
document.write('<script src="http://js.12l22.net/adscpv/i.php?z=49328"></script>');