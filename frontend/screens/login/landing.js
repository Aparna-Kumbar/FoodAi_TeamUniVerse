import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  useWindowDimensions,
  Modal,
  Platform,
} from 'react-native';

const COLORS = {
  primaryGreen: '#087957',
  brightGreen: '#65C92E',
  darkGreen: '#103D2D',
  lightMint: '#E7F5EC',
  mintBorder: '#C8E6D3',
  background: '#FFFFFF',
  secondaryBg: '#F5F9F5',
  cardBg: '#FFFFFF',
  bodyText: '#587064',
  mutedText: '#82988E',
  border: '#E2EBE4',
  borderDark: '#C9D8CE',
  accentRed: '#E53935',
  accentRedBg: '#FFEBEE',
  accentOrange: '#FF9800',
  accentOrangeBg: '#FFF3E0',
  laptopDark: '#1E2922',
};

export default function LandingScreen({ navigation, onNavigate }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;
  const isMobile = width < 768;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalVisible, setDemoModalVisible] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  const handleNavigateToLogin = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('Login');
    } else if (onNavigate) {
      onNavigate('Login');
    }
  };

  const navLinks = ['Home', 'Features', 'Solutions', 'Pricing', 'About', 'Contact'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* =========================================================================
            HEADER / NAVIGATION
           ========================================================================= */}
        <View style={styles.headerContainer}>
          <View style={[styles.headerInner, { maxWidth: 1280 }]}>
            {/* Logo */}
            <TouchableOpacity
              style={styles.brandContainer}
              onPress={() => setActiveNav('Home')}
              activeOpacity={0.8}
            >
              <View style={styles.logoBadge}>
                <Text style={styles.logoIcon}>🍃</Text>
              </View>
              <View style={styles.brandTextGroup}>
                <Text style={styles.brandName}>FoodMind <Text style={styles.brandHighlight}>AI</Text></Text>
              </View>
            </TouchableOpacity>

            {/* Desktop Navigation Links */}
            {!isMobile && (
              <View style={styles.navLinksRow}>
                {navLinks.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[styles.navLinkItem, activeNav === item && styles.navLinkItemActive]}
                    onPress={() => setActiveNav(item)}
                  >
                    <Text
                      style={[
                        styles.navLinkText,
                        activeNav === item && styles.navLinkTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                    {activeNav === item && <View style={styles.activeIndicatorDot} />}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Header Right Actions */}
            {!isMobile ? (
              <View style={styles.headerActions}>
                <TouchableOpacity
                  style={styles.loginOutlineBtn}
                  onPress={handleNavigateToLogin}
                  activeOpacity={0.8}
                >
                  <Text style={styles.loginOutlineBtnText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.getStartedPrimaryBtn}
                  onPress={handleNavigateToLogin}
                  activeOpacity={0.85}
                >
                  <Text style={styles.getStartedPrimaryBtnText}>Get Started →</Text>
                </TouchableOpacity>
              </View>
            ) : (
              /* Mobile Hamburger Button */
              <TouchableOpacity
                style={styles.hamburgerBtn}
                onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
                activeOpacity={0.7}
              >
                <Text style={styles.hamburgerIcon}>{mobileMenuOpen ? '✕' : '☰'}</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Mobile Menu Dropdown */}
          {isMobile && mobileMenuOpen && (
            <View style={styles.mobileDropdown}>
              {navLinks.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.mobileDropdownItem}
                  onPress={() => {
                    setActiveNav(item);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.mobileDropdownText,
                      activeNav === item && styles.mobileDropdownTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
              <View style={styles.mobileDropdownDivider} />
              <TouchableOpacity
                style={styles.mobileLoginBtn}
                onPress={() => {
                  setMobileMenuOpen(false);
                  handleNavigateToLogin();
                }}
              >
                <Text style={styles.mobileLoginBtnText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mobileGetStartedBtn}
                onPress={() => {
                  setMobileMenuOpen(false);
                  handleNavigateToLogin();
                }}
              >
                <Text style={styles.mobileGetStartedBtnText}>Get Started →</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* =========================================================================
            HERO SECTION
           ========================================================================= */}
        <View style={styles.heroSectionWrapper}>
          <View
            style={[
              styles.heroContainer,
              {
                flexDirection: isDesktop ? 'row' : 'column',
                maxWidth: 1280,
              },
            ]}
          >
            {/* ----------------- LEFT COLUMN: HEADLINE & CTAS ----------------- */}
            <View
              style={[
                styles.heroLeftCol,
                {
                  width: isDesktop ? '48%' : '100%',
                  paddingRight: isDesktop ? 32 : 0,
                  marginBottom: isDesktop ? 0 : 36,
                },
              ]}
            >
              {/* Badge */}
              <View style={styles.heroPillBadge}>
                <View style={styles.pillGreenDot} />
                <Text style={styles.heroPillText}>AI-Powered Supermarket Intelligence</Text>
              </View>

              {/* Main Headline */}
              <View style={styles.headlineWrapper}>
                <Text style={styles.headlineDark}>Smarter Groceries.</Text>
                <Text style={styles.headlineDark}>Less Waste.</Text>
                <Text style={styles.headlineBright}>Higher Profits.</Text>
              </View>

              {/* Supporting Text */}
              <Text style={styles.heroSubtitle}>
                FoodMind AI helps supermarket chains and grocery companies predict demand,
                prevent food waste, optimize inventory, and make smarter decisions with the
                power of AI.
              </Text>

              {/* CTA Buttons */}
              <View style={styles.heroCtaGroup}>
                <TouchableOpacity
                  style={styles.heroPrimaryCta}
                  onPress={handleNavigateToLogin}
                  activeOpacity={0.85}
                >
                  <Text style={styles.heroPrimaryCtaText}>Get Started →</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.heroSecondaryCta}
                  onPress={() => setDemoModalVisible(true)}
                  activeOpacity={0.8}
                >
                  <View style={styles.playIconCircle}>
                    <Text style={styles.playIconText}>▶</Text>
                  </View>
                  <Text style={styles.heroSecondaryCtaText}>Watch Demo</Text>
                </TouchableOpacity>
              </View>

              {/* Social Proof / Metric Bar */}
              <View style={styles.heroTrustBar}>
                <View style={styles.trustAvatarsRow}>
                  <View style={[styles.avatarCircle, { backgroundColor: '#C8E6D3' }]}>
                    <Text style={styles.avatarEmoji}>🥦</Text>
                  </View>
                  <View style={[styles.avatarCircle, { backgroundColor: '#FFE0B2', marginLeft: -10 }]}>
                    <Text style={styles.avatarEmoji}>🍎</Text>
                  </View>
                  <View style={[styles.avatarCircle, { backgroundColor: '#E1BEE7', marginLeft: -10 }]}>
                    <Text style={styles.avatarEmoji}>🥑</Text>
                  </View>
                </View>
                <View style={styles.trustTextWrapper}>
                  <Text style={styles.trustTitle}>Trusted by 140+ Grocery Chains</Text>
                  <Text style={styles.trustSubtitle}>Over 1.2M daily produce items monitored</Text>
                </View>
              </View>
            </View>

            {/* ----------------- RIGHT COLUMN: VISUAL + DASHBOARD CARDS ----------------- */}
            <View
              style={[
                styles.heroRightCol,
                {
                  width: isDesktop ? '52%' : '100%',
                },
              ]}
            >
              {/* Background Supermarket Image Container */}
              <View style={styles.supermarketVisualFrame}>
                <Image
                  source={require('../../../assets/supermarket-hero.jpg')}
                  style={styles.supermarketImg}
                  resizeMode="cover"
                />
                {/* Soft gradient mask overlay on left for text readability */}
                <View style={styles.imageSoftFadeOverlay} />

                {/* Floating Analytics Card 1: Demand Forecast */}
                <View style={[styles.floatingCard, styles.demandCardPos]}>
                  <View style={styles.floatingCardHeader}>
                    <View>
                      <Text style={styles.floatingCardTitle}>Demand Forecast</Text>
                      <Text style={styles.floatingCardSubtitle}>Next 7 Days</Text>
                    </View>
                    <View style={styles.greenGrowthBadge}>
                      <Text style={styles.greenGrowthBadgeText}>↗ +18%</Text>
                    </View>
                  </View>

                  {/* Line Chart Simulation */}
                  <View style={styles.chartAreaWrapper}>
                    <View style={styles.sparklineContainer}>
                      <View style={[styles.sparklineBar, { height: 24 }]} />
                      <View style={[styles.sparklineBar, { height: 32 }]} />
                      <View style={[styles.sparklineBar, { height: 28 }]} />
                      <View style={[styles.sparklineBar, { height: 42 }]} />
                      <View style={[styles.sparklineBar, { height: 38 }]} />
                      <View style={[styles.sparklineBar, { height: 50, backgroundColor: COLORS.brightGreen }]} />
                      <View style={[styles.sparklineBar, { height: 46 }]} />
                    </View>
                    <View style={styles.chartDaysRow}>
                      <Text style={styles.chartDayLabel}>M</Text>
                      <Text style={styles.chartDayLabel}>T</Text>
                      <Text style={styles.chartDayLabel}>W</Text>
                      <Text style={styles.chartDayLabel}>T</Text>
                      <Text style={styles.chartDayLabel}>F</Text>
                      <Text style={[styles.chartDayLabel, { color: COLORS.primaryGreen, fontWeight: '700' }]}>S</Text>
                      <Text style={styles.chartDayLabel}>S</Text>
                    </View>
                  </View>
                </View>

                {/* Floating Analytics Card 2: Expiry Risk */}
                <View style={[styles.floatingCard, styles.expiryCardPos]}>
                  <View style={styles.expiryCardRow}>
                    <View style={styles.expiryDonut}>
                      <View style={styles.expiryDonutInner}>
                        <Text style={styles.expiryNumber}>18</Text>
                      </View>
                    </View>
                    <View style={styles.expiryTextWrap}>
                      <Text style={styles.expiryHeading}>Expiry Risk</Text>
                      <Text style={styles.expiryDetail}>18 At Risk Items</Text>
                      <Text style={styles.expirySub}>Fresh greens & bakery</Text>
                    </View>
                  </View>
                </View>

                {/* Floating Analytics Card 3: Food Waste Reduction */}
                <View style={[styles.floatingCard, styles.wasteCardPos]}>
                  <View style={styles.wasteCardRow}>
                    <View style={styles.wasteLeafCircle}>
                      <Text style={styles.wasteLeafIcon}>🍃</Text>
                    </View>
                    <View>
                      <Text style={styles.wasteHeading}>Reduce Food Waste</Text>
                      <Text style={styles.wasteStatHighlight}>-32% vs last month</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* ----------------- LAYERED DEVICE MOCKUPS ----------------- */}
              <View style={styles.deviceMockupsContainer}>
                {/* 1. LAPTOP MOCKUP */}
                <View style={styles.laptopFrame}>
                  {/* Laptop Top Bezel & Camera */}
                  <View style={styles.laptopBezel}>
                    <View style={styles.windowControls}>
                      <View style={[styles.windowDot, { backgroundColor: '#FF5F56' }]} />
                      <View style={[styles.windowDot, { backgroundColor: '#FFBD2E' }]} />
                      <View style={[styles.windowDot, { backgroundColor: '#27C93F' }]} />
                    </View>
                    <View style={styles.cameraDot} />
                    <Text style={styles.laptopTitleBar}>FoodMind AI • Central Dashboard</Text>
                  </View>

                  {/* Laptop Screen Body */}
                  <View style={styles.laptopScreenContent}>
                    {/* Mock Sidebar */}
                    <View style={styles.mockSidebar}>
                      <View style={styles.sidebarBrand}>
                        <Text style={styles.sidebarLogoIcon}>🍃</Text>
                      </View>
                      <View style={[styles.sidebarNavPill, styles.sidebarNavPillActive]} />
                      <View style={styles.sidebarNavPill} />
                      <View style={styles.sidebarNavPill} />
                      <View style={styles.sidebarNavPill} />
                    </View>

                    {/* Mock Dashboard Body */}
                    <View style={styles.mockDashboardMain}>
                      {/* Top bar */}
                      <View style={styles.mockDashboardTopRow}>
                        <View>
                          <Text style={styles.dashboardCompanyHeading}>Company Dashboard</Text>
                          <Text style={styles.dashboardBranchSub}>All 14 Regional Branches</Text>
                        </View>
                        <View style={styles.liveIndicatorBadge}>
                          <View style={styles.liveDot} />
                          <Text style={styles.liveText}>Live AI Sync</Text>
                        </View>
                      </View>

                      {/* 4 Mini KPI Cards */}
                      <View style={styles.mockKpiGrid}>
                        <View style={styles.mockKpiCard}>
                          <Text style={styles.mockKpiLabel}>Total Branches</Text>
                          <Text style={styles.mockKpiValue}>14 Stores</Text>
                        </View>
                        <View style={styles.mockKpiCard}>
                          <Text style={styles.mockKpiLabel}>Total Sales</Text>
                          <Text style={styles.mockKpiValue}>$284.5K</Text>
                          <Text style={styles.mockKpiTrendGreen}>+12.4%</Text>
                        </View>
                        <View style={styles.mockKpiCard}>
                          <Text style={styles.mockKpiLabel}>Inventory Units</Text>
                          <Text style={styles.mockKpiValue}>42,890</Text>
                        </View>
                        <View style={styles.mockKpiCard}>
                          <Text style={styles.mockKpiLabel}>Food Waste</Text>
                          <Text style={styles.mockKpiValue}>2.1%</Text>
                          <Text style={styles.mockKpiTrendGreen}>-32%</Text>
                        </View>
                      </View>

                      {/* Charts Row */}
                      <View style={styles.mockChartsRow}>
                        {/* Sales Overview Bar Chart */}
                        <View style={styles.mockBarChartBox}>
                          <Text style={styles.chartTitleSmall}>Sales Overview</Text>
                          <View style={styles.miniBarsContainer}>
                            <View style={[styles.miniBar, { height: 18 }]} />
                            <View style={[styles.miniBar, { height: 26 }]} />
                            <View style={[styles.miniBar, { height: 22 }]} />
                            <View style={[styles.miniBar, { height: 34 }]} />
                            <View style={[styles.miniBar, { height: 42, backgroundColor: COLORS.brightGreen }]} />
                            <View style={[styles.miniBar, { height: 38 }]} />
                            <View style={[styles.miniBar, { height: 45, backgroundColor: COLORS.primaryGreen }]} />
                          </View>
                        </View>

                        {/* Inventory Status Donut */}
                        <View style={styles.mockDonutBox}>
                          <Text style={styles.chartTitleSmall}>Inventory Status</Text>
                          <View style={styles.donutMockRow}>
                            <View style={styles.donutVisualRing}>
                              <View style={styles.donutInnerHole} />
                            </View>
                            <View style={styles.donutLegend}>
                              <Text style={styles.legendFresh}>● Fresh (72%)</Text>
                              <Text style={styles.legendApproaching}>● Approaching (21%)</Text>
                              <Text style={styles.legendRisk}>● At Risk (7%)</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Laptop Base Stand */}
                  <View style={styles.laptopBaseBar} />
                </View>

                {/* 2. SMARTPHONE MOCKUP */}
                <View style={styles.phoneMockupFrame}>
                  {/* Phone Notch */}
                  <View style={styles.phoneNotch} />

                  {/* Phone Screen */}
                  <View style={styles.phoneScreenContent}>
                    {/* Header */}
                    <View style={styles.phoneHeader}>
                      <Text style={styles.phoneBrandText}>FoodMind AI</Text>
                      <View style={styles.phoneStatusDot} />
                    </View>

                    {/* Today's Sales Card */}
                    <View style={styles.phoneSalesCard}>
                      <Text style={styles.phoneSalesLabel}>Today's Sales</Text>
                      <Text style={styles.phoneSalesValue}>$12,480</Text>
                      <Text style={styles.phoneSalesTrend}>+14% vs yesterday</Text>
                    </View>

                    {/* Alerts Row */}
                    <View style={styles.phoneAlertsRow}>
                      <View style={styles.phoneAlertBadgeRed}>
                        <Text style={styles.phoneAlertTextRed}>⚠️ 18 At Risk</Text>
                      </View>
                      <View style={styles.phoneAlertBadgeYellow}>
                        <Text style={styles.phoneAlertTextYellow}>⚡ 5 Low Stock</Text>
                      </View>
                    </View>

                    {/* Demand Forecast Sparkline */}
                    <View style={styles.phoneForecastBox}>
                      <Text style={styles.phoneForecastTitle}>Demand Forecast</Text>
                      <View style={styles.phoneSparklineContainer}>
                        <View style={[styles.phoneBar, { height: 12 }]} />
                        <View style={[styles.phoneBar, { height: 18 }]} />
                        <View style={[styles.phoneBar, { height: 15 }]} />
                        <View style={[styles.phoneBar, { height: 24, backgroundColor: COLORS.brightGreen }]} />
                        <View style={[styles.phoneBar, { height: 28, backgroundColor: COLORS.primaryGreen }]} />
                      </View>
                    </View>

                    {/* View Details Button */}
                    <TouchableOpacity
                      style={styles.phoneViewBtn}
                      onPress={handleNavigateToLogin}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.phoneViewBtnText}>View Details →</Text>
                    </TouchableOpacity>

                    {/* Bottom Nav Bar */}
                    <View style={styles.phoneBottomNav}>
                      <Text style={styles.phoneNavIconActive}>🏠</Text>
                      <Text style={styles.phoneNavIcon}>📊</Text>
                      <Text style={styles.phoneNavIcon}>🔔</Text>
                      <Text style={styles.phoneNavIcon}>👤</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* =========================================================================
            BOTTOM FEATURE STRIP
           ========================================================================= */}
        <View style={styles.featureStripWrapper}>
          <View style={[styles.featureStripContainer, { maxWidth: 1280 }]}>
            {/* Item 1 */}
            <View style={styles.featureItemBox}>
              <View style={styles.featureIconBubble}>
                <Text style={styles.featureEmoji}>📈</Text>
              </View>
              <Text style={styles.featureTitle}>Predict Demand</Text>
              <Text style={styles.featureDesc}>
                Accurate AI forecasts based on real sales data.
              </Text>
            </View>

            <View style={styles.featureDivider} />

            {/* Item 2 */}
            <View style={styles.featureItemBox}>
              <View style={styles.featureIconBubble}>
                <Text style={styles.featureEmoji}>🛡️</Text>
              </View>
              <Text style={styles.featureTitle}>Prevent Food Waste</Text>
              <Text style={styles.featureDesc}>
                Identify at-risk products before they expire.
              </Text>
            </View>

            <View style={styles.featureDivider} />

            {/* Item 3 */}
            <View style={styles.featureItemBox}>
              <View style={styles.featureIconBubble}>
                <Text style={styles.featureEmoji}>📦</Text>
              </View>
              <Text style={styles.featureTitle}>Optimize Inventory</Text>
              <Text style={styles.featureDesc}>
                Right stock, right time, right quantity.
              </Text>
            </View>

            <View style={styles.featureDivider} />

            {/* Item 4 */}
            <View style={styles.featureItemBox}>
              <View style={styles.featureIconBubble}>
                <Text style={styles.featureEmoji}>🏬</Text>
              </View>
              <Text style={styles.featureTitle}>Manage Multiple Branches</Text>
              <Text style={styles.featureDesc}>
                Get a complete view across all your stores.
              </Text>
            </View>

            <View style={styles.featureDivider} />

            {/* Item 5 */}
            <View style={styles.featureItemBox}>
              <View style={styles.featureIconBubble}>
                <Text style={styles.featureEmoji}>💡</Text>
              </View>
              <Text style={styles.featureTitle}>Make Smarter Decisions</Text>
              <Text style={styles.featureDesc}>
                Turn data into real business growth.
              </Text>
            </View>
          </View>
        </View>

        {/* Footer info note */}
        <View style={styles.pageFooter}>
          <Text style={styles.pageFooterText}>
            © {new Date().getFullYear()} FoodMind AI Inc. All rights reserved. • Illustrative enterprise design data.
          </Text>
        </View>
      </ScrollView>

      {/* =========================================================================
          INTERACTIVE DEMO MODAL
         ========================================================================= */}
      <Modal
        visible={demoModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDemoModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleGroup}>
                <Text style={styles.modalBadgeText}>LIVE DEMO</Text>
                <Text style={styles.modalTitle}>FoodMind AI Supermarket Engine</Text>
              </View>
              <TouchableOpacity
                onPress={() => setDemoModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <Text style={styles.modalCloseBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Simulated Video / Demo Player */}
            <View style={styles.demoScreenBox}>
              <View style={styles.demoScreenHeader}>
                <View style={styles.demoLivePulse} />
                <Text style={styles.demoLiveText}>Simulated Produce Shelf Scanner • Active</Text>
              </View>

              <View style={styles.demoMetricsRow}>
                <View style={styles.demoMetricCard}>
                  <Text style={styles.demoMetricLabel}>Forecast Accuracy</Text>
                  <Text style={styles.demoMetricValue}>99.4%</Text>
                </View>
                <View style={styles.demoMetricCard}>
                  <Text style={styles.demoMetricLabel}>Spoilage Prevented</Text>
                  <Text style={styles.demoMetricValue}>-$4,850/wk</Text>
                </View>
                <View style={styles.demoMetricCard}>
                  <Text style={styles.demoMetricLabel}>Restock Speed</Text>
                  <Text style={styles.demoMetricValue}>+3.4x</Text>
                </View>
              </View>

              <View style={styles.demoTerminalBox}>
                <Text style={styles.demoTerminalLine}>[AI-ENGINE] Connected to Central Grocery Store #14...</Text>
                <Text style={styles.demoTerminalLine}>[SCAN] 48 Organic Vegetables evaluated for peak freshness</Text>
                <Text style={styles.demoTerminalHighlight}>[ALERT] 18 SKUs flagged for immediate dynamic price discount</Text>
                <Text style={styles.demoTerminalLine}>[OPTIMIZE] Automatic re-order sent to supplier for Tuesday morning</Text>
              </View>
            </View>

            {/* Modal Actions */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalBookDemoBtn}
                onPress={() => {
                  setDemoModalVisible(false);
                  handleNavigateToLogin();
                }}
              >
                <Text style={styles.modalBookDemoBtnText}>Start Free Trial →</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalDismissBtn}
                onPress={() => setDemoModalVisible(false)}
              >
                <Text style={styles.modalDismissBtnText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// =============================================================================
// STYLESHEET
// =============================================================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Header / Navigation
  headerContainer: {
    width: '100%',
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    zIndex: 100,
    ...Platform.select({
      web: {
        position: 'sticky',
        top: 0,
      },
    }),
  },
  headerInner: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.lightMint,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
  },
  logoIcon: {
    fontSize: 20,
  },
  brandTextGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.darkGreen,
    letterSpacing: -0.3,
  },
  brandHighlight: {
    color: COLORS.brightGreen,
  },
  navLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  navLinkItem: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    position: 'relative',
  },
  navLinkItemActive: {},
  navLinkText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.bodyText,
  },
  navLinkTextActive: {
    color: COLORS.primaryGreen,
    fontWeight: '700',
  },
  activeIndicatorDot: {
    position: 'absolute',
    bottom: -2,
    left: '40%',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primaryGreen,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loginOutlineBtn: {
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.borderDark,
    backgroundColor: 'transparent',
  },
  loginOutlineBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGreen,
  },
  getStartedPrimaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: COLORS.primaryGreen,
    shadowColor: COLORS.primaryGreen,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  getStartedPrimaryBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  hamburgerBtn: {
    padding: 8,
  },
  hamburgerIcon: {
    fontSize: 24,
    color: COLORS.darkGreen,
  },
  mobileDropdown: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  mobileDropdownItem: {
    paddingVertical: 8,
  },
  mobileDropdownText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.bodyText,
  },
  mobileDropdownTextActive: {
    color: COLORS.primaryGreen,
    fontWeight: '700',
  },
  mobileDropdownDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  mobileLoginBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  mobileLoginBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.darkGreen,
  },
  mobileGetStartedBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.primaryGreen,
  },
  mobileGetStartedBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Hero Section
  heroSectionWrapper: {
    width: '100%',
    backgroundColor: COLORS.background,
    paddingTop: 36,
    paddingBottom: 48,
    overflow: 'hidden',
  },
  heroContainer: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  heroLeftCol: {
    justifyContent: 'center',
  },
  heroPillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.lightMint,
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 20,
    gap: 8,
  },
  pillGreenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.brightGreen,
  },
  heroPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primaryGreen,
    letterSpacing: 0.2,
  },
  headlineWrapper: {
    marginBottom: 18,
  },
  headlineDark: {
    fontSize: 44,
    fontWeight: '900',
    color: COLORS.darkGreen,
    lineHeight: 52,
    letterSpacing: -1,
  },
  headlineBright: {
    fontSize: 44,
    fontWeight: '900',
    color: COLORS.brightGreen,
    lineHeight: 52,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 17,
    lineHeight: 26,
    color: COLORS.bodyText,
    marginBottom: 32,
    maxWidth: 540,
  },
  heroCtaGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 36,
  },
  heroPrimaryCta: {
    paddingVertical: 15,
    paddingHorizontal: 28,
    borderRadius: 30,
    backgroundColor: COLORS.primaryGreen,
    shadowColor: COLORS.primaryGreen,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  heroPrimaryCtaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  heroSecondaryCta: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: 30,
    backgroundColor: COLORS.lightMint,
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
    gap: 10,
  },
  playIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primaryGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIconText: {
    fontSize: 10,
    color: '#FFFFFF',
    marginLeft: 2,
  },
  heroSecondaryCtaText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.darkGreen,
  },
  heroTrustBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  trustAvatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarEmoji: {
    fontSize: 15,
  },
  trustTextWrapper: {
    flex: 1,
  },
  trustTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  trustSubtitle: {
    fontSize: 12,
    color: COLORS.mutedText,
  },

  // Hero Right Column: Supermarket visual + layered cards
  heroRightCol: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supermarketVisualFrame: {
    width: '100%',
    height: 380,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: COLORS.secondaryBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.darkGreen,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
  },
  supermarketImg: {
    width: '100%',
    height: '100%',
  },
  imageSoftFadeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },

  // Floating Analytics Cards
  floatingCard: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 10,
  },
  demandCardPos: {
    top: 16,
    left: 16,
    width: 190,
  },
  floatingCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  floatingCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  floatingCardSubtitle: {
    fontSize: 10,
    color: COLORS.mutedText,
  },
  greenGrowthBadge: {
    backgroundColor: COLORS.lightMint,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
  },
  greenGrowthBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primaryGreen,
  },
  chartAreaWrapper: {
    gap: 4,
  },
  sparklineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 52,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sparklineBar: {
    width: 14,
    backgroundColor: '#A8D5BA',
    borderRadius: 3,
  },
  chartDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  chartDayLabel: {
    fontSize: 9,
    color: COLORS.mutedText,
  },

  // Expiry Card
  expiryCardPos: {
    top: 24,
    right: 16,
    width: 175,
  },
  expiryCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  expiryDonut: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 5,
    borderColor: COLORS.brightGreen,
    borderTopColor: COLORS.accentRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expiryDonutInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  expiryNumber: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.darkGreen,
  },
  expiryTextWrap: {
    flex: 1,
  },
  expiryHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  expiryDetail: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.accentRed,
  },
  expirySub: {
    fontSize: 9,
    color: COLORS.mutedText,
  },

  // Waste Reduction Card
  wasteCardPos: {
    bottom: 16,
    left: 20,
    width: 195,
  },
  wasteCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wasteLeafCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.lightMint,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
  },
  wasteLeafIcon: {
    fontSize: 16,
  },
  wasteHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  wasteStatHighlight: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primaryGreen,
  },

  // Layered Device Mockups
  deviceMockupsContainer: {
    width: '100%',
    marginTop: -40,
    position: 'relative',
    alignItems: 'center',
  },
  laptopFrame: {
    width: '92%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.borderDark,
    shadowColor: COLORS.darkGreen,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 8,
    overflow: 'hidden',
  },
  laptopBezel: {
    height: 28,
    backgroundColor: '#F3F6F4',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  windowControls: {
    flexDirection: 'row',
    gap: 6,
  },
  windowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  cameraDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#A0AFA6',
  },
  laptopTitleBar: {
    fontSize: 10,
    color: COLORS.mutedText,
    fontWeight: '500',
  },
  laptopScreenContent: {
    flexDirection: 'row',
    minHeight: 180,
    backgroundColor: '#FAFBF9',
  },
  mockSidebar: {
    width: 44,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    alignItems: 'center',
    paddingVertical: 12,
    gap: 10,
  },
  sidebarBrand: {
    marginBottom: 4,
  },
  sidebarLogoIcon: {
    fontSize: 14,
  },
  sidebarNavPill: {
    width: 22,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DFE8E2',
  },
  sidebarNavPillActive: {
    backgroundColor: COLORS.primaryGreen,
  },
  mockDashboardMain: {
    flex: 1,
    padding: 12,
    gap: 10,
  },
  mockDashboardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dashboardCompanyHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.darkGreen,
  },
  dashboardBranchSub: {
    fontSize: 9,
    color: COLORS.mutedText,
  },
  liveIndicatorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightMint,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.brightGreen,
  },
  liveText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.primaryGreen,
  },
  mockKpiGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  mockKpiCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mockKpiLabel: {
    fontSize: 8,
    color: COLORS.mutedText,
    marginBottom: 2,
  },
  mockKpiValue: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.darkGreen,
  },
  mockKpiTrendGreen: {
    fontSize: 8,
    fontWeight: '700',
    color: COLORS.primaryGreen,
    marginTop: 1,
  },
  mockChartsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  mockBarChartBox: {
    flex: 1.2,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chartTitleSmall: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.darkGreen,
    marginBottom: 6,
  },
  miniBarsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 48,
  },
  miniBar: {
    width: 10,
    backgroundColor: '#C5DEC9',
    borderRadius: 2,
  },
  mockDonutBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  donutMockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  donutVisualRing: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 5,
    borderColor: COLORS.primaryGreen,
    borderRightColor: COLORS.brightGreen,
    borderBottomColor: COLORS.accentOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutInnerHole: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  donutLegend: {
    gap: 2,
  },
  legendFresh: {
    fontSize: 7.5,
    color: COLORS.primaryGreen,
    fontWeight: '600',
  },
  legendApproaching: {
    fontSize: 7.5,
    color: COLORS.accentOrange,
    fontWeight: '600',
  },
  legendRisk: {
    fontSize: 7.5,
    color: COLORS.accentRed,
    fontWeight: '600',
  },
  laptopBaseBar: {
    height: 8,
    backgroundColor: '#DDE5DF',
    borderTopWidth: 1,
    borderTopColor: '#C4D3C8',
  },

  // Phone Mockup (Layered Over Laptop on lower right)
  phoneMockupFrame: {
    position: 'absolute',
    right: 4,
    bottom: -16,
    width: 155,
    backgroundColor: '#0F1A15',
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#26392F',
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  phoneNotch: {
    width: 44,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#000000',
    alignSelf: 'center',
    marginBottom: 4,
  },
  phoneScreenContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    gap: 6,
  },
  phoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phoneBrandText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.darkGreen,
  },
  phoneStatusDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.brightGreen,
  },
  phoneSalesCard: {
    backgroundColor: COLORS.secondaryBg,
    borderRadius: 6,
    padding: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  phoneSalesLabel: {
    fontSize: 7,
    color: COLORS.mutedText,
  },
  phoneSalesValue: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.darkGreen,
  },
  phoneSalesTrend: {
    fontSize: 7,
    color: COLORS.primaryGreen,
    fontWeight: '700',
  },
  phoneAlertsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  phoneAlertBadgeRed: {
    flex: 1,
    backgroundColor: COLORS.accentRedBg,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    alignItems: 'center',
  },
  phoneAlertTextRed: {
    fontSize: 6.5,
    fontWeight: '700',
    color: COLORS.accentRed,
  },
  phoneAlertBadgeYellow: {
    flex: 1,
    backgroundColor: COLORS.accentOrangeBg,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    alignItems: 'center',
  },
  phoneAlertTextYellow: {
    fontSize: 6.5,
    fontWeight: '700',
    color: COLORS.accentOrange,
  },
  phoneForecastBox: {
    backgroundColor: '#FAFBF9',
    borderRadius: 6,
    padding: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  phoneForecastTitle: {
    fontSize: 7,
    fontWeight: '700',
    color: COLORS.darkGreen,
    marginBottom: 2,
  },
  phoneSparklineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 28,
  },
  phoneBar: {
    width: 6,
    backgroundColor: '#A8D5BA',
    borderRadius: 1.5,
  },
  phoneViewBtn: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 5,
    paddingVertical: 4,
    alignItems: 'center',
  },
  phoneViewBtnText: {
    fontSize: 7.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  phoneBottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 3,
  },
  phoneNavIcon: {
    fontSize: 9,
    opacity: 0.5,
  },
  phoneNavIconActive: {
    fontSize: 9,
  },

  // Bottom Feature Strip
  featureStripWrapper: {
    width: '100%',
    backgroundColor: COLORS.secondaryBg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 36,
  },
  featureStripContainer: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItemBox: {
    flex: 1,
    minWidth: 180,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  featureIconBubble: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.lightMint,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
    marginBottom: 14,
  },
  featureEmoji: {
    fontSize: 22,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.darkGreen,
    marginBottom: 6,
  },
  featureDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.bodyText,
  },
  featureDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    alignSelf: 'stretch',
    marginVertical: 12,
  },

  // Footer Note
  pageFooter: {
    width: '100%',
    paddingVertical: 24,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  pageFooterText: {
    fontSize: 12,
    color: COLORS.mutedText,
  },

  // Interactive Demo Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(16, 61, 45, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 580,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  modalTitleGroup: {
    gap: 4,
  },
  modalBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.brightGreen,
    letterSpacing: 0.8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.darkGreen,
  },
  modalCloseBtn: {
    padding: 6,
  },
  modalCloseBtnText: {
    fontSize: 18,
    color: COLORS.mutedText,
    fontWeight: '700',
  },
  demoScreenBox: {
    backgroundColor: '#111D17',
    borderRadius: 14,
    padding: 16,
    gap: 14,
  },
  demoScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  demoLivePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.brightGreen,
  },
  demoLiveText: {
    fontSize: 11,
    color: '#A0B9AC',
    fontWeight: '600',
  },
  demoMetricsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  demoMetricCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 8,
    padding: 8,
  },
  demoMetricLabel: {
    fontSize: 9,
    color: '#8CA799',
    marginBottom: 2,
  },
  demoMetricValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  demoTerminalBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 8,
    padding: 10,
    gap: 4,
  },
  demoTerminalLine: {
    fontSize: 10.5,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#A8C3B4',
  },
  demoTerminalHighlight: {
    fontSize: 10.5,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#65C92E',
    fontWeight: '700',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 20,
  },
  modalDismissBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalDismissBtnText: {
    fontSize: 14,
    color: COLORS.bodyText,
    fontWeight: '600',
  },
  modalBookDemoBtn: {
    backgroundColor: COLORS.primaryGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalBookDemoBtnText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
