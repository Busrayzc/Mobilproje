import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import ShoeStore from './ShoeStore';

const firebaseConfig = {
  apiKey: "AIzaSyCHJXlW7tufyNPHoPqPx6Vy3KqtOoTnQ_A",
  authDomain: "ayakkabi-ceb7b.firebaseapp.com",
  databaseURL: "https://ayakkabi-ceb7b-default-rtdb.firebaseio.com",
  projectId: "ayakkabi-ceb7b",
  storageBucket: "ayakkabi-ceb7b.appspot.com",
  messagingSenderId: "40311478347",
  appId: "1:40311478347:web:78da8b098aa79bbcf995ce",
  measurementId: "G-MJRNJSQBWY"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
       <Text style={styles.title}>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</Text>

       <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Şifre"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Giriş Yap' : 'Kayıt Ol'} onPress={handleAuthentication} color="#3498db" />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Hesabınız yok mu? Kayıt Olun' : 'Zaten hesabınız var mı? Giriş Yapın'}
        </Text>
      </View>
    </View>
  );
}

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Hoş Geldiniz</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="Çıkış Yap" onPress={handleAuthentication} color="#e74c3c" />
      <ShoeStore />
    </View>
  );
};

export default App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        console.log('Kullanıcı başarıyla çıkış yaptı!');
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
          console.log('Kullanıcı başarıyla giriş yaptı!');
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('Kullanıcı başarıyla kaydedildi!');
        }
      }
    } catch (error) {
      console.error('Kimlik doğrulama hatası:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowAuthModal(true)}>
          <Text style={styles.headerText}>{user ? 'Profil' : 'Giriş Yap'}</Text>
        </TouchableOpacity>
      </View>
      {user ? (
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
      <Modal visible={showAuthModal} animationType="slide">
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setShowAuthModal(false)}>
            <Text style={styles.closeButton}>X</Text>
          </TouchableOpacity>
          {user ? (
            <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
          ) : (
            <AuthScreen
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              handleAuthentication={handleAuthentication}
            />
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 20,
    color: '#000',
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },
});
