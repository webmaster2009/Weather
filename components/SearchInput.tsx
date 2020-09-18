import React, { FunctionComponent, PropsWithChildren, RefObject } from 'react';
import { StyleSheet, View, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';

type SearchInputProps = {
    placeholder: string
    submitCallback: (location: string) => void
    inputReference: RefObject<TextInput>
};

export const SearchInput: FunctionComponent<PropsWithChildren<SearchInputProps>> = ({ placeholder, submitCallback, inputReference }) => {

    return (

        <View style={styles.container}>
            <TextInput
                ref={inputReference}
                style={styles.textInput}
                autoCorrect={false}
                placeholder={placeholder}
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                clearButtonMode="always"
                onSubmitEditing={
                    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
                        submitCallback(e.nativeEvent.text)
                    }
                }
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 40,
        marginTop: 20,
        backgroundColor: '#666',
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    textInput: {
        flex: 1,
        color: 'white',
    },

});
