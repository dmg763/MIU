/* Denise M. Gilbert
MIU Term 1212
Projects 3
December 6, 2012
main.js Page*/

// HOME PAGE

$('#home').on('pageinit', function(){
	//code needed for home page goes here
});

// ADD RECIPIENT PAGE

$('#addItem').on('pageinit', function(){

		var myForm = $('#addRecipientForm'),
			formErrorLink = $('#addRecipientErrorsLink');

		    myForm.validate({			
			invalidHandler: function(form, validator) {
				formErrorLink.click();
				var html = '';
				for (var key in validator.submitted) {
					var label = $('label[for^="'+ key +'"]').not('[generated]');
					var legend = label.closest('fieldset').find('.ui-controlgroup-label');
					var fieldName = legend.length ? legend.text() : label.text();
					html += '<li>'+ fieldName +'</li>';
				};
				$('#addRecipientErrors ul').html(html);
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(this.key);
		}
	});

// ADD RECIPIENT PAGE CODE --------------------------------------------------------------------------------------


	
	// Global Variables

    var purchasedValue,
	    piercedEarsValue = "No";
		
		// Find Values of Selected Radio Buttons
    
    var getSelectedRadio = function () {
	    var radio = document.forms[0].purchased;
	    for (var i = 0; i < radio.length; i += 1) {
		    if (radio[i].checked) { 
			    purchasedValue = radio[i].value;
		    }
	    }
    };
	
	// Find Values of Selected Check Boxes
    
    var getCheckboxValue = function () {
	    if (document.getElementById("piercedEars").checked) {
		    piercedEarsValue = document.getElementById("piercedEars").value;
	    } else {
		    piercedEarsValue = "No";
	    }
    };
	
	// STORE DATA
	
	var storeData = function (key) {
		var id;
	// If There is NO key, This is a Brand New Item That Needs a Key
		if (!key) {
			id = Math.floor(Math.random() * 1000000001);
		} else {
		// Set the id to the Existing Key Being Edited to Save Over the Data in the Record
		// The Key is the Same Key Being Passed Along From the editSubmit Event Handler to the Validate Function and Then Passed Here, Into the storeData Function
			id = key;
		}
		// Gather All Form Field Values and Store in an Object
		// Object Properties Will Contain an Array with the Form Lable and Input Value
	    //getSelectedRadio();
	    getCheckboxValue();
	    var item = {};
	    item.fname = ["First Name:", document.getElementById("fname").value];
	    item.lname = ["Last Name:", document.getElementById("lname").value];
	    item.bday = ["Birthday:", document.getElementById("bday").value];
	    item.topsize = ["Top Size:", document.getElementById("topsize").value];
	    item.bottomsize = ["Bottom Size:", document.getElementById("bottomsize").value];
	    item.shoesize = ["Shoe Size:", document.getElementById("shoesize").value];
	    item.ringsize = ["Ring Size:", document.getElementById("ringsize").value];
	    item.piercedEars = ["Pierced Ears:", piercedEarsValue];
		item.color = ["Color:", document.getElementById("color").value];
	    item.flowers = ["Flowers:", document.getElementById("flowers").value];
	    item.foods = ["Foods:", document.getElementById("foods").value];
	    item.restaurants = ["Restaurants:", document.getElementById("restaurants").value];
		item.giftRating = ["Rating:", document.getElementById("giftRating").value];
	    item.giftwanted = ["Gift Wanted:", document.getElementById("giftwanted").value];
	    item.price = ["Price:", document.getElementById("price").value];
	    item.wheretobuy = ["Where to Buy:", document.getElementById("wheretobuy").value];
	    //item.purchased = ["Purchased:", purchasedValue];
	    
	    // Save Data Into Local Storage
	    // Use Stringify to Convert the Item Object to a String
	    localStorage.setItem(id, JSON.stringify(item));
	    alert("Recipient Information is Saved!");
    };
	
	var getData = function () {
	
	if (localStorage.length === 0) {
		alert("There is no data in local storage to display.  Default JSON data was added.");
		autoFillData();
	}
	var makeDiv = document.getElementById("data");
	makeDiv.setAttribute("class", "items");
	var makeList = document.createElement("ul");
	makeList.setAttribute("class", "rows");
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	document.getElementById("items").style.display = "block";
	for (var i = 0, j = localStorage.length; i < j; i += 1) {
		var makeLi = document.createElement("li");
		var linksLi = document.createElement("li");
		makeList.appendChild(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		// Convert String Value from Local Storage Back to an Object
		var obj = JSON.parse(value);
		var makeSubList = document.createElement("ul");
		var makeIconList = document.createElement("ul");
		makeLi.appendChild(makeSubList);
		//getImage(obj.group[1], makeSubList);
		//getIcon(obj.sunSign[1], makeSubList);
		for (var n in obj) {
			var makeSubLi = document.createElement("li");
			makeSubList.appendChild(makeSubLi);
			var optSubText = obj[n][0] + " " + obj[n][1];
			makeSubLi.innerHTML = optSubText;
			makeSubList.appendChild(linksLi);
		}
		makeItemLinks(localStorage.key(i), linksLi); // Create Edit and Delete Buttons/Links for Each Record in Local Storage
	}
};
	
	// Get Image That is Associated with the Favorite Color List Option Being Displayed
    
    /*var getImage = function (colorName, makeSubList) {
		var imageLi = document.createElement("li");
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement("img");
		var setSrc = newImage.setAttribute("src", "img/" + colorName + ".png");
		imageLi.appendChild(newImage);
	};*/
	
	// Get Image That is Associated with the Zodiac Sign Being Displayed
	// SAVING CODE FOR FUTURE REFERENCE
	
	/*function getIcon(iconName, makeSubList) {
		var iconLi = document.createElement("li");
		makeSubList.appendChild(iconLi);
		var newIcon = document.createElement("img");
		var setSrc = newIcon.setAttribute("src", "img/" + iconName + ".png");
		iconLi.appendChild(newIcon);
	}*/
	
	// Make Item Links Function
    // Creates the Edit and Delete Buttons/Links for Each Record in Local Storage - When Displayed
    
    var makeItemLinks = function (key, linksLi) {
	
		// Add Edit Button/Link to Each Record in Local Storage
	
		var editLink = document.createElement("a");
		editLink.setAttribute("class", "alterRecords");
		editLink.setAttribute("id", "editRecipient");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Recipient";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
	
		// Add Line Break Between the Edit and Delete Links
		// SAVING CODE FOR FUTURE REFERENCE
	
		//var breakTag = document.createElement("br");
		//linksLi.appendChild(breakTag);
	
		// Add Delete Button/Link to Each Record in Local Storage
	
		var deleteLink = document.createElement("a");
		deleteLink.setAttribute("class", "alterRecords");
		deleteLink.setAttribute("id", "deleteRecipient");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Recipient";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
		
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);
    };
	
	// Edit Item Function
    
    var editItem = function () {
	
		// Grab the Data from Record in Local Storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
	
		// Populate the Form Fields with the Current Local Storage Values
	
		document.getElementById("fname").value = item.fname[1];
		document.getElementById("lname").value = item.lname[1];
		document.getElementById("bday").value = item.bday[1];
		document.getElementById("topsize").value = item.topsize[1];
		document.getElementById("bottomsize").value = item.bottomsize[1];
		document.getElementById("shoesize").value = item.shoesize[1];
		document.getElementById("ringsize").value = item.ringsize[1];
		if (item.piercedEars[1] === "Yes") {
			document.getElementById("piercedEars").setAttribute("checked", "checked");
		}
		document.getElementById("color").value = item.color[1];
		document.getElementById("flowers").value = item.flowers[1];
		document.getElementById("foods").value = item.foods[1];
		document.getElementById("restaurants").value = item.restaurants[1];
		document.getElementById("giftRating").value = item.giftRating[1];
		document.getElementById("giftwanted").value = item.giftwanted[1];
		document.getElementById("price").value = item.price[1];
		document.getElementById("wheretobuy").value = item.wheretobuy[1];
		var radios = document.forms[0].purchased;
		for (var i = 0; i < radios.length; i += 1) {
			if (radios[i].value === "Yes" && item.purchased[1] === "Yes") {
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value === "No" && item.purchased[1] === "No") {
				radios[i].setAttribute("checked", "checked");
			}
		}
	
		// Remove the Initial Listener From the Save Recipient Button
	
		saveRecipient.removeEventListener("click", storeData);
	
		// Change the Save Recipient Button Value to Edit Recipient
	
		document.getElementById("saveRecipient").value = "Edit Recipient";
		var editSubmit = document.getElementById("saveRecipient");
	
		// Save Key Value Established in This Function as a Property of the editButton Event So We Can Use That Value When We Save the Data We Edited
	
		editSubmit.addEventListener("click", storeData);
		editSubmit.key = this.key;
    };
	
	var	deleteItem = function () {
	var ask = confirm("Are You Sure You Want to DELETE This Recipient?");
	if (ask) {
		localStorage.removeItem(this.key);
		alert("Recipient Was Deleted!");
		window.location.reload();
	} else {
		alert("Recipient Was NOT Deleted.");
	}
};


		
		var autofillData = function () {
	
		for (var n in json) {
			var id = Math.floor(Math.random() * 1000000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	};
	
	});






