let access_token;
function consolelogger() {
    apicall()
        .then(data => access_token = data.access_token)
        .then(() => console.log(access_token))
        
           

}





async function apicall() {

    try {

        // data es mi objeti a devolver//
        const data = await fetch('https://login-practice-125p.onrender.com/auth/login', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: 'tester2@test.com',
                password: 'pass1234'

            })
        });
        return data.json()
    } catch (error) {
        return error
    }




} 






async function apiverify() {

    try {
        console.log('token utilizado',access_token)
        const data = await fetch('https://login-practice-125p.onrender.com/auth/verify-user', {
            method:'GET',
            headers:  ({
                
                'Authorization': `Bearer ${access_token}`
            })
        });
        console.log(data, 'ok');
        return data.json;
        
        

    } catch (error) {
        return error;
    }
}


async function apimessage(){


    try {

        const data = await fetch('https://login-practice-125p.onrender.com/api/secret-message', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }

        });
       console.log('ok')
        return data;
        
    } catch (error) {
        return error;
    }

    
}





consolelogger();






