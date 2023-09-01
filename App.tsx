import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Svg, Line, Circle, G } from 'react-native-svg';
import * as d3 from 'd3';
import { readDataFromFirestore } from './database';

const rawData = require('./miserables.json');

export default function D3Chart() {

  const [nodes, setNodes] = useState([...rawData.nodes]);
  const [edges, setEdges] = useState([...rawData.edges]);

  // Get screen dimensions
  const { width, height } = Dimensions.get('window');

  // Color scale
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // Forces
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(edges).id(d => d.id).distance(100).strength(0.5))
    .force("charge", d3.forceManyBody().strength(-50))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide(5))
    .alphaDecay(0.02)
    .on("tick", ticked);

  function ticked() {
    setNodes([...nodes]);
    setEdges([...edges]);
  }

  useEffect(() => {
    simulation.nodes(nodes);
    simulation.force("link").links(edges);
    simulation.alpha(1).restart();
  }, [nodes, edges]);

  return (
    <View style={styles.container}>
      <Svg height='100%' width='100%' style={{ position: 'relative' }}>
        <G>
          {edges.map((link, index) => (
            <Line
              key={index}
              x1={link.source.x}
              y1={link.source.y}
              x2={link.target.x}
              y2={link.target.y}
              stroke="#999"
              strokeWidth={Math.sqrt(link.value)}
              strokeOpacity={0.6}
            />
          ))}
        </G>
        <G>
          {nodes.map((node, index) => (
            <Circle
              key={index}
              cx={node.x}
              cy={node.y}
              r={5}
              fill={color(node.group)}
              stroke="#fff"
              strokeWidth={1.5}
            />
          ))}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffa',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
