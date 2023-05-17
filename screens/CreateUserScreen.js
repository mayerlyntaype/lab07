import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { database } from '../database/firebase'
import { collection, addDoc } from 'firebase/firestore'

const CreateUserScreen = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value })
  }

  const saveNewUser = async () => {
    if (state.name === '') {
      alert('Por favor, ingresa un nombre')
    } else {
      await addDoc(collection(database, 'usuarios'), state)
      alert('Usuario guardado')
      props.navigation.navigate('UsersList')
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre de usuario</Text>
        <TextInput
          placeholder="Ingresa el nombre"
          style={styles.input}
          onChangeText={(value) => handleChangeText('name', value)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email de usuario</Text>
        <TextInput
          placeholder="Ingresa el email"
          style={styles.input}
          onChangeText={(value) => handleChangeText('email', value)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Teléfono de usuario</Text>
        <TextInput
          placeholder="Ingresa el teléfono"
          style={styles.input}
          onChangeText={(value) => handleChangeText('phone', value)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={saveNewUser}>
        <Text style={styles.buttonText}>Guardar Usuario</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8F8F8',
    padding: 20
  },
  formGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    borderRadius: 5,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  button: {
    backgroundColor: '#E91E63',
    borderRadius: 5,
    paddingVertical: 12
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default CreateUserScreen
