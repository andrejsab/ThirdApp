import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import { initDB, insertNode, insertEdge, fetchGraphData } from './database';
import { Circle, G, Line, Svg } from 'react-native-svg';
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3-shape';
import Constants from 'expo-constants';
export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  
/*  useEffect(() => {
    initDB();
    insertNode('Node1', (id1) => {
      insertNode('Node2', (id2) => {
        insertEdge(id1, id2);
        fetchData();
      });
    });
  }, []);
*/
  const fetchData = () => {
    fetchGraphData((fetchedNodes, fetchedEdges) => {
      setNodes(fetchedNodes);
      setEdges(fetchedEdges);
    });
  };

  const createLinks = edges => {
    if (!nodes || nodes.length === 0) return null;
    return edges.map((edge, index) => {
      const fromNode = nodes.find(n => n.id === edge.fromNode);
      const toNode = nodes.find(n => n.id === edge.toNode);

      const line = d3.line()
        .x(d => d.x)
        .y(d => d.y);

      const points = [
        { x: fromNode.x, y: fromNode.y },
        { x: toNode.x, y: toNode.y }
      ];

      return (
        <Line
          key={index}
          x1={fromNode.x}
          y1={fromNode.y}
          x2={toNode.x}
          y2={toNode.y}
          stroke="black"
        />
      );
    });
  };

  const positionNodes = (nodes, width, height) => {
    if (!nodes || nodes.length === 0) return;
    nodes.forEach((node, index) => {
      node.x = Math.random() * width;
      node.y = Math.random() * height;
    });
  };

  const width = 400;
  const height = 400;

  positionNodes(nodes, width, height);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Constants.expoConfig.extra.firebaseApiKey</Text>
      <Button title="Fetch Data" onPress={fetchData} />
      <Svg width={width} height={height}>
        <G>
          {nodes.map((node, index) => (
            <Circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={20}
              fill="blue"
            />
          ))}
          {createLinks(edges)}
        </G>
      </Svg>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});