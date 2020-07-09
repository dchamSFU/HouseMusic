async function addAdmin() {
    var statusBar = document.getElementById("status");
    var userName = document.getElementById("userName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var data = {userName, email, password};
    if(!checkPassReqs(password)) {
        return;
        // Change HTML to reflect that password does not meet reqs
	}
    if(!checkUserReqs(userName, email)) {
        return;
        // Change HTML to reflect that username does not meet reqs
	}
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    await fetch('/addAdmin', options).then(function(res) {
        var stat = res.status;
        if(stat==201) {
            statusBar.innerHtml = "Username taken.";
        }
        else if(stat==202) {
            statusBar.innerHTML = "Email taken.";
        }
        else {
            statusBar.innerHTML = "Admin added successfully.";
        }
    });
}

async function changePw() {
    var userName = document.getElementById("userNamepw").value;
    var password = document.getElementById("passwordpw").value;
    var data = {userName, password};

    if(!checkPassReqs(password)) {
        return;
    }
    
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await fetch('/changePassword', options).then(function(res) {
        if (res.status == 201) {
            document.getElementById("UpdateError").style.display="block"
            document.getElementById("UpdateSuccess").style.display="none"
        }
        else if (res.status == 202) {
            document.getElementById("UpdateError").style.display="block"
            document.getElementById("UpdateSuccess").style.display="none"
        }
        else {
            document.getElementById("UpdateError").style.display="none"
            document.getElementById("UpdateSuccess").style.display="block"
        }
    });
}

async function removeUser() {
    var userName = document.getElementById("userNamerem").value;
    var data = {userName};
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    await fetch('/removeUser', options).then(function(res) {
        if (res.status == 201) {
            document.getElementById("RemoveError").style.display="block"
            document.getElementById("RemoveSuccess").style.display="none"
        }
        else {
            document.getElementById("RemoveError").style.display="none"
            document.getElementById("RemoveSuccess").style.display="block"
        }
    });
}

async function findUsers() {
    var userName = document.getElementById("userNameSearch").value;
    var data = {userName};
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var res = await fetch('/findUsers', options);  //.then(function(res){        
        // if (res.status == 201) {
        //     document.getElementById("SearchError").style.display="block"
        // }
        var data = await res.json();

        // if (data.fetch() == null) {
        //     document.getElementById("SearchError").style.display="block"
        // }
        var tableFrame = document.getElementById("table");
        tableFrame.innerHTML = '';
        var table = document.createElement('table');
        tableFrame.append(table);
        var head = document.createElement('thead');
        table.append(head);
        var nameCol = document.createElement('th');
        nameCol.innerHTML = 'Username';
        var pwCol = document.createElement('th');
        pwCol.innerHTML = 'Password';
        var emailCol = document.createElement('th');
        emailCol.innerHTML = 'Email';
        var typeCol = document.createElement('th');
        typeCol.innerHTML = 'Type';
        head.append(nameCol, pwCol, emailCol, typeCol);
        for(p of data) {
            var row = document.createElement('tr');
            table.append(row);
            var nameCell = document.createElement('td');
            nameCell.innerHTML = p.userName;
            var pwCell = document.createElement('td');
            pwCell.innerHTML = p.password;
            var emailCell = document.createElement('td');
            emailCell.innerHTML = p.email;
            var typeCell = document.createElement('td');
            typeCell.innerHTML = p.userType;
            row.append(nameCell, pwCell, emailCell, typeCell);
        }
        
    }

function checkPassReqs(password) {
    var statusBar = document.getElementById("status");
    var verifyPassword = /^[0-9a-zA-Z!@#$%^&*()]+$/;
    if(password.length < 6 || password.length > 25) {
        statusBar.innerHTML = "Password must be between 6 and 25 characters.";
        return false;
    }
    if(!verifyPassword.test(password)) {
        statusBar.innerHTML = "Password must contain only letters, numbers, and common symbols (!@#$%^&*).";
        return false;
    }
    return true;
}

function checkUserReqs(userName, Email) {
    var statusBar = document.getElementById("status");
    var alphanumeric = /^[0-9a-zA-Z]+$/;
    var verifyEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(userName.length < 4 || userName.length > 16) {
        statusBar.innerHTML = "Username must be between 4 and 16 characters.";
        return false;
    }
    if(!alphanumeric.test(userName)) {
        statusBar.innerHTML = "Username must contain only letters and numbers.";
        return false;
    }
    if(!verifyEmail.test(Email)) {
        statusBar.innerHTML = "Invalid email address.";
        return false;
    }
    return true;
}