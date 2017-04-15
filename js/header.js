"use strict";
var headerUrl = "https://kiefersivitz.github.io/Calendar/pages/header.html";
var footerUrl = "https://kiefersivitz.github.io/Calendar/pages/footer.html";

$(function () {
    $.ajax(headerUrl, {
        success: data => {
            $("body > *").first().before(data);
        }
    });
    $.ajax(footerUrl, {
        success: data => {
            $("body > *").last().after(data);
        }
    });
});
