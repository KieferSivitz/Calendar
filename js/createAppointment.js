function makeApiCall(){
    var name = document.getElementById("name")

    var resource = {
    "summary": "My Event",
    "start": {
        "dateTime": (new Date()).toISOString()
    },
    "end": {
        "dateTime": (new Date()).toISOString()
    },
    "description":"We are organizing events",
    "location":"US",
    "attendees":
    {
            "email":"attendee1@gmail.com",
            "displayName": name,
            "organizer":true,
            "self":false,
            "resource":false,
            "optional":false,
            "responseStatus":"needsAction",
            "comment":"This is my demo event",
            "additionalGuests":3
            
    }
    };

    var request = gapi.client.calendar.events.insert({
    'calendarId': 'lckjocdphvruhi8f6b6ge06fhs@group.calendar.google.com',
    'resource': resource
    });

    request.execute(function(resp) {
        location.href = "http://localhost:8000/pages/visualization.html"
    });
}  