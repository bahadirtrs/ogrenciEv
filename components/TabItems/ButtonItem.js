import React from 'react'
import { View, Image } from 'react-native'
import { icons, COLORS } from "../../constants";

export default function buttonItem(props) {
    return (
        <Image
            source={props.icon}
            resizeMode="contain"
            style={{
                tintColor: props.tintColor,
                width: 20,
                height: 20
            }}
        />
    )
}
