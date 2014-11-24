$(function(){
    var firebaseURL = new Firebase("https://fiery-torch-2959.firebaseio.com/");

    var nameField = $('.inputName');
    var inputField = $('.inputContent');
    var contentField = $('.contentArea ul');

    inputField.keypress(function(e){
        if(e.keyCode == 13){
            var userName;
            var content = inputField.val();
            
            if(nameField.val() === ""){
                userName = "Anonymous";
            }else{
                userName = nameField.val();
            }

            firebaseURL.push({name: userName, message: content});
            inputField.val('');
        }
    });

    firebaseURL.limit(10).on('child_added', function(content){
        var userName = content.val().name;
        var message = content.val().message;

        var nameElement = $('<span>').text(userName);
        var messageElement = $('<p>').text(message);

        contentField.append($('<li>').prepend(messageElement).prepend(nameElement));

        $('.contentArea').scrollTop(contentField[0].scrollHeight);
    });
});