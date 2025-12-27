// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { initDB, getNotes, addNote, deleteNote } from './database';

export default function App() {
    const [notes, setNotes] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        (async () => {
            await initDB();
            const data = await getNotes();
            setNotes(data);
        })();
    }, []);

    const handleAdd = async () => {
        if (text.length > 0) {
            await addNote(text);
            const data = await getNotes();
            setNotes(data);
            setText('');
        }
    };

    const handleDelete = async (id) => {
        await deleteNote(id);
        const data = await getNotes();
        setNotes(data);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📝 Mes Notes</Text>
            
            <TextInput
                placeholder="Nouvelle note..."
                value={text}
                onChangeText={setText}
                style={styles.input}
            />
            
            <Button title="➕ Ajouter" onPress={handleAdd} />
            
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.noteItem}>
                        <Text style={styles.noteText}>{item.text}</Text>
                        <Button 
                            title="🗑️" 
                            onPress={() => handleDelete(item.id)}
                            color="#ff4444"
                        />
                    </View>
                )}
                style={styles.notesList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 50,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginVertical: 10,
        backgroundColor: 'white',
        fontSize: 16,
    },
    notesList: {
        marginTop: 20,
    },
    noteItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    noteText: {
        fontSize: 16,
        flex: 1,
        marginRight: 10,
    },
});