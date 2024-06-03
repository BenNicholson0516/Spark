
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
//import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { child, push, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
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
let mentors = [];
let currentIndex = 0;
const storage = getStorage();

let profilePic = document.getElementById('Mentor-profile-pic');
//const MentorUid = mentorData.UID;





const getUserCareer = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data().UserCareer; // Fetch UserCareer field
  } else {
    console.log("No such document!");
    return null;
  }
};

const loadProfilePicture = async (MentorUid) => {
    const storageRef = Sref(storage, MentorUid); // Create reference to file with user UID
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

const displayCurrentMentor = async (mentorData) => {
    // Access mentor data and update HTML elements
    //const uid = user.uid
    const MentorUid = mentorData.UID;
    console.log(MentorUid);
    loadProfilePicture(MentorUid);


    document.getElementById('MentorName').value = mentorData.UsersName || '';
    document.getElementById('MentorAge').value = mentorData.UserAge || '';
    document.getElementById('MentorCareer').value = mentorData.UserCareer || '';
    document.getElementById('MentorPastEducation').value = mentorData.UserPastEducation || '';
    document.getElementById('MentorContactInfo').value = mentorData.UserContactInfo || '';
   document.getElementById('MentormentorEmployment').value = mentorData.UserCurrentEmployment || '';
}

const findMentors = async () => {
    const user = auth.currentUser;
    if (!user) {
        console.log("No user is signed in.");
        return;
    }

    const uid = user.uid;
    const userCareer = await getUserCareer(uid);
    if (!userCareer) {
        console.log("UserCareer not found.");
        return;
    }

    const q = query(
        collection(db, "users"),
        where('StudentOrMentor', '==', "Mentor"),
        where('UserCurrentEmployment', '==', userCareer)
    );

    const querySnapshot = await getDocs(q);
    const mentorsData = querySnapshot.docs.map(doc => doc.data());

    // Check if there are mentors left to display
    if (currentIndex < mentorsData.length) {
        const mentorData = mentorsData[currentIndex];
        await displayCurrentMentor(mentorData);
        currentIndex++;
    } else {
        alert("No more mentors found!");
    }
}

// Example: Attach findMentors function to a button click event
document.addEventListener('DOMContentLoaded', () => {
    const StartAlgorithm = document.getElementById('FindMentor');
    StartAlgorithm.addEventListener("click", function(event) {
        event.preventDefault();
        findMentors();
    });
});


 /*

document.addEventListener('DOMContentLoaded', function() {
    onAuthStateChanged(auth, async function(user) {
        if (user) {
            const uid = user.uid;
            const userRef = doc(db, 'users', uid);

            try {
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();

                    document.getElementById('MentorName').value = data.UsersName || '';
                    document.getElementById('MentorAge').value = data.UserAge || '';
                    document.getElementById('MentorCareer').value = data.UserCareer || '';
                    document.getElementById('MentorPastEducation').value = data.UserPastEducation || '';
                    document.getElementById('MentorContactInfo').value = data.UserContactInfo || '';
                    document.getElementById('MentormentorEmployment').value = data.UserCurrentEmployment || ''; 
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
    */
