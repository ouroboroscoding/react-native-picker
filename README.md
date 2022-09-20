# @ouroboros/react-native-picker
[![npm version](https://img.shields.io/npm/v/@ouroboros/react-native-picker.svg)](https://www.npmjs.com/package/@ouroboros/react-native-picker) ![Supports Android, iOS, Expo](https://img.shields.io/badge/platforms-android%20|%20ios%20|%20expo%20-lightgrey.svg) ![Apache License](https://img.shields.io/npm/l/@ouroboros/react-native-picker.svg)

Coming to the react-native party a bit late, I discovered that the standard Picker component no longer seems to exist, that it was removed from React-Native sometime at the end of 2021 in favour community packages which themselves started to break in 2022 due to no Picker being available. Since no alternative was presented, and I liked the look and feel of the iOS picker, I decided to attempt to recreate it using in pure react native components and offer it up to the community.

## Installation

react-native

```bash
npm install @ouroboros/react-native-picker
```

expo

```bash
expo install @ouroboros/react-native-picker
```

## Getting Started

Import Picker

```javascript
import Picker from '@ouroboros/react-native-picker';
```

Create a state variable for the picker value:

```javascript
let [picker, setPicker] = useState('CA');
```

Add the ```Picker``` to your component:

```javascript
<Picker
	options={[
		{value: 'CA', text: 'Canada'},
		{value: 'MX', text: 'Mexico'},
		{value: 'US', text: 'United States'}
	]}
	onChanged={setPicker}
	style={{borderWidth: 1, borderColor: '#a7a7a7', borderRadius: 5, marginBottom: 5, padding: 5}}
	value={picker}
/>
```

## Props

| Name | Type | Required | Description |
|--|--|--|--|
| onChanged | Function | Yes | A callback function which receives the new value selected by the user as the only argument |
| options | Object[] | Yes | Array of Objects with the value and text properties for each option to be shown |
| style | object\|object[] | No | A single Obejct of styles values or an Array of styles objects to be passed to the input displayed in your component |
| textAlign | ['left', 'center', 'right'] | No | The alignment of the text in the input |
| value | mixed | Yes | The current value selected in the Picker |