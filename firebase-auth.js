$('.box').hide()
$('.chat').hide()
$('.chatButton').hide()
$('#signOutButton').hide()
$('.uid').hide()

let email ="";
let text = "";

$('#signUpButton').on('click', function (event) {
	email = $('#signUpEmail').val()
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
	email = $('.signInEmail').val();
	let password = $('.signInPassword').val();
	console.log( email , password)
firebase.auth().signInWithEmailAndPassword(email, password)
.then(user => user.getToken())
.then(JWT => console.log(JWT))
.then( function (response){
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




firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $('.user').text('Signed In!')
    $('.box').show()
		$('.chat').show()
		$('.chatButton').show()
		$('.userName').hide()
		$('#signOutButton').show()
		$('.uid').text(user.uid)

firebase.database().ref("message").on('value',function(snapshot){
	snapshot.forEach(function(childSnapshot){
        postChat(childSnapshot);
      });
})
  } else {
    // No user is signed in.
    return null
  }
});

// function postChat(data){
//     let val = data.val().text;
// 		console.log(val)
//     // var container = document.createElement('div');
//     // container.innerHTML = "<div><p class='chip'>"+val.text+"</p><h6>"+val.email+"</h6></div>";
//     // div = container.firstChild;
//     // // div.setAttribute('id', data.key);
//       $( ".userText" ).append("<li>" + data.val().text + "</li>")
// }

function postChat(data){
  if($("#" + data.key).length == 0) {
    let val = data.val();
    var container = document.createElement('div');
    container.innerHTML = "<div><p class='chip'>"+val.text+"</p></div>";
    div = container.firstChild;
    div.setAttribute('id', data.key);
      $( ".userText" ).append(div);
  }
}


var base = firebase.database();

$('#messaging').submit(function (e, user ) {
	e.preventDefault();
	console.log(user)
	let words = $('.chat').val();
	let uid = $('.uid').text()
	console.log(uid)
	$('.userText').append("<li>" + words + "</li>");
	$('.chat').val("");
	  firebase.database().ref(`message/`).push({
	    text: words
	  }).on('value',function(snapshot) {
			console.log(snapshot.val())
		})
})
