import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, SafeAreaView } from "react-native";

const GEMINI_API_KEY = "AIzaSyCpZgsEDSiTY0BbPjmfeWP0Kz76yoQt_6o";

// Define message type with strict sender values
type Message = {
  text: string;
  sender: "user" | "gemini";
};

const App = () => {
  const [msg, setMsg] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleButtonClick = async () => {
    if (!msg.trim()) return;

    // Add user message to the list
    const userMessage: Message = { text: msg, sender: 'user' };
    setMessages(prevMessages => [userMessage, ...prevMessages]);
    setMsg(""); // Clear the input

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: msg,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      console.log("Full API Response:", data);

      const content = data.candidates?.[0]?.content;
      console.log("Content:", content);

      const reply = content?.parts?.[0]?.text || "No response";

      // Add Gemini response to the list
      const geminiMessage: Message = { text: reply, sender: 'gemini' };
      setMessages(prevMessages => [geminiMessage, ...prevMessages]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = { text: "Error occurred", sender: 'gemini' };
      setMessages(prevMessages => [errorMessage, ...prevMessages]);
    }
  };

  const messageSave = (text: string) => {
    setMsg(text);
    console.log(text);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.geminiMessage]}>
      <Text style={[styles.messageText, item.sender === 'user' ? styles.userMessageText : styles.geminiMessageText]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesContainer}
        inverted // To make sure newzxczcjzc zsdas dasd asd asda s
        
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Chat with Bot"
          value={msg}
          onChangeText={messageSave}
          placeholderTextColor="black"//fdsfsdfsfasd
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.90,
    backgroundColor: '',
  },
  messagesContainer: {
    padding: 10,
  },
  message: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: 'black',
    alignSelf: 'flex-end',
  },
  geminiMessage: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: 'white', // Default text color
  },
  userMessageText: {
    color: 'white',
  },
  geminiMessageText: {
    color: 'black',
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: '',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginRight: 10,
    color:'green'
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;