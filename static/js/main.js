
//Delete Request 
$(document).ready(() => {

    $.notify("load" ,"success");

let client;
let connected = false;
let userTopics = new Set();


$("#connectBtn").click( () =>{

    if(!connected)
    {
        let ip = $("#connectIp").val();
        let port = $("#connectPort").val();
        let client_id =  "id" + parseInt(Math.random() * 100, 10);
        let username = $("#connectUsername").val();
        let password = $("#connectPassword").val();

        client = new  Paho.MQTT.Client(ip, parseInt(port), client_id );
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
   
        if ($('#connectSSL').is(':checked'))
            client.connect({
                onSuccess:onConnect,
                onFailure:onDisconnect,
                userName : username,
                password : password,
                useSSL: true    
            });
        else 
            client.connect({
                onSuccess:onConnect,
                onFailure:onDisconnect,
                userName : username,
                password : password, 
                useSSL: false   
            });
    }
    else 
    {
        $.notify("Disconnected" ,"success");
        location.reload();
    }
    });
   

    function onConnect() {
        connected = true;
        $.notify("Connection Successful","success");
        $("#connectBtn").html('Disconnect');
        $("#connectBtn").attr('class','btn btn-danger');
        $("#connectStatus").html('connected');
        $("#connectStatus").css('color','green');
      }

    function onDisconnect() {
        connected = false;
        $.notify("Connection Failed","error");
        $("#connectBtn").html('Connect');
        $("#connectStatus").html("disconnected");
        $("#connectStatus").css('color','red');
      }

      function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          onDisconnect();
        }
      }




      //Subscribing
      $("#subscribeBtn").click( () =>{
          if(connected)
          {
            let topic = $("#subscribeTopic").val();
            client.subscribe(topic);
            userTopics.add(topic);
            $.notify("Subscribed" ,"success");
            $('#userTopics').html('');
            
            for (let item of userTopics) 
            {
                $('#userTopics').append(
                    '<h5 class="userTopics" ><b>' +item +'</b></span><br>'
                );
            }
          }
          
          else {
              $.notify("Connect first before subscribing to a topic","success");
          }
          $("#subscribeTopic").val('');
    });
   
        $("#unsubscribeBtn").click( () =>{
            if(connected)
            {
                let topic = $("#unsubscribeTopic").val();
                if (userTopics.has(topic))
                {
                    client.unsubscribe(topic);
                    $.notify("Unsubscribed","success");
                    userTopics.delete(topic);
                    $('#userTopics').html('');
                    for (let item of userTopics) 
                    {
                        $('#userTopics').append(
                            '<h5 class="userTopics" ><b>' +item +'</b></span><br>'
                        );
                    }
                }
                else $.notify("You are not subscribed to this topic","error");
            }
            
            
            else {
                $.notify("Connect first before unsubscribing from a topic","error");
            }
            $("#unsubscribeTopic").val('');
    });
    
//Publishing
$("#publishBtn").click( ()=>{

 
    if(connected)
    {
        let msgTopic = $("#publishTopic").val();
        let QOS = $("#publishQos").val();
        let msg = $("#publishMessage").val();
        if ( msgTopic == '' || msg == '')
            $.notify("Message must have a topic and a body","error");
        else {
            let message = new Paho.MQTT.Message(msg);
            message.destinationName = msgTopic;
            message.qos = parseInt(QOS);
            client.send(message);
            $.notify("Message Sent","success");
        }
    }
    else{
        $.notify("connect first before publishing a message","error");
    }

    $("#publishTopic").val('');
    $("#publishMessage").val('');
});



//Message Arrival
      function onMessageArrived(message) {
        $('#messagesDiv').append(
            '<span class="msgTopic" ><b>' + message.destinationName +'</b></span><br>' +'<span class="msgBody" >'+ message.payloadString + '</span><br>');
      }







      
});