$('.box').hide()
$('.chat').hide()
$('.chatButton').hide()
$('#signOutButton').hide()

$('#signUpButton').on('click', function (event) {
	let email = $('#signUpEmail').val()
	let password = $('#signUpPassword').val()
	console.log(email , password)
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(function(user) {
		if (user) {
			console.log(user.uid)
			console.log(response)
			$('.box').show()
			$('.chat').show()
			$('.chatButton').show()
		}
	})
	.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
});

$('.login').on('click', function (event) {
	let email = $('.signInEmail').val();;
	let password = $('.signInPassword').val();
	console.log( email , password)
firebase.auth().signInWithEmailAndPassword(email, password)
.then( function (response){
	console.log(response)
	$('.box').show()
	$('.chat').show()
	$('.chatButton').show()
})
.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
})
});





$('#signOutButton').on('click',function () {
	firebase.auth().signOut().then(function() {
  // Sign-out successful.
})
	.then(function () {
		$('.box').hide()
	$('.chat').hide()
	$('.chatButton').hide()
	})
	.catch(function(error) {
  // An error happened.
})
});

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAq06g9Kms_FGErlRhOrVS-y3SXYcV8Fqk",
    authDomain: "fir-auth-23ae4.firebaseapp.com",
    databaseURL: "https://fir-auth-23ae4.firebaseio.com",
    projectId: "fir-auth-23ae4",
    storageBucket: "fir-auth-23ae4.appspot.com",
    messagingSenderId: "469103033285"
  };
  firebase.initializeApp(config);

console.log(firebase.auth())
console.log(firebase.auth().currentUser)


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $('.user').text('Signed In!')
    $('.box').show()
		$('.chat').show()
		$('.chatButton').show()
		$('.userName').hide()
		$('#signOutButton').show()
    console.log(user)
  } else {
    // No user is signed in.
    return null
  }
});




$('#messaging').submit(function (e) {
	e.preventDefault();
	console.log(e)
	let words = $('.chat').val();
	$('.userText').append("<li>" + words + "</li>");
	$('.chat').val("");
})


var database = firebase.database();

function writeUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    text: "",
  });
  console.log(firebase.database().ref('users/' + userId))
}
