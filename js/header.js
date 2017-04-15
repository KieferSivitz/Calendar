"use strict";
var headerUrl = "../pages/header.html";
var footerUrl = "../pages/footer.html";

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
