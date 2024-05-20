import { PaperProvider } from 'react-native-paper'
import AppNavigator from './src/navigation/AppNavigator'
import AuthContaxtProvider from './src/contaxts/AuthContaxt'
import Toast from 'react-native-toast-message'
import FetchDocProvider from './src/contaxts/FetchDoc'
export default function App() {
  return (
    <AuthContaxtProvider>
      <PaperProvider>
        <FetchDocProvider>
          <AppNavigator />
        </FetchDocProvider>
        <Toast />
      </PaperProvider>
    </AuthContaxtProvider>

  )
}