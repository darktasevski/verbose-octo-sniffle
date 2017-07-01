/* 
decimal_sep: character used as deciaml separtor, it defaults to '.' when omitted
thousands_sep: char used as thousands separator, it defaults to ',' when omitted
*/
Number.prototype.toMoney = function (decimals, decimal_sep, thousands_sep){
    var n = this,
    //if decimal is zero we must take it, it means user does not want to show any decimal
    //如果十进制是0，那么用户不像展示任何小数
    c = isNaN(decimals) ? 0 : Math.abs(decimals), 
    //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)
    //如果没有传入小数点，我们把小数点.看做小数点；
    d = decimal_sep || '.', 

    /*
    according to [http://stackoverflow.com/questions/411352/how-best-to-determine-if-an-argument-is-not-sent-to-the-javascript-function]
    the fastest way to check for not defined parameter is to use typeof value === 'undefined' 
    rather than doing value === undefined.
    */
    //if you don't want to use a thousands separator you can pass empty string as thousands_sep value
    //如果你不想使用千分符号，你可以传入一个空串；
    t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, 

    sign = (n < 0) ? '-' : '',

    //extracting the absolute value of the integer part of the number and converting to string
    //获取整数的绝对值部分
    i = parseInt(n = Math.abs(n).toFixed(c)) + '',

    j = ((j = i.length) > 3) ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}