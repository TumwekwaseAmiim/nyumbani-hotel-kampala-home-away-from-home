// ==========================================
// NYUMBANI VIRTUAL RECEPTIONIST
// Smart Hotel Assistant v4.0
// ==========================================


let knowledge = {};



// ==========================================
// LOAD KNOWLEDGE
// ==========================================


fetch("knowledge.json")

.then(response => response.json())

.then(data => {

    knowledge = data;

    console.log(
        "Nyumbani Knowledge Loaded"
    );

})

.catch(error => {

    console.error(
        "Knowledge loading failed:",
        error
    );

});





// ==========================================
// CREATE CHAT WINDOW
// ==========================================


const chatWindow = document.createElement("div");

chatWindow.className="chat-window";


chatWindow.innerHTML = `


<div class="chat-header">


<div>

🏨 Nyumbani Hotel

<br>

<small>
Virtual Receptionist
</small>


</div>


<span id="closeChat">
×
</span>


</div>





<div class="chat-body" id="chatBody">


<div class="bot-message">

Welcome to Nyumbani Hotel Kampala 🌿

<br><br>

I am your Virtual Receptionist.

<br><br>

How may I assist you today?


<br><br>


<button class="quick-btn" onclick="quickAsk('rooms')">
🏨 Rooms
</button>


<button class="quick-btn" onclick="quickAsk('restaurant')">
🍽 Restaurant
</button>


<button class="quick-btn" onclick="quickAsk('events')">
🎉 Events
</button>


<button class="quick-btn" onclick="quickAsk('contact')">
☎ Contact
</button>


</div>


</div>





<div class="chat-input">


<input 
id="userInput"
placeholder="Ask about rooms, food, events..."
>


<button id="sendBtn">
Send
</button>


</div>


`;


document.body.appendChild(chatWindow);





// ==========================================
// OPEN CHAT
// ==========================================


function openChat(){

chatWindow.style.display="flex";

}





// Floating button

let aiButton =
document.querySelector(".ai-button");


if(aiButton){

aiButton.onclick=openChat;

}




// Close

document
.getElementById("closeChat")
.onclick=()=>{

chatWindow.style.display="none";

};







// ==========================================
// SEND MESSAGE
// ==========================================


document
.getElementById("sendBtn")
.onclick=sendMessage;



document
.getElementById("userInput")
.addEventListener(
"keypress",
(e)=>{

if(e.key==="Enter")
sendMessage();

});





function sendMessage(){


let input =
document.getElementById("userInput");


let question =
input.value.trim();


if(!question)
return;



addMessage(
question,
"user"
);



input.value="";


showTyping();



setTimeout(()=>{


removeTyping();


addMessage(

generateAnswer(
question.toLowerCase()
),

"bot"

);


},700);



}







// ==========================================
// QUICK QUESTIONS
// ==========================================


function quickAsk(type){


let q={


rooms:
"Tell me about rooms",


restaurant:
"Tell me about restaurant",


events:
"Tell me about events",


contact:
"How can I contact you?"

};



document.getElementById("userInput").value=q[type];


sendMessage();


}








// ==========================================
// MESSAGE DISPLAY
// ==========================================


function addMessage(message,type){


let body =
document.getElementById("chatBody");


let div =
document.createElement("div");


div.className=
type+"-message";


div.innerHTML=message;


body.appendChild(div);


body.scrollTop=
body.scrollHeight;


}





function showTyping(){


let body =
document.getElementById("chatBody");


let div =
document.createElement("div");


div.id="typing";


div.className="bot-message";


div.innerHTML=
"Nyumbani is typing...";


body.appendChild(div);


}





function removeTyping(){


let typing =
document.getElementById("typing");


if(typing)
typing.remove();


}









// ==========================================
// AI RESPONSE ENGINE
// ==========================================


function generateAnswer(question){





// GREETING


if(
contains(question,
[
"hello",
"hi",
"hey",
"morning",
"evening"
])
){


return `

${knowledge.assistant.greeting}

<br><br>

I can assist you with:

<br>

🏨 Rooms

<br>

🍽 Restaurant

<br>

🎉 Events

<br>

📍 Location

<br>

☎ Reservations

`;

}







// ROOMS


if(
contains(question,
[
"room",
"stay",
"sleep",
"accommodation",
"price",
"cost",
"night"
])
){


let rooms =
knowledge.rooms.room_types;


return `


🏨 <strong>Nyumbani Hotel Rooms</strong>


<br><br>


<strong>${rooms[0].name}</strong>

<br>
${rooms[0].price}


<br><br>


<strong>${rooms[1].name}</strong>

<br>
${rooms[1].price}


<br><br>


<strong>${rooms[2].name}</strong>

<br>
${rooms[2].price}


<br><br>


All rooms include comfortable facilities,
Wi-Fi and guest services.


`;

}








// SPECIFIC EXECUTIVE


if(
contains(question,
[
"executive",
"luxury",
"premium"
])
){


let room =
knowledge.rooms.room_types[2];


return `


⭐ <strong>${room.name}</strong>


<br><br>


Price:
${room.price}


<br><br>


Facilities:

<br>

${room.facilities.join("<br>")}


`;

}








// RESTAURANT


if(
contains(question,
[
"food",
"restaurant",
"meal",
"breakfast",
"lunch",
"dinner",
"bar"
])
){


return `


🍽 <strong>Nyumbani Restaurant</strong>


<br><br>


${knowledge.restaurant.description}


<br><br>


Opening Hours:

<br>

Restaurant:
${knowledge.restaurant.hours.restaurant}


<br>

Bar:
${knowledge.restaurant.hours.bar}


`;

}







// EVENTS


if(
contains(question,
[
"event",
"wedding",
"party",
"meeting",
"conference",
"celebration"
])
){


return `


🎉 <strong>Nyumbani Events</strong>


<br><br>


${knowledge.events.description}


<br><br>


Capacity:

<br>

${knowledge.events.capacity}


`;

}








// LOCATION


if(
contains(question,
[
"where",
"location",
"address",
"direction",
"located"
])
){


return `


📍 <strong>${knowledge.hotel.name}</strong>


<br><br>


${knowledge.hotel.address}


<br><br>


Nearby:

<br>

${knowledge.hotel.nearby_places.join("<br>")}


<br><br>


<a href="${knowledge.contact.google_maps}" target="_blank">

Open Google Maps

</a>


`;

}








// CONTACT


if(
contains(question,
[
"contact",
"phone",
"call",
"email",
"booking"
])
){


return `


☎ <strong>Contact Nyumbani Hotel</strong>


<br><br>


Phone:

<br>

<a href="tel:+256703016174">

0703 016 174

</a>


<br>

0783 660 537


<br><br>


Email:

<br>

${knowledge.contact.email.join("<br>")}


<br><br>


Website:

<br>

<a href="${knowledge.contact.website}" target="_blank">

Visit Official Website

</a>


`;

}








// FACILITIES


if(
contains(question,
[
"wifi",
"facility",
"gym",
"spa",
"conference"
])
){


return `


✨ <strong>Hotel Facilities</strong>


<br><br>


${knowledge.facilities.available.join("<br>")}


`;

}









// DEFAULT


return `


Thank you for contacting Nyumbani Hotel Kampala 🌿


<br><br>


I can help you with:

<br>

🏨 Rooms

<br>

🍽 Restaurant

<br>

🎉 Events

<br>

📍 Location

<br>

☎ Reservations


<br><br>


For more assistance contact reception.


`;

}







// ==========================================
// KEYWORD CHECK
// ==========================================


function contains(text,words){


return words.some(

word => text.includes(word)

);


}