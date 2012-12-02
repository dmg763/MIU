/* Denise M. Gilbert
MIU Term 1212
Projects 1 & 2
November 29, 2012
main.js Page*/

// Main Function That Ensures All DOM Content is Loaded and Ready

window.addEventListener("DOMContentLoaded", function () {

// Generic getElementById Function

    function ge(x) {
	    var theElement = document.getElementById(x);
	    return theElement;
    }

// Global Variables

    var selectColor = ["-- Select a Color --", "Black", "Blue", "Brown", "Green", "Orange", "Purple", "Red", "White", "Yellow"],
	    purchasedValue,
	    piercedEarsValue = "No",
	    errMsg = ge("errors"),
	    birthDay = ge("bday");

// Create Select Field Element and Populate with Options

    function createColorOptions() {
	    var formTag = document.getElementsByTagName("form"),
		    selectLi = ge("select"),
		    makeSelect = document.createElement("select");
		makeSelect.setAttribute("id", "groups");
	    for (var i = 0, j = selectColor.length; i < j; i += 1) {
		    var makeOption = document.createElement("option"),
		    optionText = selectColor[i];
		    makeOption.setAttribute("value", optionText);
		    makeOption.innerHTML = optionText;
		    makeSelect.appendChild(makeOption);
	    }
	    selectLi.appendChild(makeSelect);
    }
    
    createColorOptions();
    
    // Find Values of Selected Radio Buttons
    
    function getSelectedRadio() {
	    var radio = document.getElementById("form").purchased;
	    for (var i = 0; i < radio.length; i += 1) {
		    if (radio[i].checked) { 
			    purchasedValue = radio[i].value;
		    }
	    }
    }
    
    // Find Values of Selected Check Boxes
    
    function getCheckboxValue() {
	    if (ge("piercedEars").checked) {
		    piercedEarsValue = ge("piercedEars").value;
	    } else {
		    piercedEarsValue = "No";
	    }
    }
    
    // Toggle Control Function
    
    function toggleControls(n) {
	    switch (n) {
	    case "on":
		    ge("form").style.display = "none";
		    ge("clearData").style.display = "inline";
		    ge("displayData").style.display = "none";
		    ge("addRecipient").style.display = "inline";
		    ge("saveRecipient").style.display = "inline";
		    break;
	    case "off":
		    ge("form").style.display = "block";
		    ge("clearData").style.display = "inline";
		    ge("displayData").style.display = "none";
		    ge("saveRecipient").style.display = "inline";
		    ge("items").style.display = "none";
		    break;
	    default:
		    return false;
	    }
    }
    
    // Save Recipient to Local Storage Function
    
    function storeData(key) {
		var id,
			item;
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
	    getSelectedRadio();
	    getCheckboxValue();
	    item = {};
	    item.fname = ["<strong>First Name:</strong>", ge("fname").value];
	    item.lname = ["<strong>Last Name:</strong>", ge("lname").value];
	    item.bday = ["<strong>Birthday:</strong>", ge("bday").value];
	    item.sunSign = ["<strong>Zodiac Sign:</strong>", ge("sunSign").textContent];
	    item.topsize = ["<strong>Top Size:</strong>", ge("topsize").value];
	    item.bottomsize = ["<strong>Bottom Size:</strong>", ge("bottomsize").value];
	    item.shoesize = ["<strong>Shoe Size:</strong>", ge("shoesize").value];
	    item.ringsize = ["<strong>Ring Size:</strong>", ge("ringsize").value];
	    item.group = ["<strong>Favorite Color:</strong>", ge("groups").value];
	    item.flowers = ["<strong>Flowers:</strong>", ge("flowers").value];
	    item.foods = ["<strong>Foods:</strong>", ge("foods").value];
	    item.restaurants = ["<strong>Restaurants:</strong>", ge("restaurants").value];
	    item.purchased = ["<strong>Purchased:</strong>", purchasedValue];
	    item.piercedEars = ["<strong>Pierced Ears:</strong>", piercedEarsValue];
	    item.giftRating = ["<strong>Rating:</strong>", ge("giftRating").value];
	    item.giftwanted = ["<strong>Gift Wanted:</strong>", ge("giftwanted").value];
	    item.price = ["<strong>Price:</strong>", ge("price").value];
	    item.wheretobuy = ["<strong>Where to Buy:</strong>", ge("wheretobuy").value];
	    // Save Data Into Local Storage
	    // Use Stringify to Convert the Item Object to a String
	    localStorage.setItem(id, JSON.stringify(item));
	    alert("Recipient Information is Saved!");
    }
    
    // Display Local Storage Data Function
    // Write Data from Local Storage to the Browser
    
    function getData() {
	    toggleControls("on");
	    if (localStorage.length === 0) {
		    alert("There is no data in local storage to display.  Default JSON data was added.");
		    autoFillData();
	    }
	    var makeDiv = document.createElement("div");
	    makeDiv.setAttribute("id", "items");
	    var makeList = document.createElement("ul");
	    makeList.setAttribute("id", "rows");
	    makeDiv.appendChild(makeList);
	    document.body.appendChild(makeDiv);
	    ge("items").style.display = "block";
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
		    getImage(obj.group[1], makeSubList);
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
    }
    
    // Get Image That is Associated with the Favorite Color List Option Being Displayed
    
    function getImage(colorName, makeSubList) {
		var imageLi = document.createElement("li");
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement("img");
		var setSrc = newImage.setAttribute("src", "img/" + colorName + ".png");
		imageLi.appendChild(newImage);
	}
	
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
    
    function makeItemLinks(key, linksLi) {
	
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
    }
    
    // Edit Item Function
    
    function editItem() {
	
		// Grab the Data from Record in Local Storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
	
		// Shows the Form Again to Edit the Record
	
		toggleControls("off");
	
		// Populate the Form Fields with the Current Local Storage Values
	
		ge("fname").value = item.fname[1];
		ge("lname").value = item.lname[1];
		ge("bday").value = item.bday[1];
		ge("sunSign").textContent = item.sunSign[1];
		ge("topsize").value = item.topsize[1];
		ge("bottomsize").value = item.bottomsize[1];
		ge("shoesize").value = item.shoesize[1];
		ge("ringsize").value = item.ringsize[1];
		ge("groups").value = item.group[1];
		ge("flowers").value = item.flowers[1];
		ge("foods").value = item.foods[1];
		ge("restaurants").value = item.restaurants[1];
	
		var radios = document.forms[0].purchased;
		for (var i = 0; i < radios.length; i += 1) {
			if (radios[i].value === "Yes" && item.purchased[1] === "Yes") {
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value === "No" && item.purchased[1] === "No") {
				radios[i].setAttribute("checked", "checked");
			}
		}
		if (item.piercedEars[1] === "Yes") {
			ge("piercedEars").setAttribute("checked", "checked");
		}
		
		ge("giftRating").value = item.giftRating[1];
		ge("sliderValue").value = item.giftRating[1];
		ge("giftwanted").value = item.giftwanted[1];
		ge("price").value = item.price[1];
		ge("wheretobuy").value = item.wheretobuy[1];
	
		// Remove the Initial Listener From the Save Recipient Button
	
		saveRecipient.removeEventListener("click", storeData);
	
		// Change the Save Recipient Button Value to Edit Recipient
	
		ge("saveRecipient").value = "Edit Recipient";
		var editSubmit = ge("saveRecipient");
	
		// Save Key Value Established in This Function as a Property of the editButton Event So We Can Use That Value When We Save the Data We Edited
	
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
    }
    
    // Delete Item Function
    
    function deleteItem() {
		var ask = confirm("Are You Sure You Want to DELETE This Recipient?");
		if (ask) {
			localStorage.removeItem(this.key);
			alert("Recipient Was Deleted!");
			window.location.reload();
		} else {
			alert("Recipient Was NOT Deleted.");
		}
    }
    
    // Function to Clear Local Storage Data
    
    function clearLocal() {
	    if (localStorage.length === 0) {
		    alert("There is no data in local storage to delete.");
	    } else {
		    localStorage.clear();
		    alert("All local storage data has been deleted.");
		    window.location.reload();
		    return false;
	    }
    }
    
    // Validate Function
    
    function validate(e) {
	
		// Define the Elements That Need to Be Validated
	
		var getFname = ge("fname");
		var getLname = ge("lname");
	
		// Reset Error Messages
	
		errMsg.innerHTML = "";
		getFname.style.border = "1px solid black";
		getLname.style.border = "1px solid black";
	
		// Get All Error Messages and Store in an Array
		
		var messagesArray = [];
	
		// First Name Validation
	
		if (getFname.value === "") {
			var fNameError = "Please Enter a First Name";
			getFname.style.border = "2px solid red";
			messagesArray.push(fNameError);
		}
	
		// Last Name Validation
		
		if (getLname.value === "") {
			var lNameError = "Please Enter a Last Name";
			getLname.style.border = "2px solid red";
			messagesArray.push(lNameError);
		}
	
		// If Any Errors, Display Them on the Screen
		
		if (messagesArray.length >= 1) {
			for (var i = 0, j = messagesArray.length; i < j; i += 1) {
				var txt = document.createElement("li");
				txt.innerHTML = messagesArray[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		} else {
			// If There Are NO Errors, Save the Record
			// Send the Key Value (That Came From the editData Function)
			// This Key Value Was Passed Through the editSubmit Event Listener as a Property
			storeData(this.key);
		}
    }
    
    // Zodiac Sign Function
    
    function zodiacSign() {
		var birthDate = birthDay.value,
			sunSign = new Date(birthDate),
			month = sunSign.getMonth() + 1,
			day = sunSign.getDate() + 1;
    //console.log("Birth month is : " + month + ", Birth date is: " + day);

		if (((month === 12) && (day >= 22)) || ((month === 1) && (day <= 19))) {
			document.getElementById("sunSign").innerHTML = "Capricorn";
		}
		if (((month === 1) && (day >= 20)) || ((month === 2) && (day <= 17))) {
			document.getElementById("sunSign").innerHTML = "Aquarius";
		}
		if (((month === 2) && (day >= 18)) || ((month === 3) && (day <= 19))) {
			document.getElementById("sunSign").innerHTML = "Pisces";
		}
		if (((month === 3) && (day >= 20)) || ((month === 4) && (day <= 19))) {
			document.getElementById("sunSign").innerHTML = "Aries";
		}
		if (((month === 4) && (day >= 20)) || ((month === 5) && (day <= 19))) {
			document.getElementById("sunSign").innerHTML = "Taurus";
		}
		if (((month === 5) && (day >= 20)) || ((month === 6) && (day <= 20))) {
			document.getElementById("sunSign").innerHTML = "Gemini";
		}
		if (((month === 6) && (day >= 21)) || ((month === 7) && (day <= 21))) {
			document.getElementById("sunSign").innerHTML = "Cancer";
		}
		if (((month === 7) && (day >= 22)) || ((month === 8) && (day <= 22))) {
			document.getElementById("sunSign").innerHTML = "Leo";
		}
		if (((month === 8) && (day >= 23)) || ((month === 9) && (day <= 21))) {
			document.getElementById("sunSign").innerHTML = "Virgo";
		}
		if (((month === 9) && (day >= 22)) || ((month === 10) && (day <= 22))) {
			document.getElementById("sunSign").innerHTML = "Libra";
		}
		if (((month === 10) && (day >= 23)) || ((month === 11) && (day <= 21))) {
			document.getElementById("sunSign").innerHTML = "Scorpio";
		}
		if (((month === 11) && (day >= 22)) || ((month === 12) && (day <= 21))) {
			document.getElementById("sunSign").innerHTML = "Sagittarius";
		}
	}

	birthDay.onblur = (zodiacSign);
	
	// Function to Display the Slider Value

	function displaySliderValue() {
		sliderValue.innerHTML = giftRating.value;
	}
					    
	var giftRating = document.getElementById("giftRating"),
	sliderValue = document.getElementById("sliderValue");
	displaySliderValue();
	
	giftRating.onchange = (displaySliderValue);
	
	// Auto Populate Local Storage with JSON Data
	// Stores the JSON Object into Local Storage
	
	function autoFillData() {
		for (var n in json) {
			var id = Math.floor(Math.random() * 1000000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	    
// Set Links and Submit Click Events

    var displayDataLink = ge("displayData");
    displayDataLink.addEventListener("click", getData);
    var clearData = ge("clearData");
    clearData.addEventListener("click", clearLocal);
    var saveRecipient = ge("saveRecipient");
    saveRecipient.addEventListener("click", validate);
    
});