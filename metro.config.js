const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Configuração simples para evitar problemas com watchers
config.watchFolders = [];

module.exports = config;
