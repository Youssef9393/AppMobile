import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminId = await AsyncStorage.getItem('userId');
        if (!adminId) {
          setError("Impossible de récupérer l'ID de l'admin.");
          setLoading(false);
          return;
        }

        const response = await axios.get('http://100.69.121.82:5000/groups', { params: { adminId }, headers: { "Content-Type": "application/json", Accept: "application/json" } });

        if (response.data) {
          setGroups(response.data);
          setTotalUsers(response.data.reduce((sum, group) => sum + group.participants.length, 0)); // Total participants
        } else {
          setError("Aucun groupe trouvé.");
        }
      } catch (err) {
        setError("Erreur de récupération des groupes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format data for Pie Chart
  const pieChartData = groups.map(group => ({
    name: group.name,
    population: group.price || 0, 
    color: getRandomColor(),
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  // Prepare BarChart data
  const barChartData = {
    labels: groups.map(group => group.name),
    datasets: [{
      data: groups.map(group => group.price || 0)
    }]
  };

  // Prepare LineChart data
  const lineChartData = {
    labels: groups.map(group => group.name),
    datasets: [{
      data: groups.map(group => group.price || 0)
    }]
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Dashboard</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          {/* Statistiques */}
          <View style={styles.topSection}>
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Total Utilisateurs</Text>
              <Text style={styles.infoValue}>{totalUsers}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Total Groupes</Text>
              <Text style={styles.infoValue}>{groups.length}</Text>
            </View>
          </View>

          {/* Liste des groupes */}
          <View style={styles.categorySection}>
            <Text style={styles.categoryTitle}>Groupes</Text>
            <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 300 }}>
              <FlatList
                data={groups}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={styles.groupItem}>
                    <Text style={styles.groupName}>{item.name}</Text>
                    <Text style={styles.groupBalance}>{item.price} €</Text>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
              />
            </ScrollView>
          </View>

          {/* Pie Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Répartition des Soldes par Groupe</Text>
            <PieChart
              data={pieChartData}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>

          {/* Bar Chart */}
         
            <Text style={styles.chartTitle}>Soldes par Groupe (Bar Chart)</Text>
            <BarChart
              data={barChartData}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForLabels: {
                  fontSize: 10,
                },
              }}
              verticalLabelRotation={30}
            />
        

          {/* Line Chart */}
       
            <Text style={styles.chartTitle}>Évolution des Soldes (Line Chart)</Text>
            <LineChart
              data={lineChartData}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForLabels: {
                  fontSize: 10,
                },
              }}
            />
       
        </>
      )}
    </ScrollView>
  );
};

// Function to generate random colors for the groups
let colorIndex = 0;

const getRandomColor = () => {
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
    '#E57373', '#81C784', '#64B5F6', '#FFD54F', '#BA68C8', '#4DB6AC',
    '#F06292', '#7986CB', '#A1887F', '#90A4AE', '#DCE775', '#FF7043',
    '#D4E157', '#FF8A65', '#8D6E63', '#4E342E', '#009688', '#1E88E5'
  ];

  const color = colors[colorIndex % colors.length];
  colorIndex++; // Increment the color index for the next color
  return color;
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
    color: '#333',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 25,
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
    color: 'white',
  },
  infoValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  categorySection: {
    marginBottom: 20,
    backgroundColor: 'black',
    borderRadius: 25,
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
    color: 'white',
  },
  groupItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 10,
    borderBottomColor: '#eee',
  },
  groupName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  groupBalance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  chartContainer: {
    backgroundColor: 'black',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  chartTitle: {
    color:'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Dashboard;
