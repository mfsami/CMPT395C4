import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ButtonDiv({ 
  buttonText = "Example", 
  buttonSubtext = "sub example",
  buttonSubtextStyle = {},
  date = "12:45PM", 
  countDown = "10 minutes", 
  type = "long",
  onPress,
  showIcon = true,
  iconName = null,
  iconSize = 24, 
  iconColor = '#000', 
  onIconPress,
}) {
  return (
    <>
      {type === "long" && (
        <TouchableOpacity 
          style={styles.container}
          onPress={() => {/* Add your onPress handler here */}}
        >
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>
              {buttonText}
            </Text>
            <View style={styles.badge}>
              <Text style={styles.time}>
                {date}
              </Text>
              <View style={styles.chip}>
                <Text style={styles.time}>
                  {countDown}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.icon} />
        </TouchableOpacity>
      )}
      {type === "wide" && (
        <TouchableOpacity 
          style={styles.containerWide}
          onPress={onPress}
        >
          <View style={styles.wideContent}>
          {showIcon && (
              <TouchableOpacity
              style={styles.iconContainer}
              onPress={onIconPress}
            >
              <Icon name={iconName} size={iconSize} color={iconColor} />
            </TouchableOpacity>
            )}
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>
                {buttonText}
              </Text>
              <Text style={[styles.buttonSubtext, buttonSubtextStyle]}>
                {buttonSubtext}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1B1C1E',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#313234',
    minHeight: 100,
  },
  containerWide: {
    flex: 1,
    backgroundColor: '#1B1C1E',
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#313234',
    padding: 16,
    minHeight: 200,
  },
  wideContent: {
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '100%',
    height : '100%' , 
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
  },
  badge: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    marginTop: 4,
  },
  time: {
    color: 'white',
    opacity: 0.7,
    fontSize: 14,
  },
  chip: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    backgroundColor: '#2E2E30',
  },
  icon: {
    width: 48,
    height: 48,
    backgroundColor: '#2E2E30',
    borderRadius: 24,
  },
  iconContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width : '100%' , 
    marginBottom: 8,
    padding: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonSubtext : {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    opacity : 0.4 ,
  },
  buttonContainer : {
    width : '100%' , 
    justifyContent : 'flex-stat' , 
    alignItems : 'flex-stat' , 
  },
});

