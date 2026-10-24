import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  useWindowDimensions,
  Platform,
} from 'react-native';

const COLORS = {
  primaryGreen: '#168A4E',
  primaryGreenHover: '#137843',
  brightGreen: '#16A34A',
  darkGreen: '#1A241F',
  lightMint: '#EBF7EE',
  mintBorder: '#D2EEDB',
  cardBg: '#FFFFFF',
  bodyText: '#63736B',
  mutedText: '#8E9E95',
  border: '#E5EBE7',
  borderInput: '#D8E2DC',
  background: '#F9FBF9',
};

export default function LoginScreen({ navigation, onNavigate }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;
  const isMobile = width < 768;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBackToLanding = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else if (onNavigate) {
      onNavigate('Landing');
    }
  };

  const handleLogin = () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Welcome back to FoodMind AI!\nSigned in as: ${email}`);
    }, 700);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.mainLayout,
            {
              flexDirection: isDesktop ? 'row' : 'column',
              paddingHorizontal: isDesktop ? 40 : 16,
            },
          ]}
        >
          {/* =========================================================================
              LEFT COLUMN: BRANDING & GROCERY INTELLIGENCE SHOWCASE
             ========================================================================= */}
          <View
            style={[
              styles.leftSection,
              {
                width: isDesktop ? '56%' : '100%',
                paddingRight: isDesktop ? 48 : 0,
                marginBottom: isDesktop ? 0 : 36,
              },
            ]}
          >
            {/* Top Brand Logo */}
            <TouchableOpacity
              style={styles.brandRow}
              onPress={handleBackToLanding}
              activeOpacity={0.8}
            >
              <View style={styles.leafIconBadge}>
                <Text style={styles.leafIcon}>🍃</Text>
              </View>
              <View>
                <View style={styles.brandTitleRow}>
                  <Text style={styles.brandTitleText}>FoodMind </Text>
                  <Text style={styles.brandTitleHighlight}>AI</Text>
                </View>
                <Text style={styles.brandTagline}>Smarter Groceries, Less Waste.</Text>
              </View>
            </TouchableOpacity>

            {/* AI-Powered Grocery Intelligence Pill */}
            <View style={styles.pillBadge}>
              <Text style={styles.pillBadgeText}>AI-POWERED GROCERY INTELLIGENCE</Text>
            </View>

            {/* Headline */}
            <View style={styles.headlineBox}>
              <Text style={styles.headlineBlack}>Manage Smarter.</Text>
              <Text style={styles.headlineGreen}>Grow Faster.</Text>
            </View>

            {/* Subtitle */}
            <Text style={styles.leftSubtitle}>
              AI-driven demand forecasting, inventory optimization and expiry-risk
              prediction for modern grocery businesses.
            </Text>

            {/* 4 Feature Items */}
            <View style={styles.featuresList}>
              {/* Feature 1 */}
              <View style={styles.featureItem}>
                <View style={styles.featureIconBox}>
                  <Text style={styles.featureIcon}>📊</Text>
                </View>
                <View style={styles.featureTextBox}>
                  <Text style={styles.featureTitle}>Demand Forecasting</Text>
                  <Text style={styles.featureDesc}>Predict demand with AI.</Text>
                </View>
              </View>

              {/* Feature 2 */}
              <View style={styles.featureItem}>
                <View style={styles.featureIconBox}>
                  <Text style={styles.featureIcon}>📦</Text>
                </View>
                <View style={styles.featureTextBox}>
                  <Text style={styles.featureTitle}>Inventory Optimization</Text>
                  <Text style={styles.featureDesc}>Keep the right stock, always.</Text>
                </View>
              </View>

              {/* Feature 3 */}
              <View style={styles.featureItem}>
                <View style={styles.featureIconBox}>
                  <Text style={styles.featureIcon}>🗑️</Text>
                </View>
                <View style={styles.featureTextBox}>
                  <Text style={styles.featureTitle}>Reduce Food Waste</Text>
                  <Text style={styles.featureDesc}>Identify expiry risks early.</Text>
                </View>
              </View>

              {/* Feature 4 */}
              <View style={styles.featureItem}>
                <View style={styles.featureIconBox}>
                  <Text style={styles.featureIcon}>🍃</Text>
                </View>
                <View style={styles.featureTextBox}>
                  <Text style={styles.featureTitle}>Increase Profitability</Text>
                  <Text style={styles.featureDesc}>Make data-driven decisions.</Text>
                </View>
              </View>
            </View>

            {/* Produce Scene with Floating Badges */}
            <View style={styles.produceSceneContainer}>
              <Image
                source={require('../../../assets/produce-crates.jpg')}
                style={styles.produceImage}
                resizeMode="cover"
              />
              <View style={styles.produceOverlayFade} />

              {/* Floating Badge 1: Forecast Demand +32% */}
              <View style={[styles.floatingBadge, styles.badgeForecastPos]}>
                <View style={styles.badgeIconBox}>
                  <Text style={styles.badgeIcon}>📊</Text>
                </View>
                <View>
                  <Text style={styles.badgeLabel}>Forecast Demand</Text>
                  <Text style={styles.badgeValueGreen}>+32% ↗</Text>
                </View>
              </View>

              {/* Floating Badge 2: Reduce Food Waste -45% */}
              <View style={[styles.floatingBadge, styles.badgeWastePos]}>
                <View style={styles.badgeIconBox}>
                  <Text style={styles.badgeIcon}>🍃</Text>
                </View>
                <View>
                  <Text style={styles.badgeLabel}>Reduce Food Waste</Text>
                  <Text style={styles.badgeValueDark}>-45% ↓</Text>
                </View>
              </View>
            </View>

            {/* Bottom 3-Metric Banner */}
            <View style={styles.bottomMetricsBanner}>
              {/* Metric 1 */}
              <View style={styles.metricItem}>
                <View style={styles.metricIconCircle}>
                  <Text style={styles.metricEmoji}>📊</Text>
                </View>
                <View>
                  <Text style={styles.metricValue}>-45%</Text>
                  <Text style={styles.metricLabel}>Food Waste</Text>
                </View>
              </View>

              <View style={styles.metricDivider} />

              {/* Metric 2 */}
              <View style={styles.metricItem}>
                <View style={styles.metricIconCircle}>
                  <Text style={styles.metricEmoji}>📦</Text>
                </View>
                <View>
                  <Text style={styles.metricValue}>+28%</Text>
                  <Text style={styles.metricLabel}>Inventory Efficiency</Text>
                </View>
              </View>

              <View style={styles.metricDivider} />

              {/* Metric 3 */}
              <View style={styles.metricItem}>
                <View style={styles.metricIconCircle}>
                  <Text style={styles.metricEmoji}>📈</Text>
                </View>
                <View>
                  <Text style={styles.metricValue}>+35%</Text>
                  <Text style={styles.metricLabel}>Higher Profitability</Text>
                </View>
              </View>
            </View>
          </View>

          {/* =========================================================================
              RIGHT COLUMN: LOGIN CARD & HEADER
             ========================================================================= */}
          <View
            style={[
              styles.rightSection,
              {
                width: isDesktop ? '44%' : '100%',
                maxWidth: 480,
                alignSelf: isDesktop ? 'center' : 'stretch',
              },
            ]}
          >
            {/* Top Navigation Row */}
            <View style={styles.topRightNavRow}>
              <TouchableOpacity
                onPress={handleBackToLanding}
                style={styles.backHomeBtn}
                activeOpacity={0.7}
              >
                <Text style={styles.backHomeBtnText}>← Back to Home</Text>
              </TouchableOpacity>

              <View style={styles.contactRow}>
                <Text style={styles.newToText}>New to FoodMind AI? </Text>
                <TouchableOpacity onPress={() => alert('Contacting sales & support...')}>
                  <Text style={styles.contactUsLink}>Contact Us</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Elevated Login Card */}
            <View style={styles.loginCard}>
              {/* Card Brand Header */}
              <View style={styles.cardBrandHeader}>
                <View style={styles.cardLeafBadge}>
                  <Text style={styles.cardLeafIcon}>🍃</Text>
                </View>
                <View>
                  <View style={styles.cardBrandTitleRow}>
                    <Text style={styles.cardBrandTitle}>FoodMind </Text>
                    <Text style={styles.cardBrandHighlight}>AI</Text>
                  </View>
                  <Text style={styles.cardBrandTagline}>Smarter Groceries, Less Waste.</Text>
                </View>
              </View>

              {/* Welcome Heading */}
              <View style={styles.welcomeBox}>
                <Text style={styles.welcomeTitle}>Welcome Back</Text>
                <Text style={styles.welcomeSubtitle}>
                  Login to access your FoodMind AI account
                </Text>
              </View>

              {/* Form Inputs */}
              <View style={styles.formFields}>
                {/* Email Address */}
                <View style={styles.inputContainer}>
                  <View style={styles.inputIconBox}>
                    <Text style={styles.inputSymbol}>✉</Text>
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Email address"
                    placeholderTextColor="#9AA8A0"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                {/* Password */}
                <View style={styles.inputContainer}>
                  <View style={styles.inputIconBox}>
                    <Text style={styles.inputSymbol}>🔒</Text>
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#9AA8A0"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeToggleBtn}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.eyeIcon}>{showPassword ? '👁' : '👁️‍🗨️'}</Text>
                  </TouchableOpacity>
                </View>

                {/* Remember Me & Forgot Password */}
                <View style={styles.optionsRow}>
                  <TouchableOpacity
                    style={styles.rememberMeGroup}
                    onPress={() => setRememberMe(!rememberMe)}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.customCheckbox,
                        rememberMe && styles.customCheckboxActive,
                      ]}
                    >
                      {rememberMe && <Text style={styles.checkmarkIcon}>✓</Text>}
                    </View>
                    <Text style={styles.rememberMeLabel}>Remember me</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => alert('Password reset link sent to your email.')}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.forgotPasswordLink}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>

                {/* Sign In Button */}
                <TouchableOpacity
                  style={[styles.signInBtn, isSubmitting && styles.signInBtnDisabled]}
                  onPress={handleLogin}
                  disabled={isSubmitting}
                  activeOpacity={0.88}
                >
                  <Text style={styles.signInBtnText}>
                    {isSubmitting ? 'Signing In...' : 'Sign In  →'}
                  </Text>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.orDividerContainer}>
                  <View style={styles.orDividerLine} />
                  <Text style={styles.orDividerText}>or continue with</Text>
                  <View style={styles.orDividerLine} />
                </View>

                {/* Social Login Buttons */}
                <View style={styles.socialStack}>
                  {/* Google */}
                  <TouchableOpacity
                    style={styles.socialBtn}
                    onPress={() => alert('Continue with Google')}
                    activeOpacity={0.8}
                  >
                    <View style={styles.googleIconBadge}>
                      <Text style={styles.googleLetter}>G</Text>
                    </View>
                    <Text style={styles.socialBtnText}>Continue with Google</Text>
                  </TouchableOpacity>

                  {/* Microsoft */}
                  <TouchableOpacity
                    style={styles.socialBtn}
                    onPress={() => alert('Continue with Microsoft')}
                    activeOpacity={0.8}
                  >
                    <View style={styles.microsoftIconGrid}>
                      <View style={[styles.msSquare, { backgroundColor: '#F25022' }]} />
                      <View style={[styles.msSquare, { backgroundColor: '#7FBA00' }]} />
                      <View style={[styles.msSquare, { backgroundColor: '#00A4EF' }]} />
                      <View style={[styles.msSquare, { backgroundColor: '#FFB900' }]} />
                    </View>
                    <Text style={styles.socialBtnText}>Continue with Microsoft</Text>
                  </TouchableOpacity>
                </View>

                {/* Card Footer */}
                <View style={styles.cardFooter}>
                  <Text style={styles.noAccountText}>
                    Don't have an account?{' '}
                    <Text
                      style={styles.signUpHighlight}
                      onPress={() => alert('Sign up coming soon! Contact support for an invite.')}
                    >
                      Sign up
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// =============================================================================
// STYLES
// =============================================================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 28,
  },
  mainLayout: {
    width: '100%',
    maxWidth: 1360,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },

  // ---------------------------------------------------------------------------
  // LEFT COLUMN: SHOWCASE
  // ---------------------------------------------------------------------------
  leftSection: {
    justifyContent: 'flex-start',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  leafIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.lightMint,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
  },
  leafIcon: {
    fontSize: 22,
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitleText: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.darkGreen,
    letterSpacing: -0.4,
  },
  brandTitleHighlight: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.brightGreen,
    letterSpacing: -0.4,
  },
  brandTagline: {
    fontSize: 12,
    color: COLORS.bodyText,
    marginTop: 1,
  },
  pillBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.lightMint,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
    marginBottom: 16,
  },
  pillBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: COLORS.primaryGreen,
    letterSpacing: 0.8,
  },
  headlineBox: {
    marginBottom: 14,
  },
  headlineBlack: {
    fontSize: 38,
    fontWeight: '900',
    color: COLORS.darkGreen,
    lineHeight: 44,
    letterSpacing: -0.8,
  },
  headlineGreen: {
    fontSize: 38,
    fontWeight: '900',
    color: COLORS.brightGreen,
    lineHeight: 44,
    letterSpacing: -0.8,
  },
  leftSubtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: COLORS.bodyText,
    marginBottom: 24,
    maxWidth: 520,
  },
  featuresList: {
    gap: 14,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  featureIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.lightMint,
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIcon: {
    fontSize: 18,
  },
  featureTextBox: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  featureDesc: {
    fontSize: 12.5,
    color: COLORS.bodyText,
  },

  // Produce Image & Floating Analytics
  produceSceneContainer: {
    width: '100%',
    height: 240,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E8EFEA',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    shadowColor: COLORS.darkGreen,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  produceImage: {
    width: '100%',
    height: '100%',
  },
  produceOverlayFade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  floatingBadge: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  badgeForecastPos: {
    top: 16,
    right: 18,
  },
  badgeWastePos: {
    bottom: 20,
    left: 18,
  },
  badgeIconBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: COLORS.lightMint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    fontSize: 15,
  },
  badgeLabel: {
    fontSize: 10,
    color: COLORS.bodyText,
    fontWeight: '500',
  },
  badgeValueGreen: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.brightGreen,
  },
  badgeValueDark: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.darkGreen,
  },

  // Bottom 3-Metric Banner
  bottomMetricsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  metricItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metricIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.lightMint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricEmoji: {
    fontSize: 16,
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.darkGreen,
  },
  metricLabel: {
    fontSize: 11,
    color: COLORS.mutedText,
  },
  metricDivider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.border,
    marginHorizontal: 8,
  },

  // ---------------------------------------------------------------------------
  // RIGHT COLUMN: LOGIN CARD
  // ---------------------------------------------------------------------------
  rightSection: {
    justifyContent: 'center',
  },
  topRightNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  backHomeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#EBF3EE',
  },
  backHomeBtnText: {
    fontSize: 12.5,
    color: COLORS.primaryGreen,
    fontWeight: '700',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newToText: {
    fontSize: 13,
    color: COLORS.bodyText,
  },
  contactUsLink: {
    fontSize: 13,
    color: COLORS.primaryGreen,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  // Login Card Frame
  loginCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 32,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.darkGreen,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
  cardBrandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  cardLeafBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.lightMint,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
  },
  cardLeafIcon: {
    fontSize: 20,
  },
  cardBrandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBrandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.darkGreen,
    letterSpacing: -0.3,
  },
  cardBrandHighlight: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.brightGreen,
  },
  cardBrandTagline: {
    fontSize: 11,
    color: COLORS.bodyText,
    marginTop: 1,
  },
  welcomeBox: {
    marginBottom: 22,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.darkGreen,
    letterSpacing: -0.4,
  },
  welcomeSubtitle: {
    fontSize: 13,
    color: COLORS.bodyText,
    marginTop: 4,
  },

  // Form Fields
  formFields: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
  },
  inputIconBox: {
    marginRight: 10,
  },
  inputSymbol: {
    fontSize: 15,
    color: '#82948B',
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: COLORS.darkGreen,
  },
  eyeToggleBtn: {
    padding: 6,
  },
  eyeIcon: {
    fontSize: 15,
    color: '#82948B',
  },

  // Remember me & Forgot password
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -2,
    marginBottom: 4,
  },
  rememberMeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  customCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: COLORS.borderDark,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customCheckboxActive: {
    backgroundColor: COLORS.primaryGreen,
    borderColor: COLORS.primaryGreen,
  },
  checkmarkIcon: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  rememberMeLabel: {
    fontSize: 13,
    color: COLORS.darkGreen,
    fontWeight: '500',
  },
  forgotPasswordLink: {
    fontSize: 13,
    color: COLORS.primaryGreen,
    fontWeight: '600',
  },

  // Sign In CTA
  signInBtn: {
    backgroundColor: COLORS.primaryGreen,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primaryGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  signInBtnDisabled: {
    opacity: 0.7,
  },
  signInBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  // Or Continue With Divider
  orDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  orDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  orDividerText: {
    paddingHorizontal: 12,
    fontSize: 12,
    color: COLORS.mutedText,
  },

  // Social Stack
  socialStack: {
    gap: 10,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    gap: 10,
  },
  socialBtnText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#2A3630',
  },
  googleIconBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLetter: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  microsoftIconGrid: {
    width: 16,
    height: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msSquare: {
    width: 6.5,
    height: 6.5,
  },

  // Footer
  cardFooter: {
    alignItems: 'center',
    marginTop: 8,
  },
  noAccountText: {
    fontSize: 13,
    color: COLORS.bodyText,
  },
  signUpHighlight: {
    color: COLORS.primaryGreen,
    fontWeight: '700',
  },
});
