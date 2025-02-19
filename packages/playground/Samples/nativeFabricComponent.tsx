/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 * @format
 */
import React from 'react';
import {AppRegistry, Text, View} from 'react-native';
import type {ViewProps} from 'react-native';

import {
  setRuntimeConfigProvider,
  get,
  // @ts-ignore - NativeComponentRegistry is internal and has no types.  Need it for now since we have no viewmanager for this component
} from 'react-native/Libraries/NativeComponent/NativeComponentRegistry';

// Since MyCustomComponent does not have a ViewManager, we need to override the config provider
// to say that MyCustomComponent should get its config from JS, not native
setRuntimeConfigProvider((name: string) => {
  return {
    native: name !== 'MyCustomComponent',
    strict: false,
    verify: false,
  };
});

interface NativeProps extends ViewProps {
  label: string;
}

// Cannot just use codegenNativeComponent, or registerNativeComponent, since we need to provide a custom config
const MyCustomComponent = get<NativeProps>('MyCustomComponent', () => {
  return {
    uiViewClassName: 'MyCustomComponent',
    bubblingEventTypes: {},
    directEventTypes: {},
    validAttributes: {
      label: true,
    },
  };
}) as React.ComponentType<NativeProps>;

const Bootstrap = () => {
  return (
    <View
      style={{
        borderRadius: 0,
        margin: 10,
        borderWidth: 2,
        gap: 5,
        height: 500,
      }}>
      <Text>This is RN Texsst - </Text>
      <MyCustomComponent label="test" />
    </View>
  );
};

AppRegistry.registerComponent('Bootstrap', () => Bootstrap);
