import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  useWindowDimensions,
  Modal,
  Alert,
  Platform,
} from 'react-native';

const COLORS = {
  pageBg: '#F3F6F4',
  cardBg: '#FFFFFF',
  border: '#E3EBE6',
  sidebarBg: '#092117',
  sidebarActivePill: '#134730',
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
  mapLand: '#E2EFE7',
  mapWater: '#D5E6FA',
};

const ALL_BRANCHES = [
  {
    id: 1,
    name: 'Pune Central',
    city: 'Pune',
    state: 'Maharashtra',
    code: 'BR001',
    manager: 'Rohit Sharma (Manager)',
    phone: '+91 98765 43210',
    salesNum: 1240000,
    salesFormatted: '12,40,000',
    invValue: '8,20,000',
    wasteKg: 320,
    wastePct: '2.6%',
    perf: 'High',
    status: 'Active',
    salesTrend: '↑ 12%',
    invTrend: '↑ 8%',
    wasteTrend: '↓ 22%',
    wastePctTrend: '↓ 0.4%',
    categories: [
      { name: 'Fruits & Vegetables', pct: 40, width: '40%' },
      { name: 'Dairy & Milk', pct: 25, width: '25%' },
      { name: 'Bakery', pct: 15, width: '15%' },
      { name: 'Beverages', pct: 12, width: '12%' },
      { name: 'Others', pct: 8, width: '8%' },
    ],
    aiInsight: 'Pune Central is performing 18% better than average. Consider increasing inventory for fresh produce based on high demand.',
  },
  {
    id: 2,
    name: 'Mumbai West',
    city: 'Mumbai',
    state: 'Maharashtra',
    code: 'BR002',
    manager: 'Priya Mehta',
    phone: '+91 98765 43211',
    salesNum: 1180000,
    salesFormatted: '11,80,000',
    invValue: '7,60,000',
    wasteKg: 280,
    wastePct: '2.3%',
    perf: 'High',
    status: 'Active',
    salesTrend: '↑ 14%',
    invTrend: '↑ 5%',
    wasteTrend: '↓ 18%',
    wastePctTrend: '↓ 0.5%',
    categories: [
      { name: 'Fruits & Vegetables', pct: 38, width: '38%' },
      { name: 'Dairy & Milk', pct: 28, width: '28%' },
      { name: 'Bakery', pct: 16, width: '16%' },
      { name: 'Beverages', pct: 10, width: '10%' },
      { name: 'Others', pct: 8, width: '8%' },
    ],
    aiInsight: 'High footfall during evening hours. Increase dairy replenishment to prevent stockouts.',
  },
  {
    id: 3,
    name: 'Nashik Road',
    city: 'Nashik',
    state: 'Maharashtra',
    code: 'BR003',
    manager: 'Amit Patil',
    phone: '+91 98765 43212',
    salesNum: 850000,
    salesFormatted: '8,50,000',
    invValue: '5,40,000',
    wasteKg: 220,
    wastePct: '2.9%',
    perf: 'Moderate',
    status: 'Active',
    salesTrend: '↑ 6%',
    invTrend: '↑ 4%',
    wasteTrend: '↓ 12%',
    wastePctTrend: '↓ 0.2%',
    categories: [
      { name: 'Fruits & Vegetables', pct: 45, width: '45%' },
      { name: 'Dairy & Milk', pct: 20, width: '20%' },
      { name: 'Bakery', pct: 15, width: '15%' },
      { name: 'Beverages', pct: 12, width: '12%' },
      { name: 'Others', pct: 8, width: '8%' },
    ],
    aiInsight: 'Produce surplus anticipated. Enable discount rules on leafy greens at 4 PM.',
  },
  {
    id: 4,
    name: 'Nagpur Main',
    city: 'Nagpur',
    state: 'Maharashtra',
    code: 'BR004',
    manager: 'Sneha Deshmukh',
    phone: '+91 98765 43213',
    salesNum: 720000,
    salesFormatted: '7,20,000',
    invValue: '4,80,000',
    wasteKg: 260,
    wastePct: '3.6%',
    perf: 'Moderate',
    status: 'Active',
    salesTrend: '↑ 4%',
    invTrend: '↑ 3%',
    wasteTrend: '↓ 8%',
    wastePctTrend: '↓ 0.1%',
    categories: [
      { name: 'Fruits & Vegetables', pct: 42, width: '42%' },
      { name: 'Dairy & Milk', pct: 22, width: '22%' },
      { name: 'Bakery', pct: 14, width: '14%' },
      { name: 'Beverages', pct: 14, width: '14%' },
      { name: 'Others', pct: 8, width: '8%' },
    ],
    aiInsight: 'Citrus and root vegetables have higher margin here. Recommend supplier contract renewal.',
  },
  {
    id: 5,
    name: 'Kolhapur City',
    city: 'Kolhapur',
    state: 'Maharashtra',
    code: 'BR005',
    manager: 'Vikram Jadhav',
    phone: '+91 98765 43214',
    salesNum: 540000,
    salesFormatted: '5,40,000',
    invValue: '3,20,000',
    wasteKg: 160,
    wastePct: '2.1%',
    perf: 'Good',
    status: 'Active',
    salesTrend: '↑ 9%',
    invTrend: '↑ 5%',
    wasteTrend: '↓ 20%',
    wastePctTrend: '↓ 0.3%',
    categories: [
      { name: 'Fruits & Vegetables', pct: 36, width: '36%' },
      { name: 'Dairy & Milk', pct: 30, width: '30%' },
      { name: 'Bakery', pct: 16, width: '16%' },
      { name: 'Beverages', pct: 10, width: '10%' },
      { name: 'Others', pct: 8, width: '8%' },
    ],
    aiInsight: 'Dairy inventory turnover is exceptional. Expand artisanal cheese selection.',
  },
  {
    id: 6,
    name: 'Thane',
    city: 'Thane',
    state: 'Maharashtra',
    code: 'BR006',
    manager: 'Neha Kulkarni',
    phone: '+91 98765 43215',
    salesNum: 490000,
    salesFormatted: '4,90,000',
    invValue: '3,10,000',
    wasteKg: 140,
    wastePct: '2.0%',
    perf: 'Good',
    status: 'Active',
    salesTrend: '↑ 11%',
    invTrend: '↑ 7%',
    wasteTrend: '↓ 15%',
    wastePctTrend: '↓ 0.2%',
    categories: [
      { name: 'Fruits & Vegetables', pct: 40, width: '40%' },
      { name: 'Dairy & Milk', pct: 24, width: '24%' },
      { name: 'Bakery', pct: 18, width: '18%' },
      { name: 'Beverages', pct: 10, width: '10%' },
      { name: 'Others', pct: 8, width: '8%' },
    ],
    aiInsight: 'High demand for organic bakery items. Coordinate with BakeryFresh vendor.',
  },
  {
    id: 7,
    name: 'Aurangabad',
    city: 'Aurangabad',
    state: 'Maharashtra',
    code: 'BR007',
    manager: 'Sagar Pawar',
    phone: '+91 98765 43216',
    salesNum: 420000,
    salesFormatted: '4,20,000',
    invValue: '2,80,000',
    wasteKg: 180,
    wastePct: '3.1%',
    perf: 'Moderate',
    status: 'Active',
    salesTrend: '↑ 5%',
    invTrend: '↑ 2%',
    wasteTrend: '↓ 10%',
    wastePctTrend: '↓ 0.1%',
    categories: [
      { name: 'Fruits & Vegetables', pct: 44, width: '44%' },
      { name: 'Dairy & Milk', pct: 22, width: '22%' },
      { name: 'Bakery', pct: 14, width: '14%' },
      { name: 'Beverages', pct: 12, width: '12%' },
      { name: 'Others', pct: 8, width: '8%' },
    ],
    aiInsight: 'Cold storage unit optimization will reduce produce waste by an estimated 15%.',
  },
  {
    id: 8,
    name: 'Solapur',
    city: 'Solapur',
    state: 'Maharashtra',
    code: 'BR008',
    manager: 'Kiran Raut',
    phone: '+91 98765 43217',
    salesNum: 360000,
    salesFormatted: '3,60,000',
    invValue: '2,10,000',
    wasteKg: 150,
    wastePct: '2.8%',
    perf: 'Good',
    status: 'Active',
    salesTrend: '↑ 8%',
    invTrend: '↑ 4%',
    wasteTrend: '↓ 14%',
    wastePctTrend: '↓ 0.3%',
    categories: [
      { name: 'Fruits & Vegetables', pct: 39, width: '39%' },
      { name: 'Dairy & Milk', pct: 26, width: '26%' },
      { name: 'Bakery', pct: 15, width: '15%' },
      { name: 'Beverages', pct: 12, width: '12%' },
      { name: 'Others', pct: 8, width: '8%' },
    ],
    aiInsight: 'Pomegranate and grain demand peak on weekends. Pre-stocking schedule advised.',
  },
];

export default function BranchesScreen({ onNavigateTo, showAlert, openActionModal }) {
  // State variables for search, filters, and active branch
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('All Cities');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [perfFilter, setPerfFilter] = useState('All Performance');
  const [mapStatusFilter, setMapStatusFilter] = useState('All Status');
  const [chartMetric, setChartMetric] = useState('Sales');
  const [mapZoom, setMapZoom] = useState(1);

  // Dynamic branch list state
  const [branchesList, setBranchesList] = useState(ALL_BRANCHES);

  // Selected branch in Details view (defaults to Pune Central)
  const [selectedBranch, setSelectedBranch] = useState(ALL_BRANCHES[0]);
  const [detailTab, setDetailTab] = useState('Overview'); // 'Overview' | 'Stock' | 'Waste' | 'Sales'

  // Modals
  const [addBranchModalOpen, setAddBranchModalOpen] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');
  const [newBranchCity, setNewBranchCity] = useState('');
  const [newBranchManager, setNewBranchManager] = useState('');
  const [newBranchPhone, setNewBranchPhone] = useState('');
  const [rowActionModal, setRowActionModal] = useState({ visible: false, branch: null });

  const notify = (title, message) => {
    if (showAlert) {
      showAlert(title, message);
    } else if (Platform.OS === 'web') {
      alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // Filtering
  const filteredBranches = branchesList.filter((b) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      b.name.toLowerCase().includes(term) ||
      b.city.toLowerCase().includes(term) ||
      b.code.toLowerCase().includes(term) ||
      b.manager.toLowerCase().includes(term);

    const matchCity = cityFilter === 'All Cities' || b.city === cityFilter;
    const matchStatus = statusFilter === 'All Status' || b.status === statusFilter;
    const matchPerf = perfFilter === 'All Performance' || b.perf === perfFilter;

    return matchSearch && matchCity && matchStatus && matchPerf;
  });

  const handleSelectBranch = (branch) => {
    setSelectedBranch(branch);
  };

  const handleAddBranchSubmit = () => {
    if (!newBranchName.trim() || !newBranchCity.trim()) {
      notify('Validation Error', 'Please provide branch name and city.');
      return;
    }
    const newId = branchesList.length + 1;
    const paddedCode = `BR${String(newId).padStart(3, '0')}`;
    const newBranch = {
      id: newId,
      name: newBranchName.trim(),
      city: newBranchCity.trim(),
      state: 'Maharashtra',
      code: paddedCode,
      manager: newBranchManager.trim() || 'Store In-charge',
      phone: newBranchPhone.trim() || '+91 98765 00000',
      salesNum: 480000,
      salesFormatted: '4,80,000',
      invValue: '3,20,000',
      wasteKg: 130,
      wastePct: '2.0%',
      perf: 'Good',
      status: 'Active',
      salesTrend: '↑ 10%',
      invTrend: '↑ 6%',
      wasteTrend: '↓ 12%',
      wastePctTrend: '↓ 0.2%',
      categories: [
        { name: 'Fruits & Vegetables', pct: 40, width: '40%' },
        { name: 'Dairy & Milk', pct: 25, width: '25%' },
        { name: 'Bakery', pct: 15, width: '15%' },
        { name: 'Beverages', pct: 12, width: '12%' },
        { name: 'Others', pct: 8, width: '8%' },
      ],
      aiInsight: `${newBranchName.trim()} configured in network. Inventory demand forecasting initiated.`,
    };

    setBranchesList((prev) => [newBranch, ...prev]);
    setSelectedBranch(newBranch);
    setAddBranchModalOpen(false);
    notify('Branch Registered', `Branch "${newBranchName.trim()}" (${paddedCode}) added successfully!`);
    setNewBranchName('');
    setNewBranchCity('');
    setNewBranchManager('');
    setNewBranchPhone('');
  };

  return (
    <View style={styles.container}>
      {/* =====================================================================
          4 TOP KPI CARDS (MATCHING REFERENCE IMAGE)
         ===================================================================== */}
      <View style={styles.kpiRow}>
        {/* KPI 1: Total Branches */}
        <TouchableOpacity
          style={styles.kpiCard}
          onPress={() => notify('Total Branches', `${branchesList.length} total active stores across Maharashtra.`)}
          activeOpacity={0.8}
        >
          <View style={styles.kpiTopRow}>
            <Text style={styles.kpiLabel}>Total Branches</Text>
            <View style={styles.kpiIconCircle}>
              <Text style={styles.kpiIconEmoji}>🏪</Text>
            </View>
          </View>
          <Text style={styles.kpiValue}>{branchesList.length}</Text>
          <View style={styles.kpiBottomRow}>
            <Text style={styles.kpiSubText}>Active branches</Text>
            <Text style={styles.kpiGreenTrend}>↑ 0%</Text>
          </View>
        </TouchableOpacity>

        {/* KPI 2: Active Branches */}
        <TouchableOpacity
          style={styles.kpiCard}
          onPress={() => notify('Active Branches', '100% of branches operating normally.')}
          activeOpacity={0.8}
        >
          <View style={styles.kpiTopRow}>
            <Text style={styles.kpiLabel}>Active Branches</Text>
            <View style={styles.kpiIconCircle}>
              <Text style={styles.kpiIconEmoji}>📍</Text>
            </View>
          </View>
          <Text style={styles.kpiValue}>
            {branchesList.filter((b) => b.status === 'Active').length}
          </Text>
          <View style={styles.kpiBottomRow}>
            <Text style={styles.kpiSubText}>100% of total</Text>
          </View>
        </TouchableOpacity>

        {/* KPI 3: Under Review */}
        <TouchableOpacity
          style={styles.kpiCard}
          onPress={() => notify('Under Review', '0 stores currently under review.')}
          activeOpacity={0.8}
        >
          <View style={styles.kpiTopRow}>
            <Text style={styles.kpiLabel}>Under Review</Text>
            <View style={styles.kpiIconCircle}>
              <Text style={styles.kpiIconEmoji}>⏳</Text>
            </View>
          </View>
          <Text style={styles.kpiValue}>
            {branchesList.filter((b) => b.status === 'Under Review').length}
          </Text>
          <View style={styles.kpiBottomRow}>
            <Text style={styles.kpiSubText}>0% of total</Text>
          </View>
        </TouchableOpacity>

        {/* KPI 4: Closed Branches */}
        <TouchableOpacity
          style={styles.kpiCard}
          onPress={() => notify('Closed Branches', '0 permanently or temporarily closed stores.')}
          activeOpacity={0.8}
        >
          <View style={styles.kpiTopRow}>
            <Text style={styles.kpiLabel}>Closed Branches</Text>
            <View style={[styles.kpiIconCircle, { backgroundColor: '#FEE2E2' }]}>
              <Text style={styles.kpiIconEmoji}>🏬</Text>
            </View>
          </View>
          <Text style={styles.kpiValue}>
            {branchesList.filter((b) => b.status === 'Closed').length}
          </Text>
          <View style={styles.kpiBottomRow}>
            <Text style={styles.kpiSubText}>0% of total</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* =====================================================================
          MIDDLE ROW: BRANCH LOCATIONS (MAP) | BRANCH PERFORMANCE | BRANCH DETAILS
         ===================================================================== */}
      <View style={styles.middleRowSplit}>
        {/* Left Sub-Group: Map + Bar Chart */}
        <View style={styles.mapAndChartGroup}>
          {/* 1. Branch Locations Map Card */}
          <View style={[styles.dashboardCard, { flex: 1.1 }]}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardTitle}>Branch Locations</Text>
              <TouchableOpacity
                style={styles.headerDropdownPill}
                onPress={() => {
                  const next = mapStatusFilter === 'All Status' ? 'Active' : mapStatusFilter === 'Active' ? 'Needs Attention' : 'All Status';
                  setMapStatusFilter(next);
                  if (showAlert) showAlert('Map Filter', `Filtered by: ${next}`);
                }}
              >
                <Text style={styles.headerDropdownText}>{mapStatusFilter} ▼</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mapCanvasWrapper}>
              <View style={styles.mapWaterCoast} />
              <View style={[styles.mapTerrain, { transform: [{ scale: mapZoom }] }]}>
                {/* Nashik Pin */}
                <TouchableOpacity
                  style={[styles.mapPin, { top: 38, left: '32%' }]}
                  onPress={() => {
                    const b = branchesList.find((x) => x.city === 'Nashik') || branchesList[0];
                    handleSelectBranch(b);
                  }}
                >
                  <View style={[styles.pinDot, { backgroundColor: COLORS.brightGreen }]} />
                  <Text style={styles.pinText}>Nashik</Text>
                </TouchableOpacity>

                {/* Mumbai Pin */}
                <TouchableOpacity
                  style={[styles.mapPin, { top: 82, left: '16%' }]}
                  onPress={() => {
                    const b = branchesList.find((x) => x.city === 'Mumbai') || branchesList[0];
                    handleSelectBranch(b);
                  }}
                >
                  <View style={[styles.pinDot, { backgroundColor: COLORS.accentOrange }]} />
                  <Text style={styles.pinText}>Mumbai</Text>
                </TouchableOpacity>

                {/* Pune Pin (Active highlighted) */}
                <TouchableOpacity
                  style={[styles.mapPin, { top: 98, left: '46%' }]}
                  onPress={() => {
                    const b = branchesList.find((x) => x.city === 'Pune') || branchesList[0];
                    handleSelectBranch(b);
                  }}
                >
                  <View style={[styles.pinDot, { backgroundColor: COLORS.brightGreen, width: 14, height: 14 }]} />
                  <Text style={[styles.pinText, { fontWeight: '800', color: COLORS.darkGreen }]}>Pune ★</Text>
                </TouchableOpacity>

                {/* Kolhapur Pin */}
                <TouchableOpacity
                  style={[styles.mapPin, { top: 156, left: '38%' }]}
                  onPress={() => {
                    const b = branchesList.find((x) => x.city === 'Kolhapur') || branchesList[0];
                    handleSelectBranch(b);
                  }}
                >
                  <View style={[styles.pinDot, { backgroundColor: COLORS.brightGreen }]} />
                  <Text style={styles.pinText}>Kolhapur</Text>
                </TouchableOpacity>

                {/* Nagpur Pin */}
                <TouchableOpacity
                  style={[styles.mapPin, { top: 50, right: '14%' }]}
                  onPress={() => {
                    const b = branchesList.find((x) => x.city === 'Nagpur') || branchesList[0];
                    handleSelectBranch(b);
                  }}
                >
                  <View style={[styles.pinDot, { backgroundColor: COLORS.accentRed }]} />
                  <Text style={styles.pinText}>Nagpur</Text>
                </TouchableOpacity>
              </View>

              {/* Map Zoom Controls on Left */}
              <View style={styles.mapZoomControls}>
                <TouchableOpacity
                  style={styles.zoomBtn}
                  onPress={() => setMapZoom((z) => Math.min(z + 0.2, 1.8))}
                >
                  <Text style={styles.zoomBtnText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.zoomBtn}
                  onPress={() => setMapZoom((z) => Math.max(z - 0.2, 0.8))}
                >
                  <Text style={styles.zoomBtnText}>-</Text>
                </TouchableOpacity>
              </View>

              {/* Map Legend Box Bottom Right */}
              <View style={styles.mapLegendBox}>
                <View style={styles.legendRow}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.brightGreen }]} />
                  <Text style={styles.legendText}>High Performance</Text>
                </View>
                <View style={styles.legendRow}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.accentOrange }]} />
                  <Text style={styles.legendText}>Moderate</Text>
                </View>
                <View style={styles.legendRow}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.accentRed }]} />
                  <Text style={styles.legendText}>Needs Attention</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 2. Branch Performance Bar Chart Card */}
          <View style={[styles.dashboardCard, { flex: 1.1 }]}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardTitle}>Branch Performance</Text>
              <TouchableOpacity
                style={styles.headerDropdownPill}
                onPress={() => {
                  const next = chartMetric === 'Sales' ? 'Waste' : 'Sales';
                  setChartMetric(next);
                }}
              >
                <Text style={styles.headerDropdownText}>{chartMetric} ▼</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.chartLegendIndicator}>
              <View style={styles.chartDotGreen} />
              <Text style={styles.chartLegendLabel}>Total Sales (₹)</Text>
            </View>

            <View style={styles.perfBarChartBox}>
              {/* Y Axis Labels */}
              <View style={styles.yAxisLabelsCol}>
                <Text style={styles.yAxisSmall}>16L</Text>
                <Text style={styles.yAxisSmall}>12L</Text>
                <Text style={styles.yAxisSmall}>8L</Text>
                <Text style={styles.yAxisSmall}>4L</Text>
                <Text style={styles.yAxisSmall}>0</Text>
              </View>

              {/* Bars Columns */}
              <View style={styles.barsGroupArea}>
                {[
                  { city: 'Pune', valueStr: '₹12.4L', height: 110 },
                  { city: 'Mumbai', valueStr: '₹11.8L', height: 104 },
                  { city: 'Nashik', valueStr: '₹8.5L', height: 75 },
                  { city: 'Nagpur', valueStr: '₹7.2L', height: 63 },
                  { city: 'Kolhapur', valueStr: '₹5.4L', height: 48 },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.city}
                    style={styles.singleBarCol}
                    onPress={() => {
                      const found = branchesList.find((b) => b.city === item.city);
                      if (found) handleSelectBranch(found);
                    }}
                  >
                    <Text style={styles.barTopValueText}>{item.valueStr}</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { height: item.height }]} />
                    </View>
                    <Text style={styles.barBottomCityText}>{item.city}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Right Column: Branch Details Panel (Exact Match) */}
        <View style={styles.branchDetailsPanel}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Branch Details</Text>
            <TouchableOpacity
              style={styles.branchSelectPill}
              onPress={() => {
                const currentIdx = branchesList.findIndex((b) => b.id === selectedBranch.id);
                const nextIdx = (currentIdx + 1) % branchesList.length;
                setSelectedBranch(branchesList[nextIdx]);
              }}
            >
              <Text style={styles.branchSelectPillText}>{selectedBranch.name} ▼</Text>
            </TouchableOpacity>
          </View>

          {/* Store Info Header */}
          <View style={styles.storeHeaderRow}>
            <View style={styles.storeThumbBox}>
              <Text style={{ fontSize: 22 }}>🏪</Text>
            </View>
            <View style={styles.storeInfoTextWrap}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={styles.storeMainName}>{selectedBranch.name}</Text>
                <View style={styles.activePillBadge}>
                  <Text style={styles.activePillText}>{selectedBranch.status}</Text>
                </View>
              </View>
              <Text style={styles.storeDetailLine}>📍 {selectedBranch.city}, {selectedBranch.state}</Text>
              <Text style={styles.storeDetailLine}>🏷️ {selectedBranch.code}</Text>
              <Text style={styles.storeDetailLine}>👤 {selectedBranch.manager}</Text>
              <Text style={styles.storeDetailLine}>📞 {selectedBranch.phone}</Text>
            </View>
          </View>

          {/* Details Subtabs: Overview | Stock | Waste | Sales */}
          <View style={styles.detailTabsStrip}>
            {['Overview', 'Stock', 'Waste', 'Sales'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.detailTabItem, detailTab === tab && styles.detailTabItemActive]}
                onPress={() => setDetailTab(tab)}
              >
                <Text style={[styles.detailTabText, detailTab === tab && styles.detailTabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {detailTab === 'Overview' && (
            <>
              {/* 2x2 Metrics Grid */}
              <View style={styles.detailMetricsGrid}>
                <View style={styles.metricCardMini}>
                  <Text style={styles.metricMiniLabel}>Total Sales</Text>
                  <Text style={styles.metricMiniValue}>₹ {selectedBranch.salesFormatted}</Text>
                  <Text style={styles.metricTrendGreen}>{selectedBranch.salesTrend}</Text>
                </View>

                <View style={styles.metricCardMini}>
                  <Text style={styles.metricMiniLabel}>Inventory Value</Text>
                  <Text style={styles.metricMiniValue}>₹ {selectedBranch.invValue}</Text>
                  <Text style={styles.metricTrendGreen}>{selectedBranch.invTrend}</Text>
                </View>

                <View style={styles.metricCardMini}>
                  <Text style={styles.metricMiniLabel}>Food Waste</Text>
                  <Text style={styles.metricMiniValue}>{selectedBranch.wasteKg} kg</Text>
                  <Text style={styles.metricTrendGreen}>{selectedBranch.wasteTrend}</Text>
                </View>

                <View style={styles.metricCardMini}>
                  <Text style={styles.metricMiniLabel}>Waste Percentage</Text>
                  <Text style={styles.metricMiniValue}>{selectedBranch.wastePct}</Text>
                  <Text style={styles.metricTrendGreen}>{selectedBranch.wastePctTrend}</Text>
                </View>
              </View>

              {/* Top Selling Categories */}
              <View style={styles.categoriesSection}>
                <Text style={styles.sectionHeading}>Top Selling Categories</Text>
                <View style={styles.categoryProgressList}>
                  {selectedBranch.categories.map((c) => (
                    <View key={c.name} style={styles.catProgressRow}>
                      <Text style={styles.catNameLabel}>{c.name}</Text>
                      <View style={styles.catProgressBarTrack}>
                        <View style={[styles.catProgressBarFill, { width: c.width }]} />
                      </View>
                      <Text style={styles.catPctLabel}>{c.pct}%</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* AI Insight Box */}
              <View style={styles.aiInsightBox}>
                <View style={styles.aiInsightTitleRow}>
                  <View style={styles.aiLeafCircle}>
                    <Text style={{ fontSize: 13 }}>🍃</Text>
                  </View>
                  <Text style={styles.aiInsightTitle}>AI Insight</Text>
                </View>
                <Text style={styles.aiInsightText}>{selectedBranch.aiInsight}</Text>
              </View>
            </>
          )}

          {detailTab === 'Stock' && (
            <View style={{ gap: 8, paddingVertical: 4 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F0F5F2' }}>
                <Text style={{ fontSize: 11, color: COLORS.bodyText, fontWeight: '600' }}>🥦 Fruits & Veg</Text>
                <Text style={{ fontSize: 11.5, color: COLORS.darkGreen, fontWeight: '700' }}>8,420 units (Normal)</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F0F5F2' }}>
                <Text style={{ fontSize: 11, color: COLORS.bodyText, fontWeight: '600' }}>🥛 Dairy & Milk</Text>
                <Text style={{ fontSize: 11.5, color: COLORS.accentOrange, fontWeight: '700' }}>3,120 units (Restock in 24h)</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F0F5F2' }}>
                <Text style={{ fontSize: 11, color: COLORS.bodyText, fontWeight: '600' }}>🍞 Bakery</Text>
                <Text style={{ fontSize: 11.5, color: COLORS.darkGreen, fontWeight: '700' }}>1,850 units (Optimal)</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F0F5F2' }}>
                <Text style={{ fontSize: 11, color: COLORS.bodyText, fontWeight: '600' }}>🥤 Beverages</Text>
                <Text style={{ fontSize: 11.5, color: COLORS.darkGreen, fontWeight: '700' }}>2,400 units (Optimal)</Text>
              </View>
              <TouchableOpacity
                style={{ backgroundColor: COLORS.primaryGreen, paddingVertical: 8, borderRadius: 6, alignItems: 'center', marginTop: 6 }}
                onPress={() => notify('Replenishment Dispatched', `Automated PO generated for ${selectedBranch.name}.`)}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700' }}>📦 Generate Restock PO</Text>
              </TouchableOpacity>
            </View>
          )}

          {detailTab === 'Waste' && (
            <View style={{ gap: 8, paddingVertical: 4 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F0F5F2' }}>
                <Text style={{ fontSize: 11, color: COLORS.bodyText, fontWeight: '600' }}>Spoilage Rate</Text>
                <Text style={{ fontSize: 11.5, color: COLORS.accentRed, fontWeight: '700' }}>180 kg (56%)</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F0F5F2' }}>
                <Text style={{ fontSize: 11, color: COLORS.bodyText, fontWeight: '600' }}>Expiry Write-off</Text>
                <Text style={{ fontSize: 11.5, color: COLORS.accentOrange, fontWeight: '700' }}>78 kg (24%)</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F0F5F2' }}>
                <Text style={{ fontSize: 11, color: COLORS.bodyText, fontWeight: '600' }}>Transit Handling</Text>
                <Text style={{ fontSize: 11.5, color: COLORS.bodyText, fontWeight: '700' }}>62 kg (20%)</Text>
              </View>
              <TouchableOpacity
                style={{ backgroundColor: COLORS.sidebarActivePill, paddingVertical: 8, borderRadius: 6, alignItems: 'center', marginTop: 6 }}
                onPress={() => notify('Dynamic Markdown Active', `Applied 20% discount on 48h shelf-life items at ${selectedBranch.name}.`)}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700' }}>🏷️ Trigger Markdown Rule (20% Off)</Text>
              </TouchableOpacity>
            </View>
          )}

          {detailTab === 'Sales' && (
            <View style={{ gap: 8, paddingVertical: 4 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F0F5F2' }}>
                <Text style={{ fontSize: 11, color: COLORS.bodyText, fontWeight: '600' }}>Peak Footfall</Text>
                <Text style={{ fontSize: 11.5, color: COLORS.darkGreen, fontWeight: '700' }}>6:00 PM – 9:00 PM</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F0F5F2' }}>
                <Text style={{ fontSize: 11, color: COLORS.bodyText, fontWeight: '600' }}>Average Basket</Text>
                <Text style={{ fontSize: 11.5, color: COLORS.darkGreen, fontWeight: '700' }}>₹ 680 (12 items)</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F0F5F2' }}>
                <Text style={{ fontSize: 11, color: COLORS.bodyText, fontWeight: '600' }}>UPI Payment Share</Text>
                <Text style={{ fontSize: 11.5, color: COLORS.brightGreen, fontWeight: '700' }}>68% of transactions</Text>
              </View>
              <TouchableOpacity
                style={{ backgroundColor: COLORS.sidebarActivePill, paddingVertical: 8, borderRadius: 6, alignItems: 'center', marginTop: 6 }}
                onPress={() => notify('Export Ledger', `Detailed sales transaction ledger for ${selectedBranch.name} exported.`)}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700' }}>📊 Export Sales Ledger</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* =====================================================================
          BOTTOM SECTION: ALL BRANCHES (8) TABLE
         ===================================================================== */}
      <View style={styles.allBranchesCard}>
        {/* Table Top Controls Bar */}
        <View style={styles.tableControlsBar}>
          <Text style={styles.allBranchesTitle}>All Branches ({filteredBranches.length})</Text>

          {/* Search Input */}
          <View style={styles.tableSearchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.tableSearchInput}
              placeholder="Search branch by name, city, or code..."
              placeholderTextColor="#879B90"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          {/* Filters */}
          <TouchableOpacity
            style={styles.tableFilterDropdown}
            onPress={() => {
              const cities = ['All Cities', 'Pune', 'Mumbai', 'Nashik', 'Nagpur', 'Kolhapur', 'Thane', 'Aurangabad', 'Solapur'];
              const nextIdx = (cities.indexOf(cityFilter) + 1) % cities.length;
              setCityFilter(cities[nextIdx]);
            }}
          >
            <Text style={styles.tableFilterText}>{cityFilter} ▼</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tableFilterDropdown}
            onPress={() => {
              const statuses = ['All Status', 'Active', 'Inactive'];
              const next = statusFilter === 'All Status' ? 'Active' : 'All Status';
              setStatusFilter(next);
            }}
          >
            <Text style={styles.tableFilterText}>{statusFilter} ▼</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tableFilterDropdown}
            onPress={() => {
              const perfs = ['All Performance', 'High', 'Moderate', 'Good'];
              const nextIdx = (perfs.indexOf(perfFilter) + 1) % perfs.length;
              setPerfFilter(perfs[nextIdx]);
            }}
          >
            <Text style={styles.tableFilterText}>{perfFilter} ▼</Text>
          </TouchableOpacity>

          {/* Add Branch Button */}
          <TouchableOpacity
            style={styles.addBranchPrimaryBtn}
            onPress={() => setAddBranchModalOpen(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.addBranchBtnText}>+ Add Branch</Text>
          </TouchableOpacity>
        </View>

        {/* Table Header */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ minWidth: 1040 }}>
            <View style={styles.branchTableHeaderRow}>
              <Text style={[styles.bTh, { width: 30 }]}>#</Text>
              <Text style={[styles.bTh, { width: 140 }]}>Branch Name</Text>
              <Text style={[styles.bTh, { width: 100 }]}>City</Text>
              <Text style={[styles.bTh, { width: 80 }]}>Code</Text>
              <Text style={[styles.bTh, { width: 140 }]}>Manager</Text>
              <Text style={[styles.bTh, { width: 110, textAlign: 'right' }]}>Total Sales (₹)</Text>
              <Text style={[styles.bTh, { width: 120, textAlign: 'right' }]}>Inventory Value (₹)</Text>
              <Text style={[styles.bTh, { width: 100, textAlign: 'right' }]}>Food Waste (kg)</Text>
              <Text style={[styles.bTh, { width: 80, textAlign: 'right' }]}>Waste %</Text>
              <Text style={[styles.bTh, { width: 100, textAlign: 'center' }]}>Performance</Text>
              <Text style={[styles.bTh, { width: 80, textAlign: 'center' }]}>Status</Text>
              <Text style={[styles.bTh, { width: 60, textAlign: 'center' }]}>Actions</Text>
            </View>

            {/* Table Rows */}
            {filteredBranches.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.branchTableRow,
                  selectedBranch.id === item.id && styles.branchTableRowSelected,
                ]}
                onPress={() => handleSelectBranch(item)}
                activeOpacity={0.75}
              >
                <Text style={[styles.bTdText, { width: 30 }]}>{item.id}</Text>

                {/* Branch Name with Icon */}
                <View style={[styles.branchNameCell, { width: 140 }]}>
                  <View style={styles.storeSmallIconBox}>
                    <Text style={{ fontSize: 13 }}>🏪</Text>
                  </View>
                  <Text style={styles.branchNameText} numberOfLines={1}>{item.name}</Text>
                </View>

                <Text style={[styles.bTdText, { width: 100 }]}>{item.city}</Text>
                <Text style={[styles.bTdCode, { width: 80 }]}>{item.code}</Text>
                <Text style={[styles.bTdText, { width: 140 }]} numberOfLines={1}>{item.manager}</Text>
                <Text style={[styles.bTdBold, { width: 110, textAlign: 'right' }]}>{item.salesFormatted}</Text>
                <Text style={[styles.bTdText, { width: 120, textAlign: 'right' }]}>{item.invValue}</Text>
                <Text style={[styles.bTdText, { width: 100, textAlign: 'right' }]}>{item.wasteKg}</Text>
                <Text style={[styles.bTdText, { width: 80, textAlign: 'right' }]}>{item.wastePct}</Text>

                {/* Performance Pill */}
                <View style={{ width: 100, alignItems: 'center' }}>
                  <View
                    style={[
                      styles.perfPill,
                      item.perf === 'High' && styles.perfPillHigh,
                      item.perf === 'Moderate' && styles.perfPillModerate,
                      item.perf === 'Good' && styles.perfPillGood,
                    ]}
                  >
                    <Text
                      style={[
                        styles.perfPillText,
                        item.perf === 'High' && styles.perfPillTextHigh,
                        item.perf === 'Moderate' && styles.perfPillTextModerate,
                        item.perf === 'Good' && styles.perfPillTextGood,
                      ]}
                    >
                      {item.perf}
                    </Text>
                  </View>
                </View>

                {/* Status Pill */}
                <View style={{ width: 80, alignItems: 'center' }}>
                  <View style={styles.activeStatusPill}>
                    <Text style={styles.activeStatusText}>{item.status}</Text>
                  </View>
                </View>

                {/* Action 3 Dots */}
                <TouchableOpacity
                  style={{ width: 60, alignItems: 'center', paddingVertical: 4 }}
                  onPress={() => setRowActionModal({ visible: true, branch: item })}
                >
                  <Text style={styles.threeDotsText}>⋮</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Table Footer with Pagination */}
        <View style={styles.tableFooterRow}>
          <Text style={styles.paginationInfoText}>
            Showing 1 to {filteredBranches.length} of {branchesList.length} branches
          </Text>

          <View style={styles.paginationBtnsWrap}>
            <TouchableOpacity
              style={styles.pageArrowBtn}
              onPress={() => notify('Pagination', 'Already on the first page.')}
            >
              <Text style={styles.pageArrowText}>‹</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.pageNumberBtnActive}>
              <Text style={styles.pageNumberTextActive}>1</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pageArrowBtn}
              onPress={() => notify('Pagination', `Displaying all available ${branchesList.length} stores.`)}
            >
              <Text style={styles.pageArrowText}>›</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* =====================================================================
          ADD BRANCH MODAL
         ===================================================================== */}
      <Modal visible={addBranchModalOpen} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Add New Branch</Text>
              <TouchableOpacity onPress={() => setAddBranchModalOpen(false)}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Branch Name *</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g. Pune East"
                  value={newBranchName}
                  onChangeText={setNewBranchName}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>City *</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g. Pune"
                  value={newBranchCity}
                  onChangeText={setNewBranchCity}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Store Manager Name</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g. Rahul Patil"
                  value={newBranchManager}
                  onChangeText={setNewBranchManager}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Contact Phone</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g. +91 98765 43218"
                  value={newBranchPhone}
                  onChangeText={setNewBranchPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.modalFooterActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setAddBranchModalOpen(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSubmitBtn}
                onPress={handleAddBranchSubmit}
              >
                <Text style={styles.modalSubmitText}>Register Branch</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* =====================================================================
          ROW ACTION MODAL (3-DOTS)
         ===================================================================== */}
      <Modal visible={rowActionModal.visible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.rowActionCard}>
            <Text style={styles.modalTitle}>
              {rowActionModal.branch?.name} ({rowActionModal.branch?.code})
            </Text>
            <Text style={{ fontSize: 11.5, color: COLORS.mutedText, marginBottom: 8 }}>
              Manager: {rowActionModal.branch?.manager}
            </Text>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => {
                const b = rowActionModal.branch;
                setRowActionModal({ visible: false, branch: null });
                handleSelectBranch(b);
              }}
            >
              <Text style={styles.actionItemText}>👁️ View Branch Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => {
                const b = rowActionModal.branch;
                setRowActionModal({ visible: false, branch: null });
                if (showAlert) showAlert('Edit Branch', `Opening configuration for ${b?.name}.`);
              }}
            >
              <Text style={styles.actionItemText}>✏️ Edit Branch Info</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => {
                const b = rowActionModal.branch;
                setRowActionModal({ visible: false, branch: null });
                if (showAlert) showAlert('Inventory Audit', `Running inventory reconciliation for ${b?.name}.`);
              }}
            >
              <Text style={styles.actionItemText}>📦 Audit Store Inventory</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => {
                const b = rowActionModal.branch;
                setRowActionModal({ visible: false, branch: null });
                if (showAlert) showAlert('Call Manager', `Calling ${b?.manager} at ${b?.phone}.`);
              }}
            >
              <Text style={styles.actionItemText}>📞 Call Store Manager</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalCancelBtn, { marginTop: 8, alignItems: 'center' }]}
              onPress={() => setRowActionModal({ visible: false, branch: null })}
            >
              <Text style={styles.modalCancelText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  // 4 Top KPI Row
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.mintBadgeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiIconEmoji: {
    fontSize: 13,
  },
  kpiValue: {
    fontSize: 22,
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
  kpiSubText: {
    fontSize: 10.5,
    color: COLORS.mutedText,
  },
  kpiGreenTrend: {
    fontSize: 10.5,
    fontWeight: '700',
    color: COLORS.brightGreen,
  },
  // Middle Row Split (Left sub-group + Right Panel)
  middleRowSplit: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  mapAndChartGroup: {
    flex: 2.2,
    minWidth: 540,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  branchDetailsPanel: {
    flex: 1.2,
    minWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dashboardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 250,
  },
  cardHeaderRow: {
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
  headerDropdownPill: {
    backgroundColor: '#F3F6F4',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerDropdownText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.darkGreen,
  },
  // Map Canvas
  mapCanvasWrapper: {
    height: 180,
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
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  pinText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.darkGreen,
    marginTop: 2,
    backgroundColor: 'rgba(255,255,255,0.88)',
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  mapZoomControls: {
    position: 'absolute',
    top: 8,
    left: 8,
    gap: 4,
  },
  zoomBtn: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  mapLegendBox: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 6,
    padding: 5,
    gap: 3,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 8.5,
    fontWeight: '600',
    color: COLORS.darkGreen,
  },
  // Bar Chart
  chartLegendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6,
  },
  chartDotGreen: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.primaryGreen,
  },
  chartLegendLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.bodyText,
  },
  perfBarChartBox: {
    flexDirection: 'row',
    height: 140,
    alignItems: 'flex-end',
    paddingTop: 8,
  },
  yAxisLabelsCol: {
    width: 24,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 4,
  },
  yAxisSmall: {
    fontSize: 9,
    color: COLORS.mutedText,
  },
  barsGroupArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '100%',
    alignItems: 'flex-end',
  },
  singleBarCol: {
    alignItems: 'center',
    gap: 4,
  },
  barTopValueText: {
    fontSize: 8.5,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  barTrack: {
    width: 18,
    height: 110,
    backgroundColor: '#EEF3F0',
    borderRadius: 4,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 4,
  },
  barBottomCityText: {
    fontSize: 9,
    color: COLORS.mutedText,
  },
  // Right Panel: Branch Details
  branchSelectPill: {
    backgroundColor: '#F3F6F4',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  branchSelectPillText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: COLORS.darkGreen,
  },
  storeHeaderRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  storeThumbBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#E8F3ED',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D4E6DC',
  },
  storeInfoTextWrap: {
    flex: 1,
    gap: 2,
  },
  storeMainName: {
    fontSize: 13.5,
    fontWeight: '800',
    color: COLORS.darkGreen,
  },
  activePillBadge: {
    backgroundColor: COLORS.mintBadgeBg,
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  activePillText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.primaryGreen,
  },
  storeDetailLine: {
    fontSize: 10,
    color: COLORS.bodyText,
  },
  // Details Subtabs
  detailTabsStrip: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 10,
  },
  detailTabItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  detailTabItemActive: {
    borderBottomColor: COLORS.primaryGreen,
  },
  detailTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.mutedText,
  },
  detailTabTextActive: {
    color: COLORS.primaryGreen,
    fontWeight: '800',
  },
  // Details Metrics Grid
  detailMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  metricCardMini: {
    flex: 1,
    minWidth: 130,
    backgroundColor: '#FAFCFA',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 8,
  },
  metricMiniLabel: {
    fontSize: 9.5,
    color: COLORS.mutedText,
    marginBottom: 2,
  },
  metricMiniValue: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.darkGreen,
  },
  metricTrendGreen: {
    fontSize: 9.5,
    fontWeight: '700',
    color: COLORS.brightGreen,
    marginTop: 2,
  },
  // Categories Section
  categoriesSection: {
    gap: 6,
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  categoryProgressList: {
    gap: 5,
  },
  catProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  catNameLabel: {
    fontSize: 10,
    color: COLORS.darkGreen,
    width: 95,
  },
  catProgressBarTrack: {
    flex: 1,
    height: 5,
    backgroundColor: '#EEF3F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  catProgressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 3,
  },
  catPctLabel: {
    fontSize: 9.5,
    fontWeight: '600',
    color: COLORS.mutedText,
    width: 28,
    textAlign: 'right',
  },
  // AI Insight Box
  aiInsightBox: {
    backgroundColor: '#F3FAF6',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#D7EDE0',
    gap: 4,
  },
  aiInsightTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aiLeafCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E2F3E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiInsightTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primaryGreen,
  },
  aiInsightText: {
    fontSize: 10,
    color: COLORS.bodyText,
    lineHeight: 14,
  },
  // Bottom Table Card: All Branches (8)
  allBranchesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tableControlsBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  allBranchesTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.darkGreen,
  },
  tableSearchBox: {
    flex: 1,
    minWidth: 200,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 34,
    gap: 6,
  },
  searchIcon: {
    fontSize: 12,
  },
  tableSearchInput: {
    flex: 1,
    fontSize: 11.5,
    color: COLORS.darkGreen,
    outlineStyle: 'none',
  },
  tableFilterDropdown: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 34,
    justifyContent: 'center',
  },
  tableFilterText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.darkGreen,
  },
  addBranchPrimaryBtn: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 6,
    paddingHorizontal: 14,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBranchBtnText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '700',
  },
  // Table Styling
  branchTableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  bTh: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.mutedText,
    textTransform: 'uppercase',
  },
  branchTableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F7F5',
  },
  branchTableRowSelected: {
    backgroundColor: '#F3FAF6',
  },
  bTdText: {
    fontSize: 11.5,
    color: COLORS.bodyText,
  },
  bTdCode: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.mutedText,
  },
  bTdBold: {
    fontSize: 11.5,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  branchNameCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  storeSmallIconBox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: '#EEF6F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  branchNameText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: COLORS.darkGreen,
    flex: 1,
  },
  perfPill: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  perfPillHigh: { backgroundColor: COLORS.mintBadgeBg },
  perfPillModerate: { backgroundColor: COLORS.accentOrangeBg },
  perfPillGood: { backgroundColor: '#E0F2FE' },
  perfPillText: { fontSize: 9.5, fontWeight: '700' },
  perfPillTextHigh: { color: COLORS.primaryGreen },
  perfPillTextModerate: { color: COLORS.accentOrange },
  perfPillTextGood: { color: COLORS.accentBlue },
  activeStatusPill: {
    backgroundColor: COLORS.mintBadgeBg,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  activeStatusText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: COLORS.primaryGreen,
  },
  threeDotsText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.mutedText,
  },
  // Table Footer
  tableFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    marginTop: 4,
  },
  paginationInfoText: {
    fontSize: 11,
    color: COLORS.mutedText,
  },
  paginationBtnsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pageArrowBtn: {
    width: 26,
    height: 26,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  pageArrowText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.darkGreen,
  },
  pageNumberBtnActive: {
    width: 26,
    height: 26,
    borderRadius: 4,
    backgroundColor: COLORS.primaryGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageNumberTextActive: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  // Modals
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(9, 33, 23, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.darkGreen,
  },
  modalCloseText: {
    fontSize: 16,
    color: COLORS.mutedText,
    fontWeight: '700',
  },
  formContainer: {
    gap: 10,
  },
  formGroup: {
    gap: 4,
  },
  formLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.darkGreen,
  },
  formInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 36,
    fontSize: 12,
    color: COLORS.darkGreen,
    outlineStyle: 'none',
  },
  modalFooterActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 16,
  },
  modalCancelBtn: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalCancelText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: COLORS.bodyText,
  },
  modalSubmitBtn: {
    backgroundColor: COLORS.primaryGreen,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  modalSubmitText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '700',
  },
  rowActionCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 6,
  },
  actionItem: {
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F7F5',
  },
  actionItemText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.darkGreen,
  },
});
