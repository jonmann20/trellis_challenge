const trellis = TrellisConnect.configure({
	client_id: 'CHALLENGE',

	// Called when TrellisConnect has completed retrieving policy information from the user.
	// The function is passed in an accountId and a metadata object. The accountId can be
	// used by application server, combined with your Trellis API-SECRET-KEY to pull policy data.
	// The metadata contains summary information about the account connected.
	onSuccess: function(accountId, metadata) {
		//console.log('on success', accountId, metadata);
		checkAccount(accountId);
	},

	// Called each time the user attempts to authenticate with their insurer and fails.
	// onFailure: function() {
	// 	console.log('on failure');
	// },

	// Called when the user closes the modal dialog -- either when they have
	// successfully loaded their policies (potentially after an onSuccess() call) or by
	// clicking the "X" button in the top right of the modal.
	// onClose: function() {
	// 	console.log('on close');
	// },

	// Similar in meaning to segment.com's analytics.track() call for events occuring
	// inside the Trellis widget.
	// e -- the name of the analytics tracking event
	// params -- a dictionary object of additional event data
	// track: function(e, params) {
	// 	console.log('track', e, params);
	// },

	// Similar in meaning to segment.com's analytics.page() call for pageviews occuring
	// inside the Trellis widget.  We fire a page() call for every widget screen.
	// page -- the name of the page visited
	// params -- a dictionary object of additional pageview data
	// page: function(page, params) {
	// 	console.log('page', page, params);
	// },

	features: 'nostickystate',

	// A URL that is called asynchronously by the Trellis API when it has completed
	// pulling insurance data.
	webhook: 'http://localhost:8080'
});

document.querySelector('button').addEventListener('click', () => {
	trellis.open();
});

const BASE_URL = 'https://api.trellisconnect.com/trellis/connect/1.1.0/';
const headers = {
	'Accept': 'application/json',
	'X-API-Client-Id': 'CHALLENGE',
	'X-API-Secret-Key': 'CHALLENGESECRET'
};

async function checkAccount(id) {
	const response = await fetch(`${BASE_URL}account/${id}`, {headers});
	const data = await response.json();

	if(!data.policiesAvailable) {
		setTimeout(() => checkAccount(id), 1000);
		return;
	}

	loadPolicies(id);
}

const ul = document.querySelector('ul');
async function loadPolicies(id) {
	const response = await fetch(`${BASE_URL}account/${id}/policies`, {headers});
	const data = await response.json();
	
	data.policies.forEach(policy => {
		policy.vehicles.forEach(vehicle => {
			let li = document.createElement('li');
			li.textContent = vehicle.make;

			let li2 = document.createElement('li');
			li2.textContent = vehicle.model;

			let li3 = document.createElement('li');
			li3.textContent = vehicle.year;

			let li4 = document.createElement('li');
			li4.textContent = vehicle.vin;

			let li5 = document.createElement('li');

			ul.appendChild(li);
			ul.appendChild(li2);
			ul.appendChild(li3);
			ul.appendChild(li4);
			ul.appendChild(li5);
		});
	});
}