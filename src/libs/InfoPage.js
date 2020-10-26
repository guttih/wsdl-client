"use strict";
exports.__esModule = true;
exports.MakePage = void 0;
var PageRoutes = [
    { path: "/aaetladurfaedingardagur", method: "get", description: "S\u00E6kir alla \u00E1\u00E6tla\u00F0a f\u00E6\u00F0ingadaga barna" },
    { path: "/aaetladurfaedingardagur/:kennitala", method: "get", description: "S\u00E6kir \u00E1\u00E6tla\u00F0ann f\u00E6\u00F0imngardag barns \u00FAt fr\u00E1 kennit\u00F6lu foreldris" },
    { path: "/faedingarorlofstekjur", method: "get", description: "S\u00E6kir tekjur einstaklinga vegna f\u00E6\u00F0ingarorlofs" },
    { path: "/faedingarorlofstekjur/:kennitala", method: "get", description: "S\u00E6kir tekjur einstaklings vegna f\u00E6\u00F0ingarorlofs \u00FAt fr\u00E1 kenit\u00F6lu hans" },
];
exports.MakePage = function (title, description) {
    var styles = "\n    <style>\n        .center          {margin: auto;width: 50%;padding: 10px;}\n        .container       {padding-top: 40px; padding-right: 40px; max-width:800px}\n        .title           {padding-bottom: 10px; font-size: 24px; }\n        .description     {padding-bottom: 15px;font-size: 18px;padding-left: 10px;font-style: italic;}\n        .td-get          {color: green;font-weight: bold;}\n        .td-post         {color:orange;}\n        .td-delete       {color:red;}\n        td,th            {text-align: left;padding-left: 10px;padding-bottom: 5px;border-bottom: 1px solid gray}\n        th               {border-bottom: 2px solid gray}\n    </style>\n";
    var html = "\n    <html>\n        <head>" + styles + "</head>\n        <body>\n            <div class=\"container center\">\n                <div class=\"title\">" + title + "</div>\n                <div class=\"description\">" + description + "</div>\n                " + makeTable(PageRoutes) + "\n            </div>\n        </body>\n    </html>\n    ";
    return html;
};
var makeHref = function (path, method) {
    return method === "get" && !path.includes(':') ? "<a href=\"" + path + "\">" + path + "</a>" : path;
};
var makeTable = function (routes) {
    var head = "\n  <table class=\"table\">\n    <thead class=\"head\">\n        <tr>\n        <th>Sl\u00F3\u00F0</th>\n        <th>A\u00F0ger\u00F0</th>\n        <th>L\u00FDsing</th>\n        </tr>\n    </thead>\n    \n    ";
    var body = '<tbody>';
    routes.forEach(function (element) {
        body += "\n<tr> <td class=\"td-path\"> " + makeHref(element.path, element.method) + " </td> <td class=\"td-method\"> <span class=\"td-" + element.method + "\">" + element.method + "</span> </td> <td class=\"td-description\"> " + element.description + " </td> </tr>";
    });
    body += '</body>';
    var footer = "\n</table>";
    return "" + head + body + footer;
};
