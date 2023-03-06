var firebaseConfig = {
	apiKey: "AIzaSyCu_nRoURohiSg1EiPq0-j688c7h8huVb0",
	authDomain: "darkweb-cx.firebaseapp.com",
	projectId: "darkweb-cx",
	storageBucket: "darkweb-cx.appspot.com",
	messagingSenderId: "1055160986860",
	appId: "1:1055160986860:web:c6111daab14ed88c6449c9",
	measurementId: "G-RHT9YVDQEG"
};
firebase.initializeApp(firebaseConfig);


var db = firebase.firestore();

const logoHolder = document.getElementById("logo");
const thePic = document.getElementById('the-pic');
const thenoPic = document.getElementById('the-nopic');
const theId = document.getElementById('the-id');
const theDate = document.getElementById('the-date');
const labelDate = document.getElementById('label-date');

const avatarHolder = document.getElementById("avatar");
const jinaHolder = document.getElementById("jinaHolder");
const jinaHolder2 = document.getElementById("jinaHolder2");
const jinaHolder3 = document.getElementById('jinaHolder3');
const jinaHolder4 = document.getElementById('jinaHolder4');

const nameHolder1 = document.getElementById('nameBro1');
const nameHolder2 = document.getElementById('nameBro2');
const nameHolder3 = document.getElementById('nameBro3');

const email5 = document.getElementById('yourEmail5');

const thePic2 = document.getElementById('the-pic2');
const thenoPic2 = document.getElementById('the-nopic2');

const vpnImg = document.getElementById('vpn-img');
const vpn = document.getElementById('vpn');

const plat1 = document.getElementById('plat1');
const plat2 = document.getElementById('plat2');
const plat3 = document.getElementById('plat3');

const mailField = document.getElementById('inputEmail');
const signUp = document.getElementById('signUp');

const emailIn = document.getElementById('email-in');
const phoneIn = document.getElementById('phone-in');

const verP = document.getElementById('ver-p');
const verImg = document.getElementById('ver-img');

const phoneNumberField = document.getElementById('phoneNumber');
const codeField = document.getElementById('code');
const signInWithPhoneButton = document.getElementById('signInWithPhone');
const getCodeButton = document.getElementById('getCode');

const auth = firebase.auth();
if(localStorage.getItem('received-funds')) {
	window.location.assign('invoice');
}
auth.onAuthStateChanged(user => {
	let goodies = [];
	if (!user || localStorage.getItem('cx-out')) {
		window.location.assign('index');
	}
	if (user.photoURL) {
		avatarHolder.setAttribute("src", user.photoURL);
		avatarHolder.style.display = 'block';
		thePic.setAttribute("src", user.photoURL);
		thePic.style.display = 'inline-block';
		thePic2.setAttribute("src", user.photoURL);
		thePic2.style.display = 'inline-block';
		
	} else if (!user.photoURL) {
		if(user.phoneNumber) {
			avatarHolder.setAttribute("src", 'img/partners/phone.png');
			avatarHolder.style.display = 'block';
			avatarHolder.style.borderWidth = 0;
			avatarHolder.style.borderRadius = 0;
			thenoPic.style.display = 'inline-block';
			thenoPic2.style.display = 'inline-block';
		} else {
			logoHolder.style.display = 'block';
			thenoPic.style.display = 'inline-block';
			thenoPic2.style.display = 'inline-block';
		}
	}
	if(user.email && user.phoneNumber) {
		if (user.displayName && user.email) {
			if(user.email.includes('yahoo.com')){
				vpnImg.src = 'img/partners/yahoo.png';
				verImg.src = 'img/partners/yahoo.png';
				vpn.innerHTML = `View Profile <img src="img/partners/yahoo.png">`;
			} else {
				vpnImg.src = 'img/partners/google.png';
				verImg.src = 'img/partners/google.png';
				vpn.innerHTML = `View Profile <img src="img/partners/google.png">`;
			}
		} else if (!user.displayName && user.email) {	
			vpnImg.src = 'img/partners/emails.png';
			verImg.src = 'img/partners/emails.png';
			vpn.innerHTML = `View Profile <img src="img/partners/emails.png">`;
		} 
		if (localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)) {
			goodies = JSON.parse(localStorage.getItem('banklogs'));
			for (var i = 0; i < goodies.length; i++) {
				document.getElementById(`name-on-table${items.indexOf(items[i])}`).innerHTML = user.phoneNumber.substring(user.phoneNumber.length - 4, 0) + '.....';
			}
		}

		jinaHolder.value = user.phoneNumber;
		jinaHolder3.value = user.phoneNumber;
		jinaHolder4.value = user.phoneNumber;
		nameHolder1.value = user.phoneNumber;
		nameHolder2.value = user.phoneNumber;
		nameHolder3.value = user.phoneNumber;
		email5.innerHTML = user.phoneNumber;
		phoneIn.innerText = user.phoneNumber;

		emailIn.innerText = 'Verify Email';
		emailIn.addEventListener('click', sendEmail);
		emailIn.setAttribute('data-bs-target', '#emailModal');
		phoneIn.setAttribute('data-bs-target', '#vpnModal');
		jinaHolder2.innerText = 'User ID: ' + user.uid;
	} else if(user.email && !user.phoneNumber) {
		var themail = user.email;
		var theaddress = themail.substring(0, themail.indexOf('@'));

		if (user.displayName && user.email) {
			jinaHolder.value = user.displayName;
			jinaHolder3.value = user.displayName;
			jinaHolder4.value = user.displayName;
			nameHolder1.value = user.displayName;
			nameHolder2.value = user.displayName;
			nameHolder3.value = user.displayName;
	
			if (localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)) {
				goodies = JSON.parse(localStorage.getItem('banklogs'));
				for (var i = 0; i < goodies.length; i++) {
					document.getElementById(`name-on-table${items.indexOf(items[i])}`).innerHTML = user.displayName;
				}
			}
			if(user.email.includes('yahoo.com')){
				vpnImg.src = 'img/partners/yahoo.png';
				verImg.src = 'img/partners/yahoo.png';
				vpn.innerHTML = `View Profile <img src="img/partners/yahoo.png">`;
			} else {
				vpnImg.src = 'img/partners/google.png';
				verImg.src = 'img/partners/google.png';
				vpn.innerHTML = `View Profile <img src="img/partners/google.png">`;
			}
		} else if (!user.displayName && user.email) {	
			jinaHolder.value = theaddress;
			jinaHolder3.value = theaddress;
			jinaHolder4.value = theaddress;
			nameHolder1.value = theaddress;
			nameHolder2.value = theaddress;
			nameHolder3.value = theaddress;
	
			if (localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)) {
				goodies = JSON.parse(localStorage.getItem('banklogs'));
				for (var i = 0; i < goodies.length; i++) {
					document.getElementById(`name-on-table${items.indexOf(items[i])}`).innerHTML = theaddress;
				}
			}
			vpnImg.src = 'img/partners/emails.png';
			verImg.src = 'img/partners/emails.png';
			vpn.innerHTML = `View Profile <img src="img/partners/emails.png">`;
		} 

		emailIn.innerText = 'Verify Email';
		emailIn.addEventListener('click', sendEmail);
		emailIn.setAttribute('data-bs-target', '#emailModal');
		jinaHolder2.innerText = 'User ID: ' + user.uid;
		email5.innerHTML = user.email;
	} else if(!user.email && user.phoneNumber) {
		jinaHolder.value = user.phoneNumber;
		jinaHolder3.value = user.phoneNumber;
		jinaHolder4.value = user.phoneNumber;
		nameHolder1.value = user.phoneNumber;
		nameHolder2.value = user.phoneNumber;
		nameHolder3.value = user.phoneNumber;
		phoneIn.innerText = user.phoneNumber;
		email5.innerHTML = user.phoneNumber;

		if (localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)) {
			goodies = JSON.parse(localStorage.getItem('banklogs'));
			for (var i = 0; i < goodies.length; i++) {
				document.getElementById(`name-on-table${items.indexOf(items[i])}`).innerHTML = user.phoneNumber.substring(user.phoneNumber.length - 4, 0) + '.....';
			}
		}

		phoneIn.setAttribute('data-bs-target', '#vpnModal');
		jinaHolder2.innerText = 'User ID: ' + user.uid;
		vpnImg.src = 'img/partners/phone.png';
		vpn.innerHTML = `View Profile <img src="img/partners/phone.png">`;
	} else if(user.isAnonymous) {
		if (user.isAnonymous && user.displayName) {
			jinaHolder.value = user.displayName;
			jinaHolder3.value = user.displayName;
			jinaHolder4.value = user.displayName;
			nameHolder1.value = user.displayName;
			nameHolder2.value = user.displayName;
			nameHolder3.value = user.displayName;

			if (localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)) {
				goodies = JSON.parse(localStorage.getItem('banklogs'));
				for (var i = 0; i < goodies.length; i++) {
					document.getElementById(`name-on-table${items.indexOf(items[i])}`).innerHTML = user.displayName;
				}
			}
		} else 	if (user.isAnonymous && !user.displayName) {
			jinaHolder.value = 'Anonymous';
			jinaHolder3.value = 'Anonymous';
			jinaHolder4.value = 'Anonymous';
			nameHolder1.value = 'ANONYMOUS';
			nameHolder2.value = 'ANONYMOUS';
			nameHolder3.value = 'ANONYMOUS';
	
			if (localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)) {
				goodies = JSON.parse(localStorage.getItem('banklogs'));
				for (var i = 0; i < goodies.length; i++) {
					document.getElementById(`name-on-table${items.indexOf(items[i])}`).innerHTML = 'Anonymous';
				}
			}
		}

		jinaHolder2.innerText = 'User ID: ' + user.uid;
		jinaHolder.readOnly = false;
		jinaHolder3.readOnly = false;
		jinaHolder4.readOnly = false;
		email5.innerHTML = `Logged in anonymously, you can link a valid email address on the confirm page to get an email invoice`;
		vpn.innerHTML = `View Profile <img src="img/partners/anonymous.png">`;
		vpnImg.src = 'img/partners/anonymous.png';
	}



	if(user.uid){
		theId.innerHTML = user.uid;
		let theDatez2 = new Date(user.metadata.b * 1);
		let theDatez = theDatez2.toString();
		let therealDate = theDatez.substring(theDatez.indexOf('(') + 1).replace(' Time)', '');
		theDate.innerHTML = new Date(user.metadata.b * 1);
		labelDate.innerHTML = `Login Time: (${therealDate}) <img src="img/partners/clock.png">`;
	}
});

function sendEmail() {
	if(!localStorage.getItem('verify-cx')) {
		auth.currentUser.sendEmailVerification();
		verP.innerHTML = `
			Verification email sent to <span>${auth.currentUser.email}</span>. <br>
			Check the <span>spam / junk</span> folder
		`;

		var shortCutFunction = 'success';
		var msg = `
			Verification email sent to: ${auth.currentUser.email}, 
			<hr class="to-hr">
			Check the spam / junk folder.
		`;
		toastr.options = {
			closeButton: true,
			debug: false,
			newestOnTop: true,
			progressBar: true,
			positionClass: 'toast-top-full-width',
			preventDuplicates: true,
			onclick: null
		};
		var $toast = toastr[shortCutFunction](msg);
		$toastlast = $toast;
	} else {
		verP.innerHTML = `
			Verification email has already been sent to <span>${auth.currentUser.email}</span>. <br>
			Check the <span>spam / junk</span> folder
		`;

		var shortCutFunction = 'success';
		var msg = `
			Verification email has already been sent to: ${auth.currentUser.email}, 
			<hr class="to-hr">
			Check the spam / junk folder.
		`;
		toastr.options = {
			closeButton: true,
			debug: false,
			newestOnTop: true,
			progressBar: true,
			positionClass: 'toast-top-full-width',
			preventDuplicates: true,
			onclick: null
		};
		var $toast = toastr[shortCutFunction](msg);
		$toastlast = $toast;
	}
	localStorage.setItem('verify-cx', true);
}

const signUpFunction = () => {
	event.preventDefault();
	const email = mailField.value;
	var actionCodeSettings = {
		url: 'https://www.darkweb.cx/link',
		handleCodeInApp: true,
	};
	if(email.includes('@gmail.com') || email.includes('@GMAIL.COM')) {
		const googleProvider = new firebase.auth.GoogleAuthProvider;
		const theUser = auth.currentUser;
		theUser.linkWithPopup(googleProvider).then(() => {
			theUser.updateProfile({
				displayName: theUser.providerData[0].displayName, 
				photoURL: theUser.providerData[0].photoURL,
				isAnonymous: false
			}).then(() => {
				$('#loginModal').modal('hide');

				emailIn.innerText = 'Verify Email';
				emailIn.addEventListener('click', sendEmail);
				emailIn.setAttribute('data-bs-target', '#emailModal');

				avatarHolder.setAttribute("src", theUser.photoURL);
				avatarHolder.style.display = 'block';
				thePic.setAttribute("src", theUser.photoURL);
				thePic2.setAttribute("src", theUser.photoURL);
				thePic.style.display = 'inline-block';
				thePic2.style.display = 'inline-block';
				logoHolder.style.display = 'none';
				thenoPic.style.display = 'none';
				thenoPic2.style.display = 'none';
				vpnImg.src = 'img/partners/google.png';
				vpn.innerHTML = `View Profile <img src="img/partners/google.png">`;

				if(!theUser.phoneNumber) {
					jinaHolder.value = theUser.displayName;
					jinaHolder3.value = theUser.displayName;
					jinaHolder4.value = theUser.displayName;
					nameHolder1.value = theUser.displayName;
					nameHolder2.value = theUser.displayName;
					nameHolder3.value = theUser.displayName;
					email5.innerHTML = theUser.displayName;
					if (localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)) {
						goodies = JSON.parse(localStorage.getItem('banklogs'));
						for (var i = 0; i < goodies.length; i++) {
							document.getElementById(`name-on-table${items.indexOf(items[i])}`).innerHTML = theUser.displayName;
						}
					}
				} else {
					avatarHolder.style.borderWidth = '1.4px';
					avatarHolder.style.borderRadius = '50%';
				}
			});
		}).catch(error => {
			document.getElementById('ver-email').innerHTML = `
				${error.message} : <span>${mailField.value}</span> <br>
				Use a different email address.
			`;
			var shortCutFunction = 'success';
			var msg = `
				${error.message} : ${mailField.value} <br>
				<hr class="to-hr">
				Use a different email address.
			`;
			toastr.options = {
				closeButton: true,
				debug: false,
				newestOnTop: true,
				progressBar: true,
				positionClass: 'toast-top-full-width',
				preventDuplicates: true,
				onclick: null
			};
			var $toast = toastr[shortCutFunction](msg);
			$toastlast = $toast;
		});
	} else if(email.includes('@yahoo.com') || email.includes('@YAHOO.COM')) {
		const yahooProvider = new firebase.auth.OAuthProvider('yahoo.com');
		const theUser = auth.currentUser;
		theUser.linkWithPopup(yahooProvider).then(() => {
			theUser.updateProfile({
				displayName: theUser.providerData[0].displayName, 
				photoURL: theUser.providerData[0].photoURL,
				isAnonymous: false
			}).then(() => {
				$('#loginModal').modal('hide');

				emailIn.innerText = 'Verify Email';
				emailIn.addEventListener('click', sendEmail);
				emailIn.setAttribute('data-bs-target', '#emailModal');

				avatarHolder.setAttribute("src", theUser.photoURL);
				avatarHolder.style.display = 'block';
				thePic.setAttribute("src", theUser.photoURL);
				thePic2.setAttribute("src", theUser.photoURL);
				thePic.style.display = 'inline-block';
				thePic2.style.display = 'inline-block';
				logoHolder.style.display = 'none';
				thenoPic.style.display = 'none';
				thenoPic2.style.display = 'none';
				vpnImg.src = 'img/partners/yahoo.png';
				vpn.innerHTML = `View Profile <img src="img/partners/yahoo.png">`;

				if(!theUser.phoneNumber) {
					jinaHolder.value = theUser.displayName;
					jinaHolder3.value = theUser.displayName;
					jinaHolder4.value = theUser.displayName;
					nameHolder1.value = theUser.displayName;
					nameHolder2.value = theUser.displayName;
					nameHolder3.value = theUser.displayName;
					email5.innerHTML = theUser.displayName;
					if (localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)) {
						goodies = JSON.parse(localStorage.getItem('banklogs'));
						for (var i = 0; i < goodies.length; i++) {
							document.getElementById(`name-on-table${items.indexOf(items[i])}`).innerHTML = theUser.displayName;
						}
					}
				} else {
					avatarHolder.style.borderWidth = '1.4px';
					avatarHolder.style.borderRadius = '50%';
				}
			});
		}).catch(error => {
			document.getElementById('ver-email').innerHTML = `
				${error.message} : <span>${mailField.value}</span> <br>
				Use a different email address.
			`;
			var shortCutFunction = 'success';
			var msg = `
				${error.message} : ${mailField.value} <br>
				<hr class="to-hr">
				Use a different email address.
			`;
			toastr.options = {
				closeButton: true,
				debug: false,
				newestOnTop: true,
				progressBar: true,
				positionClass: 'toast-top-full-width',
				preventDuplicates: true,
				onclick: null
			};
			var $toast = toastr[shortCutFunction](msg);
			$toastlast = $toast;
		});
	} else {
		auth.sendSignInLinkToEmail(email, actionCodeSettings)
		.then(() => {
			document.getElementById('ver-email').innerHTML = `
				Verification link sent to your email <span>${email}</span>.
				<br> 
				Check the <span>spam / junk </span> folder.
			`;

			var shortCutFunction = 'success';
			var msg = `
				Verification link sent to your email: ${email}.
				<hr class="to-hr">
				Check the spam / junk folder.
			`;
			toastr.options = {
				closeButton: true,
				debug: false,
				newestOnTop: true,
				progressBar: true,
				positionClass: 'toast-top-full-width',
				preventDuplicates: true,
				onclick: null
			};
			var $toast = toastr[shortCutFunction](msg);
			$toastlast = $toast;

			window.localStorage.setItem('emailForSignIn', email);
		}).catch(error => {
			var shortCutFunction = 'success';
			var msg = `${error.message}`;
			toastr.options = {
				closeButton: true,
				debug: false,
				newestOnTop: true,
				progressBar: true,
				positionClass: 'toast-top-full-width',
				preventDuplicates: true,
				onclick: null
			};
			var $toast = toastr[shortCutFunction](msg);
			$toastlast = $toast;
		});
	}
}
signUp.addEventListener('click', signUpFunction);
document.getElementById('the-form').addEventListener('submit', signUpFunction);


window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible'
});

const sendVerificationCode = () => {
	const phoneNumber = phoneNumberField.value;
	const appVerifier = window.recaptchaVerifier;

	auth.signInWithPhoneNumber(phoneNumber, appVerifier)
		.then(confirmationResult => {
			const sentCodeId = confirmationResult.verificationId;
			signInWithPhoneButton.addEventListener('click', () => signInWithPhone(sentCodeId));

			var shortCutFunction = 'success';
			var msg = `
				Verification  code sent to your phone: ${phoneNumber}.
				<hr class="to-hr">
				Check your messages inbox.
			`;
			toastr.options = {
				closeButton: true,
				debug: false,
				newestOnTop: true,
				progressBar: true,
				positionClass: 'toast-top-full-width',
				preventDuplicates: true,
				onclick: null
			};
			var $toast = toastr[shortCutFunction](msg);
			$toastlast = $toast;
		})
		.catch(error => {
			var shortCutFunction = 'success';
			var msg = `${error.message}`;
			toastr.options = {
				closeButton: true,
				debug: false,
				newestOnTop: true,
				progressBar: true,
				positionClass: 'toast-top-full-width',
				preventDuplicates: true,
				onclick: null
			};
			var $toast = toastr[shortCutFunction](msg);
			$toastlast = $toast;
		})
}
const signInWithPhone = sentCodeId => {
	const code = codeField.value;
	const credential = firebase.auth.PhoneAuthProvider.credential(sentCodeId, code);
	const theUser = auth.currentUser;

	auth.currentUser.linkWithCredential(credential)
		.then(() => {
			theUser.updateProfile({
				phoneNumber: auth.currentUser.providerData[0].phoneNumber,
				isAnonymous: false
			}).then(() => {
				$('#verifyModal').modal('hide');
				phoneIn.setAttribute('data-bs-target', '#vpnModal');
				jinaHolder.value = theUser.phoneNumber;
				jinaHolder3.value = theUser.phoneNumber;
				jinaHolder4.value = theUser.phoneNumber;
				phoneIn.innerText = theUser.phoneNumber;
				nameHolder1.value = theUser.phoneNumber;
				nameHolder2.value = theUser.phoneNumber;
				nameHolder3.value = theUser.phoneNumber;
				email5.innerHTML = theUser.phoneNumber;

				vpn.innerHTML = `View Profile <img src="img/partners/phone.png">`;

				if (localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)) {
					goodies = JSON.parse(localStorage.getItem('banklogs'));
					for (var i = 0; i < goodies.length; i++) {
						document.getElementById(`name-on-table${items.indexOf(items[i])}`).innerHTML = theUser.phoneNumber.substring(theUser.phoneNumber.length - 4, 0) + '.....';
					}
				}

				if(!theUser.email) {
					avatarHolder.setAttribute("src", 'img/partners/phone.png');
					avatarHolder.style.display = 'block';
					avatarHolder.style.borderWidth = 0;
					avatarHolder.style.borderRadius = 0;
					thenoPic.style.display = 'inline-block';
					thenoPic2.style.display = 'inline-block';
					vpnImg.src = 'img/partners/phone.png';
					vpn.innerHTML = `View Profile <img src="img/partners/phone.png">`;
					logoHolder.style.display = 'none';
					thePic.style.display = 'none';	
					thePic2.style.display = 'none';
				}

			});
		})
		.catch(error => {
			var shortCutFunction = 'success';
			var msg = `${error.message}`;
			toastr.options = {
				closeButton: true,
				debug: false,
				newestOnTop: true,
				progressBar: true,
				positionClass: 'toast-top-full-width',
				preventDuplicates: true,
				onclick: null
			};
			var $toast = toastr[shortCutFunction](msg);
			$toastlast = $toast;
		})
}
getCodeButton.addEventListener('click', sendVerificationCode);


fetch('https://ipapi.co/json/')
.then(function(response) {
	return response.json();
})
.then(function(data) {
	var countyCode = data.country_code;
	var newCode = countyCode.toLowerCase();

	document.getElementById('the-flag2').src = `https://flagcdn.com/144x108/${newCode}.png`;
	document.getElementById('phoneNumber').value = data.country_calling_code;

	document.getElementById('label-ip').innerHTML = `
		IP address: <span>${data.ip}</span> ${data.country_calling_code} <img src="https://flagcdn.com/144x108/${newCode}.png" id="the-flag" />
	`;
	document.getElementById('the-ip').innerHTML = ` ${data.region},  ${data.org}, ${data.city}, ${data.country_name}`;
});

$('#myform').on('submit', function(ev) {
	ev.preventDefault();
	$('#phoneModal').modal('hide');
	$('#verifyModal').modal('show');
});

jinaHolder.addEventListener("change", () => {
	auth.currentUser.updateProfile({
		displayName: jinaHolder.value
	})
	.then(() => {
		alert('Display Name Updated Successfully !');
		jinaHolder3.value = jinaHolder.value;
		jinaHolder4.value = jinaHolder.value;
	})
	.catch(error => {
		jinaHolder.focus();
	})
});

jinaHolder4.addEventListener("change", () => {
	auth.currentUser.updateProfile({
		displayName: jinaHolder4.value
	})
	.then(() => {
		alert('Display Name Updated Successfully !');
		jinaHolder.value = jinaHolder4.value;
		jinaHolder3.value = jinaHolder4.value;
	})
	.catch(error => {
		jinaHolder4.focus();
	})
});

const logOut = document.getElementById('logout');
logOut.addEventListener('click', () => {
    if(auth.currentUser.isAnonymous) {
		auth.currentUser.delete()
			.then(() => {
				window.location.assign('index');
			})
			.catch(error => {
				console.error(error);
			})
	} else {
		localStorage.setItem('cx-out', true);
		window.location.assign('index');
	}
})

var d = new Date();
var n = d.getMonth() + 1;
var y = d.getFullYear();
var m = d.getDate();



document.getElementById("thebodyz").oncontextmenu = function() {
	return false
};
if(!window.location.href.includes('5502')) {
	document.addEventListener("keydown", function (event) {
		if (event.ctrlKey) {
			event.preventDefault();
		}   
	});
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 1
setInterval(drawClock, 1000);

function drawClock() {
	drawFace(ctx, radius);
	drawNumbers(ctx, radius);
	drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
	var grad;
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, 2 * Math.PI);
	ctx.fillStyle = 'white';
	ctx.fill();
	grad = ctx.createRadialGradient(0, 0, radius * 0.05, 0, 0, radius * 2.5);
	grad.addColorStop(0, '#121d33');
	grad.addColorStop(0.5, 'rgba(0,0,0,0)');
	grad.addColorStop(1, '#121d33');
	ctx.strokeStyle = grad;
	ctx.lineWidth = radius * 0;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
	ctx.fillStyle = '#121d33';
	ctx.fill();
}

function drawNumbers(ctx, radius) {
	var ang;
	var num;
	ctx.font = radius * 0.33 + "px arial";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	for (num = 1; num < 13; num++) {
		ang = num * Math.PI / 6;
		ctx.rotate(ang);
		ctx.translate(0, -radius * 0.87);
		ctx.rotate(-ang);
		ctx.fillText(num.toString(), 0, 0);
		ctx.rotate(ang);
		ctx.translate(0, radius * 0.87);
		ctx.rotate(-ang);
	}
}

function drawTime(ctx, radius) {
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	//hour
	hour = hour % 12;
	hour = (hour * Math.PI / 6) +
		(minute * Math.PI / (6 * 60)) +
		(second * Math.PI / (360 * 60));
	drawHand(ctx, hour, radius * 0.5, radius * 0.07);
	//minute
	minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
	drawHand(ctx, minute, radius * 0.8, radius * 0.07);
	// second
	second = (second * Math.PI / 30);
	drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	ctx.moveTo(0, 0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-pos);
}



function getItems() {
	db.collection("todo-items").onSnapshot((snapshot) => {
		let items = [];
		snapshot.docs.forEach((doc) => {
			items.push({
				id: doc.id,
				...doc.data()
			})
		})
		generateItems(items);
	})
}


function generateItems(items) {
	let todoItems = []
	items.forEach((item) => {

		let todoItem = document.createElement("div");
		todoItem.classList.add('alert', 'alert-info', 'alert-dismissible');
		let checkContainer = document.createElement("div");
		checkContainer.classList.add("check");
		let checkMark = document.createElement("button");
		checkMark.classList.add("btn-close");
		checkMark.innerHTML = `&times;`;
		checkMark.addEventListener("click", function() {
			markCompleted(item.id);
		})
		checkContainer.appendChild(checkMark);
		todoItem.innerText = item.text;
		todoItem.appendChild(checkContainer);
		todoItems.push(todoItem)
	})
	document.querySelector(".todo-items").replaceChildren(...todoItems);
}

function clearInput() {
	document.getElementById('todo-input').value = '';
}

function addItem(event) {
	event.preventDefault();
	let text = document.getElementById("todo-input");
	if(text.value !== '' && text.value !== 'New comment...') {
		let newItem = db.collection("todo-items").add({
			text: text.value,
			status: "active"
		})
	}
	text.value = "";
}
function markCompleted(id) {
	let item = db.collection("todo-items").doc(id);
	item.get().then(function(doc) {
		if (doc.exists) {
			if (doc.data().status == "active") {
				item.update({
					status: "completed"
				});
				item.delete();
			} else {
				item.update({
					status: "active"
				})
			}
		}
	})
}

getItems();





















var canvas3 = document.getElementById("canvas3");
var ctx3 = canvas3.getContext("2d");
var radius3 = canvas3.height / 2;
ctx3.translate(radius3, radius3);
radius3 = radius3 * 1
setInterval(drawClock3, 1000);

function drawClock3() {
	drawFace3(ctx3, radius3);
	drawNumbers3(ctx3, radius3);
	drawTime3(ctx3, radius3);
}

function drawFace3(ctx3, radius3) {
	var grad3;
	ctx3.beginPath();
	ctx3.arc(0, 0, radius3, 0, 2 * Math.PI);
	ctx3.fillStyle = 'white';
	ctx3.fill();
	grad3 = ctx3.createRadialGradient(0, 0, radius3 * 0.05, 0, 0, radius3 * 2.5);
	grad3.addColorStop(0, '#121d33');
	grad3.addColorStop(0.5, 'rgba(0,0,0,0)');
	grad3.addColorStop(1, '#121d33');
	ctx3.strokeStyle = grad3;
	ctx3.lineWidth = radius3 * 0;
	ctx3.stroke();
	ctx3.beginPath();
	ctx3.arc(0, 0, radius3 * 0.1, 0, 2 * Math.PI);
	ctx3.fillStyle = '#121d33';
	ctx3.fill();
}

function drawNumbers3(ctx3, radius3) {
	var ang3;
	var num3;
	ctx3.font = radius3 * 0.33 + "px arial";
	ctx3.textBaseline = "middle";
	ctx3.textAlign = "center";
	for (num3 = 1; num3 < 13; num3++) {
		ang3 = num3 * Math.PI / 6;
		ctx3.rotate(ang3);
		ctx3.translate(0, -radius3 * 0.87);
		ctx3.rotate(-ang3);
		ctx3.fillText(num3.toString(), 0, 0);
		ctx3.rotate(ang3);
		ctx3.translate(0, radius3 * 0.87);
		ctx3.rotate(-ang3);
	}
}

function drawTime3(ctx3, radius3) {
	var now3 = new Date();
	var hour3 = now3.getHours();
	var minute3 = now3.getMinutes();
	var second3 = now3.getSeconds();
	//hour
	hour3 = hour3 % 12;
	hour3 = (hour3 * Math.PI / 6) +
		(minute3 * Math.PI / (6 * 60)) +
		(second3 * Math.PI / (360 * 60));
	drawHand3(ctx3, hour3, radius3 * 0.5, radius3 * 0.07);
	//minute
	minute3 = (minute3 * Math.PI / 30) + (second3 * Math.PI / (30 * 60));
	drawHand3(ctx3, minute3, radius3 * 0.8, radius3 * 0.07);
	// second
	second3 = (second3 * Math.PI / 30);
	drawHand3(ctx3, second3, radius3 * 0.9, radius3 * 0.02);
}

function drawHand3(ctx3, pos, length, width) {
	ctx3.beginPath();
	ctx3.lineWidth = width;
	ctx3.lineCap = "round";
	ctx3.moveTo(0, 0);
	ctx3.rotate(pos);
	ctx3.lineTo(0, -length);
	ctx3.stroke();
	ctx3.rotate(-pos);
}

if(!window.location.href.includes('5502')) {
	function disableCtrlKeyCombination(e){
		var forbiddenKeys = new Array('a', 'n', 'c', 'x', 'i', 'v', 'j' , 'w', 'i');
		var key;
		var isCtrl;
		if(window.event){
			key = window.event.keyCode;
			if(window.event.ctrlKey) {
				isCtrl = true;
			} else {
				isCtrl = false;
			}
		} else {
			key = e.which; 
			if(e.ctrlKey) {
				isCtrl = true;
			}
			else {
				isCtrl = false;
			}
		}
		//if ctrl is pressed check if other key is in forbidenKeys array
		if(isCtrl) {
			for(i=0; i<forbiddenKeys.length; i++) {
				if(forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
					alert('Key combination CTRL + '+String.fromCharCode(key) +' has been disabled.');
					return false;
				}
			}
		}
		return true;
	}
}