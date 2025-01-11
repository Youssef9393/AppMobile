import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const Dashboard = () => {
  // Sample data for groups and their balances
  const groupData = [
    { id: '1', name: 'Groupe A', balance: 1200, color: '#FF6384' },
    { id: '2', name: 'Groupe B', balance: 800, color: '#36A2EB' },
    { id: '3', name: 'Groupe C', balance: 1500, color: '#FFCE56' },
    { id: '4', name: 'Groupe D', balance: 500, color: '#4BC0C0' },
  ];

  // Format data for the PieChart
  const pieChartData = groupData.map(group => ({
    name: group.name,
    population: group.balance, // Use "population" as the value (required by PieChart)
    color: group.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  // Total users and groups
  const totalUsers = 150; // Static example value
  const totalGroups = groupData.length; // Dynamic based on groupData

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Title */}
      <Text style={styles.headerTitle}>Dashboard</Text>

      {/* Top Section: Total Users and Groups */}
      <View style={styles.topSection}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Total Users</Text>
          <Text style={styles.infoValue}>{totalUsers}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Total Groups</Text>
          <Text style={styles.infoValue}>{totalGroups}</Text>
        </View>
      </View>

      {/* Scrollable Categories Section */}
      <View style={styles.categorySection}>
        <Text style={styles.categoryTitle}>Groupes</Text>
        <FlatList
          data={groupData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.groupItem}>
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={styles.groupBalance}>{item.balance} €</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Pie Chart Section */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Répartition des Soldes par Groupe</Text>
        <PieChart
          data={pieChartData}
          width={Dimensions.get('window').width - 40} // Full width with padding
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population" // Value field for the pie chart
          backgroundColor="transparent"
          paddingLeft="15"
          absolute // Show percentage values inside the chart
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
    color: '#333',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoBox: {
    alignItems: 'center',
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  infoValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  categorySection: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  groupItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  groupName: {
    fontSize: 16,
    color: '#555',
  },
  groupBalance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Dashboard;
