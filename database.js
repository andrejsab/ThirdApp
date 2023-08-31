import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('graph.db');

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS nodes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);');
    tx.executeSql('CREATE TABLE IF NOT EXISTS edges (id INTEGER PRIMARY KEY AUTOINCREMENT, fromNode INTEGER, toNode INTEGER);');
  });
};

export const insertNode = (name, callback) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO nodes (name) VALUES (?);', [name], (_, result) => callback(result.insertId));
  });
};

export const insertEdge = (fromNode, toNode) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO edges (fromNode, toNode) VALUES (?, ?);', [fromNode, toNode]);
  });
};

export const fetchGraphData = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM nodes;', [], (_, { rows: { _array: nodes } }) => {
      tx.executeSql('SELECT * FROM edges;', [], (_, { rows: { _array: edges } }) => {
        callback(nodes, edges);
      });
    });
  });
};
