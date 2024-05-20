const vault = require('node-vault')();
require('dotenv').config();

vault.token = process.env.VAULT_TOKEN;
vault.address = process.env.VAULT_ADDR;

const getGoogleOAuthSecrets = async () => {
    try {
        const { data } = await vault.read('secret/data/google-oauth'); // Correct the path if needed
        return data.data; // Adjust for the data structure in KV v2
    } catch (err) {
        console.error('Error fetching secrets from Vault:', err);
        throw err;
    }
};

module.exports = getGoogleOAuthSecrets;
