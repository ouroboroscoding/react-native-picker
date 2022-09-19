import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import Picker from 'react-native-select-picker';

import Countries from './countries.json';

export default function App() {

	let [country, setCountry] = useState('CA');

	return (
		<SafeAreaView>
			<Picker
				onChanged={setCountry}
				options={Countries}
				style={{
					borderColor: '#cecece',
					borderWidth: 1,
					padding: 5
				}}
				value={country}
			/>
			<Text>You selected: {country}</Text>
		</SafeAreaView>
	);
};