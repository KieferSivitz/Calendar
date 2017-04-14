var myCalendar = (function() {
  // Client ID and API key from the Developer Console
  var CLIENT_ID = '683338526131-srk87469aci85bsa8m7kgk36a9fph6lh.apps.googleusercontent.com';

  var apiKey = 'AIzaSyCQkl2Ln-nApzqdXdiGhOtZDk2zjCdWMgI'

  // Array of API discovery doc URLs for APIs used by the quickstart
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  var SCOPES = "https://www.googleapis.com/auth/calendar";

  var authorizeButton = document.getElementById('authorize-button');
  var signoutButton = document.getElementById('signout-button');

  return {
    /**
     *  On load, called to load the auth2 library and API client library.
     */
    handleClientLoad: function() {
      gapi.load('client:auth2', myCalendar.initClient);
    },

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    initClient: function() {
      gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
      }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(myCalendar.updateSigninStatus);

        // Handle the initial sign-in state.
        myCalendar.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = myCalendar.handleAuthClick;
        signoutButton.onclick = myCalendar.handleSignoutClick;
      });
    },

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    updateSigninStatus: function(isSignedIn) {
      if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
      } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
      }
    },

    /**
     *  Sign in the user upon button click.
     */
    handleAuthClick: function(event) {
      gapi.auth2.getAuthInstance().signIn();
    },
    /**
     *  Sign out the user upon button click.
     */
    handleSignoutClick: function(event) {
      gapi.auth2.getAuthInstance().signOut();
    },

    addMinutes: function(day, time, offset) {

      var startHours = time.substring(0, 2);
      var startMinutes = time.substring(3,5);

      var temp = Number(startMinutes);
      temp += offset;
      if (temp > 60){
        startMinutes = temp % 60;
        var temp2 =  startHours;
        startHours = (parseInt(temp2) + 1 ) % 12;
      }else {
        startMinutes = temp;
      }

      var endHours = startHours.toString();
      var endMinute = startMinutes.toString();
      if(endHours.length !== 2){
        endHours = "0" + endHours;
      }

      if(endMinute.length !== 2){
        endMinute = "0" + endMinute;
      }
      return (day + "T" + endHours + ":" + startMinutes + ":00");
    },

    makeApiCall: function(){   
      var name = document.getElementById("name").value || "Jane Doe";
      if(name === ''){
        alert("Please enter your name.");
        return;
      }
      var email = document.getElementById("email").value || "test@gmail.com";
      if(email === ''){
        alert("Please enter your email.");
        return;
      }
      var day = document.getElementById("data-day").value;
      var time = document.getElementById("data-time").value;
      /*if(day === ''){
        alert("Please enter the day and time.");
        return;
      }*/
      var comments = document.getElementById("data-comments").value;
      var radios = document.getElementsByName('barber');
      for (var i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) {
              // do whatever you want with the checked radio
              var barberId = radios[i].value;
              var newUrl = '';
              switch(barberId) {
                case "lckjocdphvruhi8f6b6ge06fhs@group.calendar.google.com":
                  newUrl="http://localhost:8000/pages/Dave.html"
                  break;
                case "s24qchfsg86ovsfmgl7hvpml9g@group.calendar.google.com":
                  newUrl="http://localhost:8000/pages/John.html"
                  break;
                case "rflc74tmppokrr07b9k4tjq2m0@group.calendar.google.com":
                  newUrl="http://localhost:8000/pages/Tammy.html"
                  break;
              }
              document.appointmentForm.action = newUrl;
              // only one radio can be logically checked, don't check the rest
              break;
          }
      }
      
      var date = day + "T" + time + ":00";
      var endTime = myCalendar.addMinutes(day, time, 30);


      var timeZone = 'America/New_York';
      var resource = {
      "summary": name,
      "start": {
          "dateTime": date,
          "timeZone": timeZone
      },
      "end": {
          "dateTime": endTime,
          "timeZone": timeZone
      },
      "description": name,
      "attendees":
        {
                "email": email,
                "displayName": name,
                "organizer":true,
                "resource":false,
                "optional":false,
                "responseStatus":"needsAction",
                "comment": comments,
                "additionalGuests":3

        }
      };           
      var request = gapi.client.calendar.events.insert({
      'calendarId': barberId,
      'resource': resource
      });

      request.execute(function(resp) {
        console.log(resp);
      });

    }
  };
})();
