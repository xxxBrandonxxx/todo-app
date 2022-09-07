// SELECTING THE FORM ELEMENTS
const form = document.getElementById('todoform')

// FORM SUBMIT PREVENT PAGE FROM REFRESHING ON NORMAL SUBMIT
form.addEventListener('submit', function(event) {
  event.preventDefault();
});


