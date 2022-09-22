/**
 * React Native Select Picker
 *
 * Select component for picking one option out of many
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2022-09-18
 */

// NPM Imports
import { afindi, afindo } from '@ouroboros/tools';
import { useEffect, useRef, useState } from 'react';
import {
    Modal,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Pressable,
    ScrollView,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    TouchableOpacity,
    View
} from 'react-native';

// Constants
const ITEM_HEIGHT: number = 40;

interface PickerOption {
    value: any,
    text: string
}

type PickerOnChanged = (value: any) => void;

type PickerProps = {
    onChanged: PickerOnChanged,
    options: PickerOption[],
    style?: StyleProp<TextStyle>,
    textAlign?: 'left' | 'center' | 'right',
    value: any
}

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
const Picker = (props: PickerProps) => {

    // State
    const [open, openSet] = useState(false);
    const [text, textSet] = useState('');

    // Refs
    const scrollRef = useRef<ScrollView | null>(null);
    const scrollTimer = useRef<number | null>(null);

    // Value effect
    useEffect(() => {
        const o = afindo(props.options, 'value', props.value);
        textSet(o ? o.text : '');
    }, [props.value, props.options]);

    // Open effect
    useEffect(() => {

        // If we have a ref to the scroll view
        if(scrollRef.current) {

            // Get the index of the value
            const i = afindi(props.options, 'value', open);
            if(i > -1) {
                scrollTo(i);
            }
        }
    }, [open]);

    // Called to set the new value
    function done() {

        // If the value changed, notify the parent
        if(open !== props.value) {
            props.onChanged(open);
        }

        // Hide the options
        openSet(false);
    }

    // Called when the options are scrolled
    function scrolled(ev: NativeSyntheticEvent<NativeScrollEvent>) {

        // Calculate the index based on the current y
        const i = Math.round(ev.nativeEvent.contentOffset.y / ITEM_HEIGHT);

        // Set timer for setting the new option
        if(scrollTimer.current) {
            clearTimeout(scrollTimer.current);
        }
        scrollTimer.current = setTimeout(() => {

            // If the value has actually changed, set it, that will take care
            //	of scrolling directly on it
            if(props.options[i].value !== open) {
                openSet(props.options[i].value);
            }

            // Else, if the value hasn't changed, take care of re-centering the
            //	current value
            else {
                scrollTo(i);
            }
        }, 100);
    }

    // Called to scroll the view to the index
    function scrollTo(i: number) {

        // Assuming we have the ref
        if(scrollRef.current) {

            // Scroll to the given item based on index and item height
            scrollRef.current.scrollTo({
                x: 0,
                y: i * ITEM_HEIGHT,
                animated: true
            });
        }
    }

    // Render component
    return (
        <>
            <Pressable onPress={() => openSet(props.value)}>
                <View pointerEvents="none">
                    <TextInput
                        caretHidden={true}
                        style={props.style}
                        textAlign={props.textAlign}
                        value={text}
                    />
                </View>
            </Pressable>
            {open !== false &&
                <Modal
                    animationType="fade"
                    onRequestClose={() => openSet(false)}
                    transparent={true}
                    visible={true}
                >
                    <View style={styles.modal}>
                        <View style={styles.container}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={done} style={styles.done}>
                                    <Text style={styles.doneText}>Done</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView
                                bounces={false}
                                onScroll={scrolled}
                                ref={scrollRef}
                                style={styles.items}
                            >
                                <View style={styles.item}></View>
                                {props.options.map(o =>
                                    <Pressable key={o.value} onPress={() => openSet(o.value)}>
                                        <View style={styles.item}>
                                            <Text style={styles.itemText}>{o.text}</Text>
                                        </View>
                                    </Pressable>
                                )}
                                <View style={styles.item}></View>
                            </ScrollView>
                            <View style={styles.overlay} pointerEvents="none">
                                <View style={styles.overlayFog}></View>
                                <View style={styles.overlaySelected}></View>
                                <View style={styles.overlayFog}></View>
                            </View>
                        </View>
                    </View>
                </Modal>
            }
        </>
    );
}
export default Picker;

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#caced6',
        borderColor: '#d5d5d7',
        borderWidth: 1,
        bottom: 0,
        position: 'absolute',
        width: '100%'
    },

    done: {
    },

    doneText: {
        color: '#5b87ba',
        paddingHorizontal: 12,
        paddingVertical: 8
    },

    header: {
        alignItems: 'flex-end',
        backgroundColor: '#ecedf0',
        flexGrow: 0,
    },

    item: {
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center'
    },

    items: {
        height: (ITEM_HEIGHT * 3)
    },

    itemText: {
        color: '#000000',
        fontSize: 14
    },

    modal: {
        alignItems: 'flex-end',
        backgroundColor: '#00000080',
        flex: 1
    },

    overlay: {
        backgroundColor: 'transparent',
        bottom: 0,
        height: (ITEM_HEIGHT * 3),
        position: 'absolute',
        width: '100%',
        zIndex: 10
    },

    overlayFog: {
        backgroundColor: '#caced6d9',
        height: ITEM_HEIGHT
    },

    overlaySelected: {
        borderBottomWidth: 2,
        borderColor: '#b9bec6',
        borderTopWidth: 2,
        height: ITEM_HEIGHT
    }
});
