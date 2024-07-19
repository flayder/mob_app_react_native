import React from "react";
import { Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ContentWrapper = ({children}: any) => {
    if(Platform.OS == 'android') {
        return <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
          {children}
        </KeyboardAwareScrollView>
    }
    return <ScrollView
        automaticallyAdjustContentInsets={true}
        contentContainerStyle={{
          flex: 1
        }}
    >
        {children}
    </ScrollView>
}

export default ContentWrapper