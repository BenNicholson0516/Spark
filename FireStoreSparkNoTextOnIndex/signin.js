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
 import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
 import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
 import { child, push, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
 import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
 import { getStorage, uploadBytes, ref as Sref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyDL5Gt79b2TijgHZP8bgXssoWynS8AGcds",
   authDomain: "spark-70fd8.firebaseapp.com",
   projectId: "spark-70fd8",
   storageBucket: "spark-70fd8.appspot.com",
   messagingSenderId: "1032291077321",
   appId: "1:1032291077321:web:a18d6358d58e0e35b91118",
   storageBucket: "gs://spark-70fd8.appspot.com"
 };

 // Initialize Firebase
 
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app); // Initialize Firestore
 const storage = getStorage();
 //const storageRef = Sref(storage, 'some-child');
 //const storage = getStorage(firebaseApp, "gs://spark-70fd8.appspot.com");

 const loadProfilePicture = async (uid) => {
    const storageRef = Sref(storage, uid); // Create reference to file with user UID
    try {
        const downloadURL = await getDownloadURL(storageRef);
        console.log('Download URL:', downloadURL);
        profilePic.src = downloadURL;
    } catch (error) {
        console.error("Error fetching profile picture:", error);
        if (error.code === 'storage/object-not-found') {
            console.log("No profile picture found for the given UID.");
        } else {
            console.log("An error occurred while fetching the profile picture.");
        }
    }
};

 let SorM = '';
 document.getElementById('Mentor').addEventListener('click', function() {
    SorM = "Mentor";
    document.getElementById('mentorEmploymentBox').classList.add('revealed');
  });
  
  document.getElementById('Student').addEventListener('click', function() {
    SorM = "Student";
    document.getElementById('mentorEmploymentBox').classList.remove('revealed');
  });
 
  let profilePic = document.getElementById('profile-pic');
let inputFile = document.getElementById('input-file');

inputFile.onchange = function() {
    profilePic.src = URL.createObjectURL(inputFile.files[0])
    console.log(profilePic);
}

 // Add event listener to the SaveProfChanges button
 const SaveProfChanges = document.getElementById('SaveProfChanges');
 SaveProfChanges.addEventListener("click", function(event) {
     event.preventDefault();
    
    
     // Get the values from the input fields
     const UsersName = document.getElementById('UsersName').value;
     const UserAge = document.getElementById('UserAge').value;
     const UserCar = document.getElementById('UserCareer').value;
     const UserPastEducation = document.getElementById('UserPastEducation').value;
     const UserCurrEmployment = document.getElementById('mentorEmployment').value;
     const UserContactInfo = document.getElementById('UserContactInfo').value;
     //const UserProfilePicture = 
     

   //let file = inputFile.files[0];
    // let storageRef = storage.ref('ProfileImages/' + file.name);
    // let uploadTask = storageRef.put(file);

   
   
 
     
 
     // Get the current authenticated user
     const user = auth.currentUser;
 
     // Check if the user is authenticated
     if (user) {
         const uid = user.uid;
         const email = user.email;
         const username = user.displayName;
 
         // Write new profile data to Firestore ---------------------------------------------------------------------
         writeNewProfileData(uid, username, email, UsersName, UserAge, UserCar, UserPastEducation, SorM, UserCurrEmployment, UserContactInfo);
         //writeUserProfileData(UsersName);
     } else {
         console.log("No user is signed in.");
     }
     document.getElementById('PUsersName').value = user.UsersName;
 });
 
 // Function to write new profile data to Firestore
 function writeNewProfileData(uid, username, email, UsersName, UserAge, UserCar, UserPastEducation, SorM, UserCurrEmployment, UserContactInfo) {
     // Reference to the user's document in Firestore ------------------------------------------------------------------
     const userRef = doc(db, 'users', uid);
    
     // Create the profile data
     const profileData = {
         username: username,
         email: email,
         last_login: Date.now(),
         UsersName: UsersName,
         UserAge: UserAge,
         UserCareer : UserCar,
         UserPastEducation : UserPastEducation,
         StudentOrMentor : SorM,
         UserCurrentEmployment : UserCurrEmployment,
         UserContactInfo: UserContactInfo,
         UID : uid
        // UserProfilePic: profilePic

         

     };
     
     let file = inputFile.files[0];
     const storageRef1 = Sref(storage, uid);
     uploadBytes(storageRef1, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });


 
     // Set the profile data in Firestore
     setDoc(userRef, profileData)
         .then(() => {
             console.log('Profile data written successfully');
         })
         .catch((error) => { 
             console.error('Error writing profile data: ', error);
         });
         alert("Changes Saved");
 }

 document.addEventListener("DOMContentLoaded", function() {
    // Get the element for the "Current Employment" label and textbox
    const employmentBox = document.getElementById("mentorEmploymentBox");

    // Hide the element by setting its display property to "none"
    employmentBox.style.display = "none";
});

 document.getElementById('Mentor').addEventListener('click', function() {
    var mentorEmploymentBox = document.getElementById('mentorEmploymentBox');
    if (mentorEmploymentBox.style.display === 'none') {
        mentorEmploymentBox.style.display = 'block';
    } else {
        mentorEmploymentBox.style.display = 'none';
    }
});

document.getElementById('Student').addEventListener('click', function() {
    document.getElementById('mentorEmploymentBox').style.display = 'none';
    const SorM = 'Student'
});
const inputBoxes = document.querySelectorAll('.input-box input');

// Add event listeners to each input box
inputBoxes.forEach(inputBox => {
    inputBox.addEventListener('focus', () => {
        inputBox.parentNode.classList.add('focus');
    });

    inputBox.addEventListener('blur', () => {
        if (!inputBox.value.trim()) {
            inputBox.parentNode.classList.remove('focus');
        }
    });

    inputBox.addEventListener('input', () => {
        inputBox.parentNode.classList.toggle('has-content', inputBox.value.trim() !== '');
    });
});

const mentorButton = document.getElementById('Mentor');
const mentorEmploymentBox = document.getElementById('mentorEmploymentBox');

mentorButton.addEventListener('click', () => {
    mentorEmploymentBox.classList.toggle('revealed');
    const SorM = 'Mentor'
});
//mentorButton.addEventListener('click', () => {
   // const SorM = 'Student'
//});

function previewProfilePicture(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        const profilePicturePreview = document.getElementById('profilePicturePreview');
        const imgElement = document.createElement('img');
        imgElement.src = reader.result;
        imgElement.style.maxWidth = '200px';
        imgElement.style.maxHeight = '200px';
        profilePicturePreview.innerHTML = '';
        profilePicturePreview.appendChild(imgElement);
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

const Studentbtn = document.getElementById('Student')
const Mentorbtn = document.getElementById('Mentor')

Studentbtn.addEventListener('click', () => {
    Studentbtn.style.backgroundColor = '#008efa';
    Mentorbtn.style.backgroundColor = '#162938';
  });

Mentorbtn.addEventListener('click', () => {
    Studentbtn.style.backgroundColor = '#162938';
    Mentorbtn.style.backgroundColor = '#008efa';
  });
  
  



function validate_email(email) {
   var expression = /^[^@]+@\w+(\.\w+)+\w$/
   if (expression.test(email)  == true) {
       return true
   } else {
       return false
   }
}

function validate_password(password) {
   if (password < 6) {
       return false 
   } else {
       return true
   }
}

function validate_field(field) {
   if (field == null) {
       return false
   } 
       if (field.length <= 0) {
           return false
       }  else {
       return true
   }
}

document.addEventListener('DOMContentLoaded', function() {
    onAuthStateChanged(auth, async function(user) {
        if (user) {
            const uid = user.uid;
            const userRef = doc(db, 'users', uid);

            try {
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    
                   /* document.getElementById('PUsersName').value = data.UsersName || '';
                    document.getElementById('PUserAge').value = data.UserAge || '';
                    document.getElementById('PUserCareer').value = data.UserCareer || '';
                    document.getElementById('PUserPastEducation').value = data.UserPastEducation || '';
                    document.getElementById('PUserContactInfo').value = data.UserContactInfo || '';
                    document.getElementById('PmentorEmployment').value = data.UserCurrentEmployment || ''; 
                    */
                    console.log("here");
                    console.log(data.StudentOrMentor);
                    //document.getElementById('SorM').value = data.StudentOrMentor || ''; 

                    loadProfilePicture(uid);
                    document.getElementById('UsersName').value = data.UsersName || '';
                    document.getElementById('UserAge').value = data.UserAge || '';
                    document.getElementById('UserCareer').value = data.UserCareer || '';
                    document.getElementById('UserPastEducation').value = data.UserPastEducation || '';
                    document.getElementById('UserContactInfo').value = data.UserContactInfo || '';
                    document.getElementById('mentorEmployment').value = data.UserCurrentEmployment || ''; 
                    
                    
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        } else {
            console.log("No user is signed in.");
        }
    });
});



