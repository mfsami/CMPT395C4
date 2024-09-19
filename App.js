import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const translateX = useSharedValue(0);

  const content = [
    {
      subtitle: "Clear Learning, Achieved Simply",
      title: "Effortless Tutor Booking Anytime, Anywhere.",
    },
    {
      subtitle: "Personalized Learning",
      title: "Find the Perfect Tutor for Your Needs",
    },
    {
      subtitle: "Flexible Scheduling",
      title: "Book Sessions at Your Convenience",
    }
  ];

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (event) => {
      if (Math.abs(event.velocityX) < 500) {
        if (event.translationX < -SWIPE_THRESHOLD && currentPage < content.length - 1) {
          translateX.value = withSpring((currentPage + 1) * -SCREEN_WIDTH);
          setCurrentPage(currentPage + 1);
        } else if (event.translationX > SWIPE_THRESHOLD && currentPage > 0) {
          translateX.value = withSpring((currentPage - 1) * -SCREEN_WIDTH);
          setCurrentPage(currentPage - 1);
        } else {
          translateX.value = withSpring(currentPage * -SCREEN_WIDTH);
        }
      } else {
        if (event.velocityX > 0 && currentPage > 0) {
          translateX.value = withSpring((currentPage - 1) * -SCREEN_WIDTH);
          setCurrentPage(currentPage - 1);
        } else if (event.velocityX < 0 && currentPage < content.length - 1) {
          translateX.value = withSpring((currentPage + 1) * -SCREEN_WIDTH);
          setCurrentPage(currentPage + 1);
        } else {
          translateX.value = withSpring(currentPage * -SCREEN_WIDTH);
        }
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.imageContainer}>
          {/* Placeholder for image */}
        </View>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.contentContainer, animatedStyle]}>
            {content.map((item, index) => (
              <View key={index} style={styles.page}>
                <View style={styles.TextContainer}>
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </View>
            ))}
          </Animated.View>
        </PanGestureHandler>
        <View style={styles.pagination}>
          {content.map((_, index) => (
            <View
              key={index}
              style={[
                styles.circle,
                index === currentPage && styles.activeCircle
              ]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
  },
  imageContainer: {
    backgroundColor: '#f0f0f0', // Placeholder color
    height: 430,
    width: 345,
    borderRadius: 20,
    marginBottom: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 3,
  },
  page: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 6,
  },
  activeCircle: {
    backgroundColor: '#4B5563',
    width: 24,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4B5563',
  },
  button: {
    backgroundColor: '#6D6D6D',
    paddingVertical: 15,
    width: '90%',
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  TextContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 8,
    alignItems: 'center',
  },
});
