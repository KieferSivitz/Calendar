"use strict";
const headerUrl = "http://localhost:8000/pages/header.html";
$.ajax(headerUrl, {
    success: data => {
        $("body > *").first().before(data);
    }
});
