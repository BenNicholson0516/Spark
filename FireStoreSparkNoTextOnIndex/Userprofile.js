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

let profilePic = document.getElementById('profile-profile-pic');

 // Function to load profile picture on page load
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



document.addEventListener('DOMContentLoaded', function() {
    onAuthStateChanged(auth, async function(user) {
        if (user) {
            const uid = user.uid;
            const userRef = doc(db, 'users', uid);
            await loadProfilePicture(uid);
            //console.log(PFPReference);
            console.log("here1");
           console.log 

            //console.log(file);
            console.log(profilePic);
    

            try {
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    
                    document.getElementById('PUsersName').value = data.UsersName || '';
                    document.getElementById('PUserAge').value = data.UserAge || '';
                    document.getElementById('PUserCareer').value = data.UserCareer || '';
                    document.getElementById('PUserPastEducation').value = data.UserPastEducation || '';
                    document.getElementById('PUserContactInfo').value = data.UserContactInfo || '';
                    document.getElementById('PmentorEmployment').value = data.UserCurrentEmployment || ''; 
                   // document.getElementById('profile-profile-pic').value = file;
                    console.log("here2");
                    console.log(data.StudentOrMentor);
                    //document.getElementById('SorM').value = data.StudentOrMentor || ''; 

                    
                   /* document.getElementById('UsersName').value = data.UsersName || '';
                    document.getElementById('UserAge').value = data.UserAge || '';
                    document.getElementById('UserCareer').value = data.UserCareer || '';
                    document.getElementById('UserPastEducation').value = data.UserPastEducation || '';
                    document.getElementById('UserContactInfo').value = data.UserContactInfo || '';
                    document.getElementById('mentorEmployment').value = data.UserCurrentEmployment || ''; 
                    */
                    if (data.StudentOrMentor === "Mentor") {
                        const StudentBtn = document.getElementById('PStudent');
                        StudentBtn.style.display = "none";
                        mentorEmploymentBox.style.display = 'block'
                        const MentorBtn = document.getElementById('PMentor');
                        MentorBtn.disabled = true;

                    } else {
                        const MentorBtn = document.getElementById('PMentor');
                        MentorBtn.style.display = "none";
                        
                       
                    }
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


document.addEventListener("DOMContentLoaded", function() {
    // Get the element for the "Current Employment" label and textbox
    const employmentBox = document.getElementById("mentorEmploymentBox");

    // Hide the element by setting its display property to "none"
    employmentBox.style.display = "none";
});

 document.getElementById('PMentor').addEventListener('click', function() {
    var mentorEmploymentBox = document.getElementById('mentorEmploymentBox');
    if (mentorEmploymentBox.style.display === 'none') {
        mentorEmploymentBox.style.display = 'block';
    } else {
        mentorEmploymentBox.style.display = 'none';
    }
});

document.getElementById('PStudent').addEventListener('click', function() {
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

const mentorButton = document.getElementById('PMentor');
const mentorEmploymentBox = document.getElementById('mentorEmploymentBox');

mentorButton.addEventListener('click', () => {
    mentorEmploymentBox.classList.toggle('revealed');
    const SorM = 'Mentor'
});