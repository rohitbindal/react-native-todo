// Functional component to display individual ToDos.
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function Card({ todo, renderStatus, deleteTodo }) {
  return (
    <View style={styles.card}>
      <Text style={styles.todoText}>{todo.todo}</Text>
      {renderStatus}

      <TouchableOpacity style={styles.deleteButton} onPress={deleteTodo}>
        <Text style={styles.textStyle}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    elevation: 10,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  textStyle: {
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
  },
  todoText: {
    fontSize: 20,
    marginBottom: 5,
  },
  deleteButton: {
    marginTop: 5,
    padding: 5,
    backgroundColor: "red",
    elevation: 10,
    borderRadius: 5,
  },
});
