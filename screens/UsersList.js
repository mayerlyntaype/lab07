import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native'
import { database } from '../database/firebase'
import { QuerySnapshot, collection, onSnapshot, orderBy, query, doc, deleteDoc } from 'firebase/firestore'
import Usuarios from './Usuarios'

const UsersList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const collectionRef = collection(database, 'usuarios')
    const q = query(collectionRef, orderBy('name', 'desc'))

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      setUsers(
        QuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          name: doc.data().name,
          phone: doc.data().phone,
          image: doc.data().image // Agrega la propiedad de imagen
        }))
      )
    })

    return unsubscribe
  }, [])

  const renderUser = ({ item }) => {
    const handleDeleteUser = async () => {
      try {
        await deleteDoc(doc(database, 'usuarios', item.id))
        Alert.alert('Usuario eliminado')
      } catch (error) {
        console.error('Error al eliminar el usuario:', error)
      }
    }

    const userImage = item.image ? { uri: item.image } : require('../assets/2919600.png')

    return (
      <View style={styles.userContainer}>
        <Image source={userImage} style={styles.userImage} /> {/* Agrega la imagen de usuario */}
        <View style={styles.userInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteUser}>
          <Text style={styles.deleteButtonText}>Eliminar</Text>
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.delete} onPress={handleDeleteUser}>
          <Text style={styles.deleteButtonText}>Editar</Text>
          
        </TouchableOpacity>
        
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users List</Text>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  userInfo: {
    flex: 1
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  email: {
    marginBottom: 5
  },
  phone: {
    marginBottom: 5
  },
  deleteButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5
},
delete: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5
},
deleteButtonText: {
color: 'white',
fontWeight: 'bold'
}
})

export default UsersList