echo "Updating TabViewPagerAndroid"
cp -f core/TabViewPagerAndroid.js node_modules/react-native-tab-view/src/TabViewPagerAndroid.js
echo "TabViewPagerAndroid updated"

echo "Updating react-native-safe-area-view"
cp -f core/react-native-safe-area-index.js node_modules/react-native-safe-area-view/index.js
cp -f core/react-native-safe-area-index.js node_modules/react-navigation/src/views/SafeAreaView.js
echo "react-native-safe-area-view updated"

echo "Updating react-native-keyboard-aware-scroll-view"
cp -f core/KeyboardAwareHOC.js node_modules/react-native-keyboard-aware-scroll-view/lib/KeyboardAwareHOC.js
cp -f core/KeyboardAwareHOC.js node_modules/react-navigation/src/navigators/createKeyboardAwareNavigator.js
echo "react-native-keyboard-aware-scroll-view updated"


echo "Updating react-native-country-picker calling code"
cp -f core/countries-emoji.json node_modules/react-native-country-picker-modal/lib/assets/data/countries-emoji.json
echo "react-native-country-picker calling code updated"

echo "Updating react-native-image-viewer for post view"
cp -f core/ImageViewing.js node_modules/react-native-image-viewing/dist/ImageViewing.js

cp -f core/ImageItem.android.js node_modules/react-native-image-viewing/dist/components/ImageItem/ImageItem.android.js

cp -f core/ImageItem.ios.js node_modules/react-native-image-viewing/dist/components/ImageItem/ImageItem.ios.js

cp -f core/ImageDefaultHeader.js node_modules/react-native-image-viewing/dist/components/ImageDefaultHeader.js

cp -f core/react-native-media-controls.cjs.development.js node_modules/react-native-media-controls/dist/react-native-media-controls.cjs.development.js
echo "react-native-image-viewer for post view updated"

cp -f core/PushNotification.java node_modules/react-native-notifications/lib/android/app/src/main/java/com/wix/reactnativenotifications/core/notification/PushNotification.java
echo "push notification file changed for receiving notification banner in android"
