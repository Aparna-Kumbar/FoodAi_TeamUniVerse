import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  useWindowDimensions,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import BranchesScreen from './BranchesScreen';

const COLORS = {
  pageBg: '#F3F6F4',
  cardBg: '#FFFFFF',
  border: '#E3EBE6',
  sidebarBg: '#092117',
  sidebarActivePill: '#134730',
  sidebarHover: '#0D2F21',
  primaryGreen: '#168A4E',
  brightGreen: '#16A34A',
  darkGreen: '#14261C',
  mintBadgeBg: '#E9F7EE',
  mintBadgeBorder: '#D0ECDA',
  bodyText: '#556D60',
  mutedText: '#829A8D',
  accentOrange: '#F59E0B',
  accentOrangeBg: '#FEF3C7',
  accentRed: '#EF4444',
  accentRedBg: '#FEE2E2',
  accentTeal: '#0D9488',
  accentTealBg: '#CCFBF1',
  accentBlue: '#3B82F6',
  accentBlueBg: '#DBEAFE',
  accentPurple: '#8B5CF6',
  accentPurpleBg: '#EDE9FE',
  mapLand: '#E2EFE7',
  mapWater: '#D5E6FA',
};

const SIDEBAR_ITEMS = [
  { name: 'Company Dashboard', icon: '🏬' },
  { name: 'Branches', icon: '🏢' },
  { name: 'Demand Forecast', icon: '📈' },
  { name: 'Inventory & Stock', icon: '📦' },
  { name: 'Stock Transfers', icon: '⇄' },
  { name: 'Procurement', icon: '🛒' },
  { name: 'Suppliers', icon: '👥' },
  { name: 'Waste Analytics', icon: '🗑️' },
  { name: 'Reports', icon: '📄' },
  { name: 'Settings', icon: '⚙️' },
];

export default function CompanyDashboardScreen({ navigation, onNavigate }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1180;
  const isMobile = width < 768;

  // Active view states
  const [activeSidebarNav, setActiveSidebarNav] = useState('Company Dashboard');
  const [activeDashboardMode, setActiveDashboardMode] = useState('Company'); // 'Company' | 'Shop'
  const [productTab, setProductTab] = useState('By Sales');
  const [heatmapZoom, setHeatmapZoom] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global Header Modals
  const [selectedDateRange, setSelectedDateRange] = useState('Apr 28, 2025 - May 4, 2025');
  const [dateRangeModalOpen, setDateRangeModalOpen] = useState(false);
  const [notificationsModalOpen, setNotificationsModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Generic Action Modal
  const [actionModal, setActionModal] = useState({
    visible: false,
    title: '',
    subtitle: '',
    details: '',
    actionBtnText: '',
    onAction: null,
  });

  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleBackToHome = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('Landing');
    } else if (onNavigate) {
      onNavigate('Landing');
    }
  };

  const handleLogout = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('Login');
    } else if (onNavigate) {
      onNavigate('Login');
    }
  };

  const openActionModal = (title, subtitle, details, actionBtnText, onAction) => {
    setActionModal({
      visible: true,
      title,
      subtitle,
      details,
      actionBtnText,
      onAction,
    });
  };

  const closeActionModal = () => {
    setActionModal({
      visible: false,
      title: '',
      subtitle: '',
      details: '',
      actionBtnText: '',
      onAction: null,
    });
  };

  // Branch comparison dataset matching image
  const branchComparisonData = [
    { branch: 'Pune', sales: '12,40,000', invValue: '8,20,000', waste: '320', wastePct: '2.6%', perf: 'High' },
    { branch: 'Mumbai', sales: '11,80,000', invValue: '7,60,000', waste: '280', wastePct: '2.3%', perf: 'High' },
    { branch: 'Nashik', sales: '8,50,000', invValue: '5,40,000', waste: '220', wastePct: '2.9%', perf: 'Moderate' },
    { branch: 'Nagpur', sales: '7,20,000', invValue: '4,80,000', waste: '260', wastePct: '3.6%', perf: 'Moderate' },
    { branch: 'Kolhapur', sales: '5,40,000', invValue: '3,20,000', waste: '160', wastePct: '2.1%', perf: 'Good' },
  ];

  // Top products dataset matching image
  const topProductsData = [
    { id: 1, icon: '🍅', name: 'Tomatoes', demand: '5,200', change: '↑ 18%' },
    { id: 2, icon: '🥛', name: 'Milk', demand: '4,650', change: '↑ 12%' },
    { id: 3, icon: '🍚', name: 'Rice', demand: '4,120', change: '↑ 8%' },
    { id: 4, icon: '🍌', name: 'Bananas', demand: '3,980', change: '↑ 6%' },
    { id: 5, icon: '🍞', name: 'Bread', demand: '3,760', change: '↑ 5%' },
  ];

  // AI recommendations dataset matching image
  const aiRecommendations = [
    {
      type: 'High Waste Risk',
      item: 'Tomatoes (Branch: Pune)',
      sub: 'Expected surplus: 120 kg',
      icon: '⚠️',
      iconBg: COLORS.accentOrangeBg,
      btnText: 'Review',
      action: () => showAlert('High Waste Risk', 'Pune branch has 120 kg surplus tomatoes. Automated discount rule recommendation: 25% off.'),
    },
    {
      type: 'Replenishment Needed',
      item: 'Milk (Branch: Mumbai)',
      sub: 'Suggested order: 500 units',
      icon: '📦',
      iconBg: COLORS.accentBlueBg,
      btnText: 'Create Order',
      action: () => openActionModal('Replenish Milk (Mumbai)', 'PO Dispatch', 'Create urgent delivery for 500 units from DairyBest Ltd.', 'Confirm PO', () => showAlert('PO Dispatched', 'Order sent to DairyBest Ltd.')),
    },
    {
      type: 'Discount Recommended',
      item: 'Bananas (Branch: Nashik)',
      sub: 'Potential savings: ₹8,400',
      icon: '🏷️',
      iconBg: COLORS.accentPurpleBg,
      btnText: 'View Details',
      action: () => showAlert('Discount Details', 'Nashik Bananas at shelf day 4. Dynamic markdown to ₹35/kg avoids complete write-off.'),
    },
    {
      type: 'Stock Transfer Suggestion',
      item: 'Apples (Pune → Kolhapur)',
      sub: 'Move 200 units',
      icon: '⇄',
      iconBg: COLORS.lightMint,
      btnText: 'View Transfer',
      action: () => openActionModal('Transfer Apples', 'Inter-Branch Dispatch', 'Transfer 200 units of surplus apples from Pune to Kolhapur outlet.', 'Dispatch Transfer', () => showAlert('Transfer Confirmed', 'Logistics truck scheduled.')),
    },
  ];

  // Recent activity dataset matching image
  const recentActivities = [
    { icon: '⇄', title: 'Stock transfer approved', sub: 'Pune → Kolhapur (200 units)', time: '2 hours ago' },
    { icon: '➕', title: 'New supplier added', sub: 'FreshFarm Foods', time: '4 hours ago' },
    { icon: '📄', title: 'Branch report generated', sub: 'Mumbai branch (weekly)', time: '6 hours ago' },
    { icon: '🏷️', title: 'Discount approved', sub: 'Bananas - Nashik (15%)', time: '8 hours ago' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Emerald Header Tag (sitting above the dashboard) */}
      <View style={styles.topOuterTagBar}>
        <View style={styles.topEmeraldTag}>
          <Text style={styles.topEmeraldTagText}>
            {activeSidebarNav === 'Branches' ? 'Branches' : 'Company Dashboard'}
          </Text>
        </View>

        {isMobile && (
          <TouchableOpacity
            style={styles.mobileMenuBtn}
            onPress={() => setMobileMenuOpen(true)}
          >
            <Text style={styles.mobileMenuIcon}>☰</Text>
            <Text style={styles.mobileMenuLabel}>Menu</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.mainContainer}>
        {/* =====================================================================
            LEFT SIDEBAR (EXACT MATCH TO REFERENCE IMAGE)
           ===================================================================== */}
        {!isMobile && (
          <View style={styles.sidebar}>
            {/* Brand Logo & Tagline */}
            <TouchableOpacity
              style={styles.sidebarBrand}
              onPress={handleBackToHome}
              activeOpacity={0.8}
            >
              <View style={styles.brandLogoBox}>
                <Text style={styles.brandLeafEmoji}>🍃</Text>
              </View>
              <View style={styles.brandTitleWrap}>
                <Text style={styles.brandTitleMain}>FoodMind AI</Text>
                <Text style={styles.brandSubtitle}>Smarter Groceries, Less Waste.</Text>
              </View>
            </TouchableOpacity>

            {/* Sidebar Navigation Items */}
            <ScrollView style={styles.sidebarNavScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.sidebarNavList}>
                {SIDEBAR_ITEMS.map((item) => {
                  const isActive = activeSidebarNav === item.name;
                  return (
                    <TouchableOpacity
                      key={item.name}
                      style={[
                        styles.sidebarNavItem,
                        isActive && styles.sidebarNavItemActive,
                      ]}
                      onPress={() => {
                        setActiveSidebarNav(item.name);
                        if (item.name !== 'Company Dashboard' && item.name !== 'Branches') {
                          showAlert(item.name, `Opened ${item.name} detailed view.`);
                        }
                      }}
                      activeOpacity={0.75}
                    >
                      <Text style={[styles.navItemIcon, isActive && styles.navItemIconActive]}>
                        {item.icon}
                      </Text>
                      <Text style={[styles.navItemLabel, isActive && styles.navItemLabelActive]}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            {/* Bottom Profile Badge */}
            <TouchableOpacity
              style={styles.sidebarProfileBox}
              onPress={handleLogout}
              activeOpacity={0.85}
            >
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarLetter}>A</Text>
              </View>
              <View style={styles.profileInfoWrap}>
                <Text style={styles.profileName}>Admin</Text>
                <Text style={styles.profileCompany}>FoodMind Retail Ltd.</Text>
              </View>
              <Text style={styles.profileChevron}>›</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* =====================================================================
            MOBILE DRAWER MODAL
           ===================================================================== */}
        {isMobile && (
          <Modal
            visible={mobileMenuOpen}
            transparent
            animationType="slide"
            onRequestClose={() => setMobileMenuOpen(false)}
          >
            <View style={styles.mobileOverlay}>
              <TouchableOpacity
                style={styles.mobileBackdrop}
                activeOpacity={1}
                onPress={() => setMobileMenuOpen(false)}
              />
              <View style={styles.mobileDrawer}>
                <View style={styles.drawerHeader}>
                  <Text style={styles.brandTitleMain}>FoodMind AI</Text>
                  <TouchableOpacity onPress={() => setMobileMenuOpen(false)}>
                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700' }}>✕</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }}>
                  {SIDEBAR_ITEMS.map((item) => (
                    <TouchableOpacity
                      key={item.name}
                      style={[
                        styles.sidebarNavItem,
                        activeSidebarNav === item.name && styles.sidebarNavItemActive,
                      ]}
                      onPress={() => {
                        setActiveSidebarNav(item.name);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Text style={styles.navItemIcon}>{item.icon}</Text>
                      <Text style={styles.navItemLabel}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>
        )}

        {/* =====================================================================
            MAIN CONTENT DASHBOARD BODY
           ===================================================================== */}
        <View style={styles.contentArea}>
          <ScrollView
            style={styles.contentScrollView}
            contentContainerStyle={styles.contentScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Top Page Header Row */}
            <View style={styles.headerRow}>
              <View style={styles.headerTitleGroup}>
                <Text style={styles.headerMainTitle}>
                  {activeSidebarNav === 'Branches' ? 'Branches' : activeSidebarNav}
                </Text>
                <Text style={styles.headerSubtitle}>
                  {activeSidebarNav === 'Branches'
                    ? 'Manage all your branches, view performance, and monitor stock, sales, and waste across locations.'
                    : 'Multi-branch overview and AI-powered insights for a smarter, sustainable supply chain.'}
                </Text>
              </View>

              <View style={styles.headerRightControls}>
                {/* Date Range Selector Pill */}
                <TouchableOpacity
                  style={styles.dateRangePill}
                  onPress={() => setDateRangeModalOpen(true)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.calendarIcon}>📅</Text>
                  <Text style={styles.dateRangeText}>{selectedDateRange}</Text>
                  <Text style={styles.dateDropdownArrow}>▼</Text>
                </TouchableOpacity>

                {/* Notifications Bell */}
                <TouchableOpacity
                  style={styles.iconCircleBtn}
                  onPress={() => setNotificationsModalOpen(true)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.bellIconEmoji}>🔔</Text>
                  <View style={styles.notificationRedDot} />
                </TouchableOpacity>

                {/* User Dropdown Pill */}
                <TouchableOpacity
                  style={styles.userProfilePill}
                  onPress={() => setUserDropdownOpen(true)}
                  activeOpacity={0.85}
                >
                  <View style={styles.userInitialCircle}>
                    <Text style={styles.userInitialLetter}>A</Text>
                  </View>
                  <Text style={styles.userDisplayName}>Admin</Text>
                  <Text style={styles.userDropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>

            {activeSidebarNav === 'Branches' ? (
              <BranchesScreen
                onNavigateTo={(nav) => setActiveSidebarNav(nav)}
                showAlert={showAlert}
                openActionModal={openActionModal}
              />
            ) : (
              <>
                {/* ===================================================================
                    5 TOP KPI CARDS (MATCHING EXACT VALUES & ICONS)
                   =================================================================== */}
                <View style={styles.kpiRow}>
              {/* KPI 1: Total Branches */}
              <TouchableOpacity
                style={styles.kpiCard}
                onPress={() => showAlert('Total Branches', '8 Active branches across Maharashtra.')}
                activeOpacity={0.85}
              >
                <View style={styles.kpiTopRow}>
                  <Text style={styles.kpiLabel}>Total Branches</Text>
                  <View style={styles.kpiIconCircle}>
                    <Text style={styles.kpiIconEmoji}>🏪</Text>
                  </View>
                </View>
                <Text style={styles.kpiValue}>8</Text>
                <View style={styles.kpiBottomRow}>
                  <Text style={styles.kpiSubLabel}>Active branches</Text>
                  <Text style={styles.kpiNeutralTrend}>↑ 0%</Text>
                </View>
              </TouchableOpacity>

              {/* KPI 2: Total Sales */}
              <TouchableOpacity
                style={styles.kpiCard}
                onPress={() => showAlert('Total Sales', '₹ 48,32,000 total sales achieved this week.')}
                activeOpacity={0.85}
              >
                <View style={styles.kpiTopRow}>
                  <Text style={styles.kpiLabel}>Total Sales</Text>
                  <View style={styles.kpiIconCircle}>
                    <Text style={styles.kpiIconEmoji}>₹</Text>
                  </View>
                </View>
                <Text style={styles.kpiValue}>₹ 48,32,000</Text>
                <View style={styles.kpiBottomRow}>
                  <Text style={styles.kpiGreenTrend}>↑ 12% vs last week</Text>
                </View>
              </TouchableOpacity>

              {/* KPI 3: Total Inventory (Units) */}
              <TouchableOpacity
                style={styles.kpiCard}
                onPress={() => showAlert('Total Inventory', '1,25,430 items currently in store stock.')}
                activeOpacity={0.85}
              >
                <View style={styles.kpiTopRow}>
                  <Text style={styles.kpiLabel}>Total Inventory (Units)</Text>
                  <View style={styles.kpiIconCircle}>
                    <Text style={styles.kpiIconEmoji}>📦</Text>
                  </View>
                </View>
                <Text style={styles.kpiValue}>1,25,430</Text>
                <View style={styles.kpiBottomRow}>
                  <Text style={styles.kpiGreenTrend}>↑ 8% vs last week</Text>
                </View>
              </TouchableOpacity>

              {/* KPI 4: Food Waste */}
              <TouchableOpacity
                style={styles.kpiCard}
                onPress={() => showAlert('Food Waste', '1,240 kg total waste recorded across 8 stores.')}
                activeOpacity={0.85}
              >
                <View style={styles.kpiTopRow}>
                  <Text style={styles.kpiLabel}>Food Waste</Text>
                  <View style={styles.kpiIconCircle}>
                    <Text style={styles.kpiIconEmoji}>🗑️</Text>
                  </View>
                </View>
                <Text style={styles.kpiValue}>1,240 kg</Text>
                <View style={styles.kpiBottomRow}>
                  <Text style={styles.kpiGreenTrend}>↓ 22% vs last week</Text>
                </View>
              </TouchableOpacity>

              {/* KPI 5: Estimated Savings */}
              <TouchableOpacity
                style={styles.kpiCard}
                onPress={() => showAlert('Estimated Savings', '₹ 2,84,600 saved through AI demand forecasting.')}
                activeOpacity={0.85}
              >
                <View style={styles.kpiTopRow}>
                  <Text style={styles.kpiLabel}>Estimated Savings</Text>
                  <View style={styles.kpiIconCircle}>
                    <Text style={styles.kpiIconEmoji}>🍃</Text>
                  </View>
                </View>
                <Text style={styles.kpiValue}>₹ 2,84,600</Text>
                <View style={styles.kpiBottomRow}>
                  <Text style={styles.kpiGreenTrend}>↑ 16% vs last week</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* ===================================================================
                MIDDLE SECTION: 3 GRID CARDS (MAP, CHART, PRODUCTS) + RIGHT COLUMN
               =================================================================== */}
            <View style={styles.mainContentSplitRow}>
              {/* Left 3-Column Group */}
              <View style={styles.threeCardsGroup}>
                {/* 1. Branch Performance Overview (Map Card) */}
                <View style={[styles.dashboardCard, styles.middleCard]}>
                  <View style={styles.cardHeaderFlex}>
                    <Text style={styles.cardTitle}>Branch Performance Overview</Text>
                    <TouchableOpacity onPress={() => showAlert('Branches', 'Viewing all branches.')}>
                      <Text style={styles.viewLinkText}>View All Branches ›</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.mapCanvasBox}>
                    <View style={styles.mapWaterCoast} />
                    <View style={styles.mapTerrain}>
                      {/* Nashik */}
                      <View style={[styles.cityPin, { top: 34, left: '32%' }]}>
                        <View style={[styles.pinCircle, { backgroundColor: COLORS.brightGreen }]} />
                        <Text style={styles.pinName}>Nashik</Text>
                      </View>

                      {/* Mumbai */}
                      <View style={[styles.cityPin, { top: 80, left: '16%' }]}>
                        <View style={[styles.pinCircle, { backgroundColor: COLORS.accentOrange }]} />
                        <Text style={styles.pinName}>Mumbai</Text>
                      </View>

                      {/* Pune (Active Store) */}
                      <TouchableOpacity
                        style={[styles.cityPin, { top: 96, left: '46%' }]}
                        onPress={() => showAlert('Pune Store', 'Baner Rd, Pune. Status: High Performance.')}
                      >
                        <View style={[styles.pinCircle, { backgroundColor: COLORS.brightGreen, width: 13, height: 13 }]} />
                        <Text style={[styles.pinName, { fontWeight: '800' }]}>Pune</Text>
                      </TouchableOpacity>

                      {/* Kolhapur */}
                      <View style={[styles.cityPin, { top: 156, left: '38%' }]}>
                        <View style={[styles.pinCircle, { backgroundColor: COLORS.brightGreen }]} />
                        <Text style={styles.pinName}>Kolhapur</Text>
                      </View>

                      {/* Nagpur */}
                      <View style={[styles.cityPin, { top: 48, right: '14%' }]}>
                        <View style={[styles.pinCircle, { backgroundColor: COLORS.accentRed }]} />
                        <Text style={styles.pinName}>Nagpur</Text>
                      </View>
                    </View>

                    {/* Map Legend Box */}
                    <View style={styles.mapLegendCard}>
                      <View style={styles.legendRowItem}>
                        <View style={[styles.legendDot, { backgroundColor: COLORS.brightGreen }]} />
                        <Text style={styles.legendItemText}>High Performance</Text>
                      </View>
                      <View style={styles.legendRowItem}>
                        <View style={[styles.legendDot, { backgroundColor: COLORS.accentOrange }]} />
                        <Text style={styles.legendItemText}>Moderate</Text>
                      </View>
                      <View style={styles.legendRowItem}>
                        <View style={[styles.legendDot, { backgroundColor: COLORS.accentRed }]} />
                        <Text style={styles.legendItemText}>Needs Attention</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* 2. Demand Forecast (Next 7 Days) Line Chart */}
                <View style={[styles.dashboardCard, styles.middleCard]}>
                  <View style={styles.cardHeaderFlex}>
                    <Text style={styles.cardTitle}>Demand Forecast (Next 7 Days)</Text>
                    <View style={styles.chartLegendWrap}>
                      <View style={styles.chartLegendItem}>
                        <View style={[styles.legendLine, { backgroundColor: COLORS.darkGreen }]} />
                        <Text style={styles.chartLegendLabel}>Predicted Demand</Text>
                      </View>
                      <View style={styles.chartLegendItem}>
                        <View style={[styles.legendLine, { backgroundColor: COLORS.accentTeal }]} />
                        <Text style={styles.chartLegendLabel}>Actual Sales</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.lineChartCanvas}>
                    {['8K', '6K', '4K', '2K', '0'].map((val) => (
                      <View key={val} style={styles.chartGridLine}>
                        <Text style={styles.chartYText}>{val}</Text>
                        <View style={styles.chartDashedLine} />
                      </View>
                    ))}

                    <View style={styles.chartCurvesOverlay}>
                      {/* Predicted curve points */}
                      <View style={[styles.dataDot, { left: '8%', bottom: 38, backgroundColor: COLORS.darkGreen }]} />
                      <View style={[styles.dataDot, { left: '22%', bottom: 46, backgroundColor: COLORS.darkGreen }]} />
                      <View style={[styles.dataDot, { left: '36%', bottom: 52, backgroundColor: COLORS.darkGreen }]} />
                      <View style={[styles.dataDot, { left: '50%', bottom: 64, backgroundColor: COLORS.darkGreen }]} />
                      <View style={[styles.dataDot, { left: '64%', bottom: 70, backgroundColor: COLORS.darkGreen }]} />
                      <View style={[styles.dataDot, { left: '78%', bottom: 84, backgroundColor: COLORS.darkGreen }]} />
                      <View style={[styles.dataDot, { left: '92%', bottom: 94, backgroundColor: COLORS.darkGreen }]} />

                      {/* Actual sales points */}
                      <View style={[styles.dataDot, { left: '8%', bottom: 28, backgroundColor: COLORS.accentTeal }]} />
                      <View style={[styles.dataDot, { left: '22%', bottom: 34, backgroundColor: COLORS.accentTeal }]} />
                      <View style={[styles.dataDot, { left: '36%', bottom: 44, backgroundColor: COLORS.accentTeal }]} />
                      <View style={[styles.dataDot, { left: '50%', bottom: 52, backgroundColor: COLORS.accentTeal }]} />
                      <View style={[styles.dataDot, { left: '64%', bottom: 58, backgroundColor: COLORS.accentTeal }]} />
                      <View style={[styles.dataDot, { left: '78%', bottom: 70, backgroundColor: COLORS.accentTeal }]} />
                      <View style={[styles.dataDot, { left: '92%', bottom: 76, backgroundColor: COLORS.accentTeal }]} />
                    </View>
                  </View>

                  <View style={styles.chartXAxisRow}>
                    {['Apr 28', 'Apr 29', 'Apr 30', 'May 1', 'May 2', 'May 3', 'May 4'].map((d) => (
                      <Text key={d} style={styles.chartXText}>{d}</Text>
                    ))}
                  </View>
                </View>

                {/* 3. Top Products by Demand */}
                <View style={[styles.dashboardCard, styles.middleCard]}>
                  <Text style={styles.cardTitle}>Top Products by Demand</Text>
                  {/* Filter Subtabs */}
                  <View style={styles.productTabsRow}>
                    {['By Sales', 'By Region', 'By Branch'].map((t) => (
                      <TouchableOpacity
                        key={t}
                        style={[styles.productTabBtn, productTab === t && styles.productTabBtnActive]}
                        onPress={() => setProductTab(t)}
                      >
                        <Text style={[styles.productTabText, productTab === t && styles.productTabTextActive]}>
                          {t}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Products Table Header */}
                  <View style={styles.prodTableHeader}>
                    <Text style={[styles.prodTh, { width: 22 }]}>#</Text>
                    <Text style={[styles.prodTh, { flex: 1.5 }]}>Product</Text>
                    <Text style={[styles.prodTh, { flex: 1, textAlign: 'right' }]}>Predicted Demand</Text>
                    <Text style={[styles.prodTh, { flex: 0.9, textAlign: 'right' }]}>Change</Text>
                  </View>

                  {/* Product Rows */}
                  {topProductsData.map((p) => (
                    <TouchableOpacity
                      key={p.id}
                      style={styles.prodTableRow}
                      onPress={() => showAlert(p.name, `Predicted Demand: ${p.demand} units\nGrowth: ${p.change}`)}
                    >
                      <Text style={[styles.prodTdNum, { width: 22 }]}>{p.id}</Text>
                      <View style={[styles.prodTdNameCell, { flex: 1.5 }]}>
                        <Text style={styles.prodEmoji}>{p.icon}</Text>
                        <Text style={styles.prodName}>{p.name}</Text>
                      </View>
                      <Text style={[styles.prodTdValue, { flex: 1, textAlign: 'right' }]}>{p.demand}</Text>
                      <Text style={[styles.prodTdChange, { flex: 0.9, textAlign: 'right' }]}>{p.change}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Right Column: AI Insights & Recommendations (Spanning Vertical) */}
              <View style={styles.rightColumnGroup}>
                <View style={[styles.dashboardCard, { flex: 1 }]}>
                  <View style={styles.cardHeaderFlex}>
                    <View style={styles.aiTitleRow}>
                      <Text style={styles.sparkleIcon}>✦</Text>
                      <Text style={styles.cardTitle}>AI Insights & Recommendations</Text>
                    </View>
                    <TouchableOpacity onPress={() => showAlert('AI Insights', 'Displaying all automated recommendations.')}>
                      <Text style={styles.viewLinkText}>View All</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.aiCardsList}>
                    {aiRecommendations.map((rec, idx) => (
                      <View key={idx} style={styles.aiCardItem}>
                        <View style={[styles.aiIconBadge, { backgroundColor: rec.iconBg }]}>
                          <Text style={styles.aiIconText}>{rec.icon}</Text>
                        </View>
                        <View style={styles.aiTextContainer}>
                          <Text style={styles.aiCardType}>{rec.type}</Text>
                          <Text style={styles.aiCardItemName}>{rec.item}</Text>
                          <Text style={styles.aiCardSub}>{rec.sub}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.aiActionDarkBtn}
                          onPress={rec.action}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.aiActionDarkBtnText}>{rec.btnText}</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            {/* ===================================================================
                BOTTOM ROW: BRANCH COMPARISON | DEMAND HEATMAP | WASTE ANALYTICS | RECENT ACTIVITY
               =================================================================== */}
            <View style={styles.bottomRowSplit}>
              {/* Card 1: Branch Comparison */}
              <View style={[styles.dashboardCard, { flex: 1.6 }]}>
                <Text style={styles.cardTitle}>Branch Comparison</Text>
                <View style={styles.compTableHeader}>
                  <Text style={[styles.compTh, { flex: 1.2 }]}>Branch</Text>
                  <Text style={[styles.compTh, { flex: 1.2, textAlign: 'right' }]}>Sales (₹)</Text>
                  <Text style={[styles.compTh, { flex: 1.2, textAlign: 'right' }]}>Inventory Value (₹)</Text>
                  <Text style={[styles.compTh, { flex: 1.1, textAlign: 'right' }]}>Food Waste (kg)</Text>
                  <Text style={[styles.compTh, { flex: 0.9, textAlign: 'right' }]}>Waste %</Text>
                  <Text style={[styles.compTh, { flex: 1.2, textAlign: 'center' }]}>Performance</Text>
                </View>

                {branchComparisonData.map((row) => (
                  <TouchableOpacity
                    key={row.branch}
                    style={styles.compTableRow}
                    onPress={() => {
                      setActiveSidebarNav('Branches');
                    }}
                  >
                    <Text style={[styles.compTdBranch, { flex: 1.2 }]}>{row.branch}</Text>
                    <Text style={[styles.compTdText, { flex: 1.2, textAlign: 'right' }]}>{row.sales}</Text>
                    <Text style={[styles.compTdText, { flex: 1.2, textAlign: 'right' }]}>{row.invValue}</Text>
                    <Text style={[styles.compTdText, { flex: 1.1, textAlign: 'right' }]}>{row.waste}</Text>
                    <Text style={[styles.compTdText, { flex: 0.9, textAlign: 'right' }]}>{row.wastePct}</Text>
                    <View style={{ flex: 1.2, alignItems: 'center' }}>
                      <View
                        style={[
                          styles.perfBadge,
                          row.perf === 'High' && styles.perfHigh,
                          row.perf === 'Moderate' && styles.perfModerate,
                          row.perf === 'Good' && styles.perfGood,
                        ]}
                      >
                        <Text
                          style={[
                            styles.perfBadgeText,
                            row.perf === 'High' && styles.perfTextHigh,
                            row.perf === 'Moderate' && styles.perfTextModerate,
                            row.perf === 'Good' && styles.perfTextGood,
                          ]}
                        >
                          {row.perf}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Card 2: Area-wise Demand Heatmap */}
              <View style={[styles.dashboardCard, { flex: 1.2 }]}>
                <View style={styles.cardHeaderFlex}>
                  <Text style={styles.cardTitle}>Area-wise Demand Heatmap</Text>
                  <View style={styles.heatmapLegendRow}>
                    <View style={styles.legendRowItem}>
                      <View style={[styles.legendDot, { backgroundColor: COLORS.accentRed }]} />
                      <Text style={styles.legendItemText}>High Demand</Text>
                    </View>
                    <View style={styles.legendRowItem}>
                      <View style={[styles.legendDot, { backgroundColor: COLORS.accentOrange }]} />
                      <Text style={styles.legendItemText}>Medium</Text>
                    </View>
                    <View style={styles.legendRowItem}>
                      <View style={[styles.legendDot, { backgroundColor: COLORS.brightGreen }]} />
                      <Text style={styles.legendItemText}>Low</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.heatmapVisualFrame}>
                  {/* Concentric Heat Halos */}
                  <View style={[styles.heatHalo, { top: 30, left: '20%', width: 70, height: 70, backgroundColor: 'rgba(239, 68, 68, 0.28)' }]} />
                  <View style={[styles.heatHalo, { top: 56, left: '40%', width: 90, height: 90, backgroundColor: 'rgba(245, 158, 11, 0.3)' }]} />
                  <View style={[styles.heatHalo, { top: 88, left: '30%', width: 60, height: 60, backgroundColor: 'rgba(22, 163, 74, 0.25)' }]} />

                  {/* Labeled City Markers */}
                  <View style={[styles.cityPin, { top: 38, left: '20%' }]}>
                    <Text style={styles.heatmapCityText}>Mumbai</Text>
                  </View>
                  <View style={[styles.cityPin, { top: 74, left: '46%' }]}>
                    <View style={[styles.pinCircle, { backgroundColor: COLORS.brightGreen, width: 12, height: 12 }]} />
                    <Text style={[styles.heatmapCityText, { fontWeight: '800' }]}>Pune</Text>
                  </View>

                  {/* Bottom Zoom & Full Map Controls */}
                  <View style={styles.heatmapBottomBar}>
                    <View style={styles.zoomControlsWrap}>
                      <TouchableOpacity
                        style={styles.zoomButton}
                        onPress={() => setHeatmapZoom((z) => Math.min(z + 0.2, 1.8))}
                      >
                        <Text style={styles.zoomButtonText}>+</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.zoomButton}
                        onPress={() => setHeatmapZoom((z) => Math.max(z - 0.2, 0.8))}
                      >
                        <Text style={styles.zoomButtonText}>-</Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={styles.viewFullMapBtn}
                      onPress={() => showAlert('Heatmap View', 'Opening full high-definition Maharashtra regional map.')}
                    >
                      <Text style={styles.viewFullMapBtnText}>View Full Map</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Card 3: Company Waste Analytics (Dual Bar Chart) */}
              <View style={[styles.dashboardCard, { flex: 1.2 }]}>
                <View style={styles.cardHeaderFlex}>
                  <Text style={styles.cardTitle}>Company Waste Analytics</Text>
                  <View style={styles.chartLegendWrap}>
                    <View style={styles.chartLegendItem}>
                      <View style={[styles.legendBarIndicator, { backgroundColor: COLORS.darkGreen }]} />
                      <Text style={styles.chartLegendLabel}>Food Waste (kg)</Text>
                    </View>
                    <View style={styles.chartLegendItem}>
                      <View style={[styles.legendBarIndicator, { backgroundColor: COLORS.accentTeal }]} />
                      <Text style={styles.chartLegendLabel}>Estimated Value (₹)</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.dualBarChartCanvas}>
                  {/* Y Axis Labels */}
                  <View style={styles.yAxisLeftLabels}>
                    <Text style={styles.yAxisSmall}>2K</Text>
                    <Text style={styles.yAxisSmall}>1.5K</Text>
                    <Text style={styles.yAxisSmall}>1K</Text>
                    <Text style={styles.yAxisSmall}>500</Text>
                    <Text style={styles.yAxisSmall}>0</Text>
                  </View>

                  {/* Bars Container */}
                  <View style={styles.dualBarsWrapper}>
                    {[
                      { m: 'Nov', waste: 80, val: 55 },
                      { m: 'Dec', waste: 90, val: 65 },
                      { m: 'Jan', waste: 105, val: 78 },
                      { m: 'Feb', waste: 75, val: 50 },
                      { m: 'Mar', waste: 60, val: 40 },
                      { m: 'Apr', waste: 45, val: 32 },
                    ].map((col) => (
                      <View key={col.m} style={styles.dualBarCol}>
                        <View style={styles.barsPair}>
                          <View style={[styles.barSingle, { height: col.waste, backgroundColor: COLORS.darkGreen }]} />
                          <View style={[styles.barSingle, { height: col.val, backgroundColor: COLORS.accentTeal }]} />
                        </View>
                        <Text style={styles.barMonthText}>{col.m}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Y Axis Right Labels */}
                  <View style={styles.yAxisRightLabels}>
                    <Text style={styles.yAxisSmall}>40K</Text>
                    <Text style={styles.yAxisSmall}>30K</Text>
                    <Text style={styles.yAxisSmall}>20K</Text>
                    <Text style={styles.yAxisSmall}>10K</Text>
                    <Text style={styles.yAxisSmall}>0</Text>
                  </View>
                </View>
              </View>

              {/* Card 4: Recent Activity */}
              <View style={[styles.dashboardCard, { flex: 1 }]}>
                <View style={styles.cardHeaderFlex}>
                  <Text style={styles.cardTitle}>Recent Activity</Text>
                  <TouchableOpacity onPress={() => showAlert('Activity Log', 'Displaying full audit trail.')}>
                    <Text style={styles.viewLinkText}>View All</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.recentActivityList}>
                  {recentActivities.map((act, i) => (
                    <View key={i} style={styles.activityItemRow}>
                      <View style={styles.activityIconBox}>
                        <Text style={styles.activityEmoji}>{act.icon}</Text>
                      </View>
                      <View style={styles.activityTextWrap}>
                        <Text style={styles.activityTitle}>{act.title}</Text>
                        <Text style={styles.activitySub}>{act.sub}</Text>
                      </View>
                      <Text style={styles.activityTime}>{act.time}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
        </View>
      </View>

      {/* =====================================================================
          GLOBAL INTERACTIVE MODALS
         ===================================================================== */}
      {/* 1. Generic Action Modal */}
      <Modal visible={actionModal.visible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.actionModalCard}>
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalHeaderTitle}>{actionModal.title}</Text>
                <Text style={styles.modalHeaderSub}>{actionModal.subtitle}</Text>
              </View>
              <TouchableOpacity onPress={closeActionModal}>
                <Text style={styles.modalCloseX}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalDetailsBox}>
              <Text style={styles.modalDetailsText}>{actionModal.details}</Text>
            </View>
            <View style={styles.modalActionsRow}>
              <TouchableOpacity style={styles.modalSecondaryBtn} onPress={closeActionModal}>
                <Text style={styles.modalSecondaryBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalPrimaryBtn}
                onPress={() => {
                  if (actionModal.onAction) actionModal.onAction();
                  closeActionModal();
                }}
              >
                <Text style={styles.modalPrimaryBtnText}>{actionModal.actionBtnText || 'Confirm'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 2. Date Range Modal */}
      <Modal visible={dateRangeModalOpen} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.popupModalCard}>
            <Text style={styles.popupModalTitle}>Select Reporting Period</Text>
            {[
              'Apr 28, 2025 - May 4, 2025',
              'Apr 21, 2025 - Apr 27, 2025',
              'Apr 1, 2025 - Apr 30, 2025',
            ].map((d) => (
              <TouchableOpacity
                key={d}
                style={styles.popupOptionItem}
                onPress={() => {
                  setSelectedDateRange(d);
                  setDateRangeModalOpen(false);
                }}
              >
                <Text style={styles.popupOptionText}>{d}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.popupCloseBtn} onPress={() => setDateRangeModalOpen(false)}>
              <Text style={styles.popupCloseBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 3. Notifications Modal */}
      <Modal visible={notificationsModalOpen} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.popupModalCard}>
            <Text style={styles.popupModalTitle}>System Notifications</Text>
            {[
              '⚠️ Pune Store: High waste risk on Tomatoes (120 kg surplus).',
              '📦 Mumbai Store: Replenishment requested for Milk (500 units).',
              '🚚 Stock Transfer #48 delivered to Kolhapur outlet.',
              '✅ AI Demand Forecast recomputed with 93.4% accuracy.',
            ].map((msg, i) => (
              <View key={i} style={styles.popupOptionItem}>
                <Text style={styles.popupOptionText}>{msg}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.popupCloseBtn} onPress={() => setNotificationsModalOpen(false)}>
              <Text style={styles.popupCloseBtnText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 4. User Dropdown Modal */}
      <Modal visible={userDropdownOpen} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.popupModalCard}>
            <Text style={styles.popupModalTitle}>Admin Session</Text>
            <View style={{ paddingVertical: 6 }}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: COLORS.darkGreen }}>Logged in: Admin</Text>
              <Text style={{ fontSize: 11, color: COLORS.mutedText }}>admin@foodmind.ai</Text>
            </View>
            <TouchableOpacity
              style={styles.popupOptionItem}
              onPress={() => {
                setUserDropdownOpen(false);
                handleLogout();
              }}
            >
              <Text style={[styles.popupOptionText, { color: COLORS.accentRed, fontWeight: '700' }]}>
                🚪 Sign Out
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.popupCloseBtn} onPress={() => setUserDropdownOpen(false)}>
              <Text style={styles.popupCloseBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#092117',
  },
  // Top Outer Green Tag Pill
  topOuterTagBar: {
    backgroundColor: '#092117',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topEmeraldTag: {
    backgroundColor: '#134730',
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1C5C3F',
  },
  topEmeraldTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  mobileMenuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#134730',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 6,
  },
  mobileMenuIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  mobileMenuLabel: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '700',
  },
  // Main Container
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.pageBg,
  },
  // Sidebar Styling (Exact reference match)
  sidebar: {
    width: 220,
    backgroundColor: COLORS.sidebarBg,
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    borderRightWidth: 1,
    borderRightColor: '#103323',
  },
  sidebarBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 4,
    marginBottom: 20,
  },
  brandLogoBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.sidebarActivePill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1D5A3E',
  },
  brandLeafEmoji: {
    fontSize: 18,
  },
  brandTitleWrap: {
    flex: 1,
  },
  brandTitleMain: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  brandSubtitle: {
    fontSize: 9,
    color: '#7EA290',
    marginTop: 1,
  },
  sidebarNavScroll: {
    flex: 1,
  },
  sidebarNavList: {
    gap: 4,
  },
  sidebarNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 10,
  },
  sidebarNavItemActive: {
    backgroundColor: COLORS.sidebarActivePill,
  },
  navItemIcon: {
    fontSize: 15,
    opacity: 0.8,
  },
  navItemIconActive: {
    opacity: 1,
  },
  navItemLabel: {
    fontSize: 12.5,
    fontWeight: '500',
    color: '#82A392',
    flex: 1,
  },
  navItemLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  sidebarProfileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#061710',
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#123323',
    gap: 10,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarLetter: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  profileInfoWrap: {
    flex: 1,
  },
  profileName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileCompany: {
    fontSize: 9.5,
    color: '#7EA290',
    marginTop: 1,
  },
  profileChevron: {
    fontSize: 16,
    color: '#7EA290',
  },
  // Mobile Drawer
  mobileOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mobileBackdrop: {
    flex: 1,
  },
  mobileDrawer: {
    width: 260,
    height: '100%',
    backgroundColor: COLORS.sidebarBg,
    padding: 16,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  // Content Area
  contentArea: {
    flex: 1,
    backgroundColor: COLORS.pageBg,
  },
  contentScrollView: {
    flex: 1,
  },
  contentScrollContent: {
    padding: 20,
    gap: 16,
  },
  // Header Row
  headerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  headerTitleGroup: {
    flex: 1,
    minWidth: 260,
  },
  headerMainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.darkGreen,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 11.5,
    color: COLORS.bodyText,
    marginTop: 2,
  },
  headerRightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dateRangePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
  },
  calendarIcon: {
    fontSize: 12,
  },
  dateRangeText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: COLORS.darkGreen,
  },
  dateDropdownArrow: {
    fontSize: 8,
    color: COLORS.mutedText,
  },
  iconCircleBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellIconEmoji: {
    fontSize: 13,
  },
  notificationRedDot: {
    position: 'absolute',
    top: 5,
    right: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accentRed,
  },
  userProfilePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 3,
    paddingLeft: 4,
    paddingRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
  },
  userInitialCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#092117',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInitialLetter: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  userDisplayName: {
    fontSize: 11.5,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  userDropdownArrow: {
    fontSize: 8,
    color: COLORS.mutedText,
  },
  // 5 KPI Row
  kpiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flex: 1,
    minWidth: 160,
  },
  kpiTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.mutedText,
  },
  kpiIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.mintBadgeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiIconEmoji: {
    fontSize: 12,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.darkGreen,
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  kpiBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kpiSubLabel: {
    fontSize: 10.5,
    color: COLORS.mutedText,
  },
  kpiNeutralTrend: {
    fontSize: 10.5,
    fontWeight: '700',
    color: COLORS.brightGreen,
  },
  kpiGreenTrend: {
    fontSize: 10.5,
    fontWeight: '700',
    color: COLORS.brightGreen,
  },
  // Main Split Row (3 Cards + Right Column)
  mainContentSplitRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  threeCardsGroup: {
    flex: 3,
    minWidth: 640,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  rightColumnGroup: {
    flex: 1.2,
    minWidth: 280,
  },
  dashboardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  middleCard: {
    flex: 1,
    minWidth: 230,
  },
  cardHeaderFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: COLORS.darkGreen,
  },
  viewLinkText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primaryGreen,
  },
  // Map Box
  mapCanvasBox: {
    height: 175,
    backgroundColor: COLORS.mapLand,
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D4E4DA',
  },
  mapWaterCoast: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '24%',
    backgroundColor: COLORS.mapWater,
    borderRightWidth: 1,
    borderRightColor: '#BFD7F2',
  },
  mapTerrain: {
    flex: 1,
    position: 'relative',
  },
  cityPin: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinCircle: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  pinName: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.darkGreen,
    marginTop: 2,
    backgroundColor: 'rgba(255,255,255,0.88)',
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  mapLegendCard: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 6,
    padding: 5,
    gap: 3,
  },
  legendRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendItemText: {
    fontSize: 8.5,
    fontWeight: '600',
    color: COLORS.darkGreen,
  },
  // Line Chart
  chartLegendWrap: {
    flexDirection: 'row',
    gap: 10,
  },
  chartLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendLine: {
    width: 12,
    height: 2.5,
    borderRadius: 1.5,
  },
  chartLegendLabel: {
    fontSize: 9.5,
    fontWeight: '600',
    color: COLORS.bodyText,
  },
  lineChartCanvas: {
    height: 120,
    justifyContent: 'space-between',
    position: 'relative',
    marginVertical: 4,
  },
  chartGridLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chartYText: {
    width: 18,
    fontSize: 9,
    color: COLORS.mutedText,
    textAlign: 'right',
  },
  chartDashedLine: {
    flex: 1,
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#E6ECE8',
  },
  chartCurvesOverlay: {
    position: 'absolute',
    left: 24,
    right: 0,
    top: 0,
    bottom: 0,
  },
  dataDot: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  chartXAxisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 4,
    marginTop: 4,
  },
  chartXText: {
    fontSize: 9,
    color: COLORS.mutedText,
  },
  // Product Tabs & Table
  productTabsRow: {
    flexDirection: 'row',
    backgroundColor: '#F0F4F2',
    borderRadius: 6,
    padding: 2,
    marginBottom: 8,
  },
  productTabBtn: {
    flex: 1,
    paddingVertical: 4,
    alignItems: 'center',
    borderRadius: 5,
  },
  productTabBtnActive: {
    backgroundColor: '#092117',
  },
  productTabText: {
    fontSize: 9.5,
    fontWeight: '600',
    color: COLORS.mutedText,
  },
  productTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  prodTableHeader: {
    flexDirection: 'row',
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  prodTh: {
    fontSize: 9.5,
    fontWeight: '700',
    color: COLORS.mutedText,
  },
  prodTableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F7F5',
  },
  prodTdNum: {
    fontSize: 10,
    color: COLORS.mutedText,
  },
  prodTdNameCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  prodEmoji: {
    fontSize: 12,
  },
  prodName: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.darkGreen,
  },
  prodTdValue: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.darkGreen,
  },
  prodTdChange: {
    fontSize: 10.5,
    fontWeight: '700',
    color: COLORS.brightGreen,
  },
  // AI Recommendations Column
  aiTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sparkleIcon: {
    fontSize: 12,
    color: COLORS.brightGreen,
  },
  aiCardsList: {
    gap: 10,
    marginTop: 4,
  },
  aiCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FCFA',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    gap: 10,
  },
  aiIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiIconText: {
    fontSize: 13,
  },
  aiTextContainer: {
    flex: 1,
  },
  aiCardType: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  aiCardItemName: {
    fontSize: 10,
    color: COLORS.bodyText,
    marginTop: 1,
  },
  aiCardSub: {
    fontSize: 9.5,
    color: COLORS.mutedText,
    marginTop: 1,
  },
  aiActionDarkBtn: {
    backgroundColor: '#092117',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  aiActionDarkBtnText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  // Bottom Row Split
  bottomRowSplit: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  // Branch Comparison Table
  compTableHeader: {
    flexDirection: 'row',
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  compTh: {
    fontSize: 9.5,
    fontWeight: '700',
    color: COLORS.mutedText,
  },
  compTableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F7F5',
  },
  compTdBranch: {
    fontSize: 11.5,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  compTdText: {
    fontSize: 11,
    color: COLORS.bodyText,
  },
  perfBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  perfHigh: { backgroundColor: COLORS.mintBadgeBg },
  perfModerate: { backgroundColor: COLORS.accentOrangeBg },
  perfGood: { backgroundColor: '#E0F2FE' },
  perfBadgeText: { fontSize: 9.5, fontWeight: '700' },
  perfTextHigh: { color: COLORS.primaryGreen },
  perfTextModerate: { color: COLORS.accentOrange },
  perfTextGood: { color: COLORS.accentBlue },
  // Heatmap Visual Frame
  heatmapLegendRow: {
    flexDirection: 'row',
    gap: 8,
  },
  heatmapVisualFrame: {
    height: 175,
    backgroundColor: '#EEF5F1',
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: 8,
  },
  heatHalo: {
    position: 'absolute',
    borderRadius: 50,
  },
  heatmapCityText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  heatmapBottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
  zoomControlsWrap: {
    flexDirection: 'row',
    gap: 4,
  },
  zoomButton: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  viewFullMapBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  viewFullMapBtnText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  // Dual Bar Chart
  legendBarIndicator: {
    width: 10,
    height: 6,
    borderRadius: 2,
  },
  dualBarChartCanvas: {
    flexDirection: 'row',
    height: 140,
    alignItems: 'flex-end',
    paddingTop: 8,
  },
  yAxisLeftLabels: {
    width: 22,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 4,
  },
  yAxisRightLabels: {
    width: 24,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 4,
  },
  yAxisSmall: {
    fontSize: 8.5,
    color: COLORS.mutedText,
  },
  dualBarsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '100%',
    alignItems: 'flex-end',
  },
  dualBarCol: {
    alignItems: 'center',
    gap: 4,
  },
  barsPair: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: 110,
  },
  barSingle: {
    width: 8,
    borderRadius: 2,
  },
  barMonthText: {
    fontSize: 9,
    color: COLORS.mutedText,
  },
  // Recent Activity List
  recentActivityList: {
    gap: 10,
    marginTop: 4,
  },
  activityItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F7F5',
  },
  activityIconBox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#F0F4F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityEmoji: {
    fontSize: 12,
  },
  activityTextWrap: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  activitySub: {
    fontSize: 9.5,
    color: COLORS.mutedText,
    marginTop: 1,
  },
  activityTime: {
    fontSize: 9,
    color: COLORS.mutedText,
  },
  // Modals
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(9, 33, 23, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  actionModalCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.darkGreen,
  },
  modalHeaderSub: {
    fontSize: 11.5,
    color: COLORS.bodyText,
    marginTop: 2,
  },
  modalCloseX: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.mutedText,
  },
  modalDetailsBox: {
    backgroundColor: '#F8FAF8',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: 12,
  },
  modalDetailsText: {
    fontSize: 12,
    color: COLORS.darkGreen,
    lineHeight: 17,
  },
  modalActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalSecondaryBtn: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalSecondaryBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: COLORS.bodyText,
  },
  modalPrimaryBtn: {
    backgroundColor: COLORS.primaryGreen,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  modalPrimaryBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  popupModalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    gap: 10,
  },
  popupModalTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.darkGreen,
    marginBottom: 4,
  },
  popupOptionItem: {
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F5F3',
  },
  popupOptionText: {
    fontSize: 12,
    color: COLORS.darkGreen,
  },
  popupCloseBtn: {
    alignItems: 'center',
    paddingTop: 8,
  },
  popupCloseBtnText: {
    fontSize: 12,
    color: COLORS.mutedText,
    fontWeight: '600',
  },
});
