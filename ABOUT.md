<h3> <b> Why i picked node</b></h3>
Besides being familiar with the node enviornment, my first thought process was 
investigating the available node modules that support MQTT and i found few of them so i decided to kickstart the web app with node express.js and follow from there
<br>

<h3> <b> What i wanted to accomplish </b></h3>
Design a mimic that will cover most of the functionalities of the given website while making it simple and straight forward.


<h3> <b> My Thought process</b></h3>
The first thing that i did was learning more about MQTT and exploring several online libraries that supports it in node.<br>
I settled on using node  <b> MQTT.js  (https://www.npmjs.com/package/mqtt)</b>
<br>
Since such module doesn't provide any method with (req,res) callbacks that i can use to render views to the browser i decided on using global variables that will store all the needed info i will be using in my views and constantly update my views with the new data but then i figured it would be much simpler if i bundle the module in my template by <b>webpack</b> or <b>browserify</b> and use javascript to implement the client logic.<br>
after coming to the conclusion that i will be just using plain javascript to implement the web app, i thought i should explore some MQTT javascript libraries and i stumbled upon <b>Eclipse Paho Js Client (https://www.eclipse.org/paho/clients/js/)</b><br>
After quickly going through the docs i decided i'm going to go through with this library and i did.
<br>

<h3> <b> Problems i encountered</b></h3>
Upon finishing my implementation i tested the MQTT client on<b> Cloudmqtt : https://www.cloudmqtt.com/ </b>
and i couldn't connect since the websockets connection required SSL on the Cloudmqtt side. Luckily Paho MQTT Library had an option to enable SSL during connection so implementing the SSL option was just a breath after that.
<br>

<h3> <b> What i learned</b></h3>
Learned more about the MQTT protocol as well as websockets

<h3> <b>Experience with node</b></h3>
Fairly experienced with node and express

<h3> <b> Travis-Ci?</b></h3>
Project successfully builds on Travis-Ci, no tests have been added but it should work just fine