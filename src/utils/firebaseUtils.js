import { ToastAndroid } from "react-native";
import firebase, { auth, firestore } from "./firebase";

// Firestore database ref
const userDataRef = firestore().collection("USERS");

// Function to handle sign in with Google
export async function handleSignIn() {
  await auth()
    .signInWithEmailAndPassword("rbindal1233@gmail.com", "rohitbindal")
    .then(
      (result) => {
        console.log("Signed in");
        // Get the user uid from the result
        const userId = result.user.uid;
        addNewUser(userId);
        ToastAndroid.show("Signed In", ToastAndroid.SHORT);
      },
      (error) => {
        console.log(error.message);
      }
    );
  // const userName = result.user.displayName;
}

// Function to add new user data to firestore when the user sign's in.
export async function addNewUser(id) {
  // Add the todos to firebase
  await userDataRef
    .doc(id)
    .set(
      {
        id,
      },
      { merge: true }
    )
    .then(
      () => console.log("User data added"),
      (error) => console.log(error.message)
    );
}

// Function to handle Sign out
export function handleSignOut() {
  return auth()
    .signOut()
    .then(() => {
      ToastAndroid.show("Signed Out", ToastAndroid.SHORT);
    });
}

// function to add todo
export async function addTodo(todo, uid) {
  const todoDoc = userDataRef.doc(uid).collection("TODO").doc();

  // Todo id
  const todoId = todoDoc.id;
  // Server timestamp
  const SERVER_TIMESTAMP = firestore.FieldValue.serverTimestamp();
  console.log(SERVER_TIMESTAMP);
  // Add todo
  await todoDoc
    .set({
      ...todo,
      todoId,
      createdAt: SERVER_TIMESTAMP,
    })
    .then(
      () => ToastAndroid.show("Todo Added", ToastAndroid.SHORT),
      (error) => alert(error.message)
    );
}

// Get the user id of currently signed in User
export function getUserID() {
  if (firebase.auth().currentUser) {
    return auth().currentUser.uid;
  }
}

// Delete a todo
export async function deleteTodo(todoId, uid) {
  await userDataRef.doc(uid).collection("TODO").doc(todoId).delete();
}

// Update the started value in our todos.
export async function handleUpdateStart(todoId, uid) {
  await userDataRef.doc(uid).collection("TODO").doc(todoId).update({
    started: true,
  });
}

// Update the finished value in our todos.
export async function handleUpdateFinished(todoId, uid) {
  await userDataRef.doc(uid).collection("TODO").doc(todoId).update({
    finished: true,
  });
}
