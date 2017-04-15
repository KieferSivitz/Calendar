"use strict";
var headerUrl = "../Calendar/pages/header.html";
var footerUrl = "../Calendar/pages/footer.html";

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
