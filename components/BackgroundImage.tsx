/* eslint-disable prettier/prettier */
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { ImageSourcePropType, KeyboardAvoidingView, StyleSheet, Image } from 'react-native';

type BackgroundImageProps = {
    source: ImageSourcePropType;
};

export const BackgroundImage: FunctionComponent<PropsWithChildren<BackgroundImageProps>> = ({ source, children }) =>
    <KeyboardAvoidingView style={styles.container}>
        <Image
            style={styles.image}
            source={source}
        />
        {children}
    </KeyboardAvoidingView>;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        position: 'absolute',
        zIndex: 0,
        width: '100%',
        height: '100%',
    },

});
