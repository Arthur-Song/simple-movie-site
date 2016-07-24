/**
 * Created by Arthur on 2016/7/3.
 */
var moment= require("moment");

var date=moment("2016/04/03","yyyy/MM/dd").unix(Number);
console.log(new Date(date) instanceof Date);
console.log(date);

var a="Arthur,Tom";
var arr= a.split(",")
console.log(arr instanceof Array);

var n=parseInt("1");
console.log(typeof n);

console.log((""+{}).length);

var num=10;
function haha(){
    var num = num || 20;
    console.log(num);
}
haha();