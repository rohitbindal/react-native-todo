import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  LogBox,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { firestore } from "../utils/firebase";
import {
  addTodo,
  deleteTodo,
  getUserID,
  handleSignOut,
  handleUpdateFinished,
  handleUpdateStart,
} from "../utils/firebaseUtils";
import Card from "../components/Card";

LogBox.ignoreLogs(["Setting a timer"]);

const TodoScreen = () => {
  // State to hold the new todo input.
  const [input, setInput] = useState("");
  // State to hold all the todos.
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Constant to hold user id
  const uid = getUserID();

  useEffect(() => {
    getTodoData();
  });

  // Get todo data from firestore
  async function getTodoData() {
    const todoRef = await firestore()
      .collection("USERS")
      .doc(uid)
      .collection("TODO")
      .orderBy("createdAt", "desc")
      .get();
    // Temporary list to store data
    let TODO = [];
    todoRef.docs.map((doc) => {
      TODO.push(doc.data());
    });
    // Add all the todos to our todo state.
    setTodos(TODO);
    setLoading(false);
  }

  // Function to handle input submit
  const handleSubmit = () => {
    // New todo object
    if (input.length >= 2) {
      const newTodo = {
        todo: input,
        started: false,
        finished: false,
      };
      // Add the todo to firestore
      addTodo(newTodo, uid).then();
    } else {
      Alert.alert("Empty Todo", "Input cannot be empty.");
    }
    // Clear the input container
    setInput("");
  };
  // function to render the status of Todo.
  const renderStatus = (hasStarted, hasFinished, todoId) => {
    // If the user has finished the task
    if (hasFinished) {
      return <Text style={styles.finished}>Finished</Text>;
    }
    // if the user has started the task but not finshed yet
    else if (hasStarted && !hasFinished) {
      return (
        <View>
          <Text style={styles.inProgress}>In Progress</Text>
          <TouchableOpacity
            style={styles.finishedButton}
            onPress={() => handleUpdateFinished(todoId, uid)}
          >
            <Text style={styles.buttonText}>Finished</Text>
          </TouchableOpacity>
        </View>
      );
    }
    // If the user has neither finshed the task nor started it.
    else {
      return (
        <View>
          <Text style={styles.notStarted}>Not yet Started</Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => handleUpdateStart(todoId, uid)}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  // Function to map the todos state to card component
  const mapTodos = () => {
    return todos.map((value, index) => (
      <Card
        todo={value}
        key={index}
        index={index}
        renderStatus={renderStatus(value.started, value.finished, value.todoId)}
        deleteTodo={() => deleteTodo(value.todoId, uid)}
      />
    ));
  };

  return (
    <View style={styles.todoContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Todos</Text>

        <TouchableOpacity onPress={handleSignOut}>
          <Text style={{ color: "#000" }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.todoInput}
        placeholder="Add todo..."
        value={input}
        onChangeText={(text) => setInput(text)}
      />
      <TouchableOpacity style={styles.addTodoButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator style={styles.loadin} size="large" color="black" />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {mapTodos()}
        </ScrollView>
      )}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  todoContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  todoInput: {
    marginVertical: 10,
    borderWidth: 0.7,
    borderRadius: 10,
    padding: 15,
  },
  addTodoButton: {
    backgroundColor: "rgba(1,121,121,1)",
    padding: 15,
    alignItems: "center",
    elevation: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "rgba(255,255,255,8)",
  },
  finishedButton: {
    backgroundColor: "rgba(1,201,121,1)",
    padding: 10,
    alignItems: "center",
    elevation: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  startButton: {
    backgroundColor: "rgba(1,201,121,1)",
    padding: 10,
    alignItems: "center",
    elevation: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  inProgress: {
    fontSize: 16,
    color: "rgba(0,0,0,0.5)",
    marginBottom: 5,
  },

  notStarted: {
    fontSize: 16,
    color: "rgba(0,0,0,0.5)",
    marginBottom: 5,
  },
  finished: {
    fontSize: 16,
    color: "rgba(0,0,0,0.5)",
    marginBottom: 5,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
