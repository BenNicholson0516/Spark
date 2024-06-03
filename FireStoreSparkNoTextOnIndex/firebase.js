// Your web app's Firebase configuration

 /*var firebaseConfig = {
    apiKey: "AIzaSyDL5Gt79b2TijgHZP8bgXssoWynS8AGcds",
    authDomain: "spark-70fd8.firebaseapp.com",
    projectId: "spark-70fd8",
    storageBucket: "spark-70fd8.appspot.com",
    messagingSenderId: "1032291077321",
    appId: "1:1032291077321:web:a18d6358d58e0e35b91118"
  }; */
 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  //import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
  import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
  import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDL5Gt79b2TijgHZP8bgXssoWynS8AGcds",
    authDomain: "spark-70fd8.firebaseapp.com",
    projectId: "spark-70fd8",
    storageBucket: "spark-70fd8.appspot.com",
    messagingSenderId: "1032291077321",
    appId: "1:1032291077321:web:a18d6358d58e0e35b91118"
  };

  // Initialize Firebase
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Add event listener to the register button
const register = document.getElementById('register');
register.addEventListener("click", function(event) {
    event.preventDefault();

    // Get the values from the input fields
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Validate email and password
    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or Password is incorrect, passwords must be 6 or more characters');
        return;
    }

    


    // Create a new user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;

            // Update the user's profile with the display name
            updateProfile(user, {
                displayName: username
            }).then(() => {
                // Function to write user data to Firestore
                function writeUserData(userId, username, email) {
                    // Reference to the user's document in Firestore
                    const userRef = doc(db, 'users', userId);

                    // Set the user data in Firestore
                    setDoc(userRef, {
                        username: username,
                        email: email,
                        last_login: Date.now()
                    }).then(() => {
                        console.log('User data written successfully');
                    }).catch((error) => {
                        console.error('Error writing user data: ', error);
                    });
                }

                // Write the new user's data to Firestore
                writeUserData(user.uid, username, email);
                alert('User Created');
            }).catch((error) => {
                console.error('Error updating profile: ', error);
            });
        })
        .catch((error) => {
            console.error('Error creating user: ', error);
        });
    alert('Creating Account');
    //window.location.href = "http://127.0.0.1:5500/firestoreSpark/Profile.html"
});



const login = document.getElementById('login');
login.addEventListener("click", function(event) {
    event.preventDefault();

    var auth = getAuth();

    // Sign out any existing user
      signOut(auth)
        .then(() => {
            console.log('Signed Out');
            //console.log(email);
        })
        .catch((error) => {
            console.error('Sign Out Error', error);
        });

    // Get the values from the input fields
    var email = document.getElementById('loginemail').value;
    var password = document.getElementById('loginpassword').value;
    //const user = userCredential.user;

    if (!validate_email(email)) {
        alert('Email incorrect');
        console.log(email);
        return;
    }
    if (!validate_password(password)) {
        alert('Password incorrect');
        return;
    }
    
    // Create a new user with email and password
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
            const user = userCredential.user;
            alert("Logged in");
            // Update the user's profile with the display name
            

              
        })
        .catch((error) => {
            console.error('Error creating user: ', error);
        });
});
// Email validation function
function validate_email(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password validation function
function validate_password(password) {
    // Password must be at least 6 characters long (you can adjust this rule)
    return password.length >= 6;
}

    /*    if (!validate_email(email) || !validate_password(password)) {
            alert('Email or Password is incorrect');
            return;
        }
*/