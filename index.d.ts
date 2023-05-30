/**
 * React Native Select Picker
 *
 * Select component for picking one option out of many
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2022-09-18
 */
import { StyleProp, TextStyle } from 'react-native';
interface PickerOption {
    value: any;
    text: string;
}
declare type PickerOnChanged = (value: any) => void;
declare type PickerProps = {
    component?: React.ElementType;
    fontSize?: number;
    itemHeight?: number;
    onChanged: PickerOnChanged;
    options: PickerOption[];
    style?: StyleProp<TextStyle>;
    textAlign?: 'left' | 'center' | 'right';
    value: any;
};
/**
 * Picker
 *
 * Acts like an web based iOS HTML Select element
 *
 * @name Picker
 * @access public
 * @param {Object} props Properties passed to the component
 * @returns React.Component
 */
declare const Picker: (props: PickerProps) => JSX.Element;
export default Picker;
