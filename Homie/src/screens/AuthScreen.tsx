import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button } from '../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Auth: undefined;  // Add other screens and their params here
};

type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;

interface AuthError {
  message: string;
  code?: string;
}

const AuthScreen: React.FC<AuthScreenProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (isRegistering) {
        await auth().createUserWithEmailAndPassword(email, password);
      } else {
        await auth().signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      const firebaseError = err as AuthError;
      let errorMessage = 'Authentication failed';
      
      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password';
          break;
        default:
          errorMessage = firebaseError.message || 'Authentication failed';
      }

      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
    setError(null);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          {isRegistering ? 'Create Account' : 'Welcome Back'}
        </Text>
        
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          autoCapitalize="none"
          editable={!isLoading}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Button
          onPress={handleAuth}
          disabled={isLoading}
          style={styles.authButton}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              {isRegistering ? 'Sign Up' : 'Sign In'}
            </Text>
          )}
        </Button>

        <Button
          onPress={toggleAuthMode}
          variant="secondary"
          disabled={isLoading}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleText}>
            {isRegistering 
              ? 'Already have an account? Sign In' 
              : 'Need an account? Sign Up'}
          </Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#F7FAFC',
  },
  errorText: {
    color: '#E53E3E',
    marginBottom: 12,
    textAlign: 'center',
  },
  authButton: {
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleButton: {
    marginTop: 12,
  },
  toggleText: {
    color: '#4A5568',
    fontSize: 14,
  },
});

export default AuthScreen;
