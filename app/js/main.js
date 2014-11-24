$(function(){
    var firebaseURL = new Firebase("https://fiery-torch-2959.firebaseio.com/");

    var nameField = $('.inputName');
    var inputField = $('.inputContent');
    var contentField = $('.contentArea ul');

    inputField.keypress(function(e){
        if(e.keyCode == 13){
            var userName = nameField.val();
            var content = inputField.val();

            firebaseURL.push({name: userName, message: content});
            inputField.val('');
        }
    });

    firebaseURL.limit(50).on('child_added', function(content){
        var userName = content.val().name;
        var message = content.val().message;

        var nameElement = $('<span>').text(userName);
        var messageElement = $('<p>').text(message);

        contentField.append($('<li>').prepend(messageElement).prepend(nameElement));

        $('.contentArea').scrollTop(contentField[0].scrollHeight);
    });
});