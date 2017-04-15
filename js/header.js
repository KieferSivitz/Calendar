"use strict";
const headerUrl = "../pages/header.html";
$.ajax(headerUrl, {
    success: data => {
        $("body > *").first().before(data);
    }
});
