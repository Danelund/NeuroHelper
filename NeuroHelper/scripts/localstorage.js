(function (window, global, $) {
    
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
app.localstorage.prototype = {
    
    insert:function(variable, value) {
		localStorage.setItem(variable, value);
	},
    
	get:function(variable) {
		if (localStorage.getItem(variable) != undefined) {
			return localStorage.getItem(variable);
		}
		else {
			return Null;
		}
	},
    
	remove:function(variable) {
		if (localStorage.getItem(variable) != undefined) {
			localStorage.removeItem(variable);
			return "Deleted";
		}
		else {
			return = Null;
		}
	},
    
	clear:function() {
		localStorage.clear();
	}
}
}
});