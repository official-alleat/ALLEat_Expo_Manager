import { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import stores from './stores.js';

export default function StoreScreen({ navigation }) {
    const [account, setAccount] = useState({name: '', password: ''})
    const [error, setError] = useState('')

    const onChangeText = (prop) => (value) => {
        setAccount({
          ...account,
          [prop]: value,
        });
        setError('')
    };

    const login = (account) => {
        for (const id in stores){
            const store = stores[id]
            if (store.name === account.name) {
                if (store.password === account.password) {
                    return id
                }
                else {
                    setError('비밀번호가 일치하지 않습니다')
                    return undefined
                }
            }
        }
        setError('가게가 존재하지 않습니다')
        return undefined
    }
    

    const handleSubmit = () => {
        if (! account.name) {
            return setError('가게 이름을 입력하세요')
        }
        if (!account.password){
            return setError('비밀번호를 입력하세요')
        }

        storeId = login(account)
        if (storeId) {
            return navigation.navigate('Seat', {storeId: storeId})
        }
    }
    return (
        <View>
            <Text>Store page</Text>
            <TextInput label="가게 이름" onChangeText={onChangeText("name")}/>
            <TextInput label="비밀번호" onChangeText={onChangeText("password")}/>
            <Text style={{color: 'red'}}>{error}</Text>
            <Button mode="contained" onPress={handleSubmit} style={{borderRadius: 5}}>
                로그인 하기
            </Button>
        </View>
  );
}