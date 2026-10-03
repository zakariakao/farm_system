const fs = require('fs');
const path = require('path');
const libxml = require('libxmljs');

/**
 * Script de validation XML/XSD pour FarmFeed
 * Valide tous les fichiers XML du projet contre leurs schémas XSD
 */

const entities = [
    'animalGroup',
    'subAnimalGroup',
    'fourage',
    'supplier',
    'fourageStock',
    'feedingRecord'
];

const xmlDir = path.join(__dirname, 'xml-xsd', 'xml');
const xsdDir = path.join(__dirname, 'xml-xsd', 'xsd');

console.log('='.repeat(60));
console.log('  VALIDATION XML/XSD - FarmFeed');
console.log('='.repeat(60));
console.log('');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

entities.forEach(entity => {
    totalTests++;
    
    const xmlFile = path.join(xmlDir, `${entity}.txt`);
    const xsdFile = path.join(xsdDir, `${entity}.txt`);
    
    console.log(`Validation: ${entity}`);
    console.log('-'.repeat(60));
    
    try {
        // Vérifier que les fichiers existent
        if (!fs.existsSync(xmlFile)) {
            console.log(`  ❌ Fichier XML introuvable: ${xmlFile}`);
            failedTests++;
            console.log('');
            return;
        }
        
        if (!fs.existsSync(xsdFile)) {
            console.log(`  ❌ Fichier XSD introuvable: ${xsdFile}`);
            failedTests++;
            console.log('');
            return;
        }
        
        // Charger les fichiers
        const xmlContent = fs.readFileSync(xmlFile, 'utf8');
        const xsdContent = fs.readFileSync(xsdFile, 'utf8');
        
        // Parser le XSD
        const xsdDoc = libxml.parseXml(xsdContent);
        
        // Parser le XML
        const xmlDoc = libxml.parseXml(xmlContent);
        
        // Valider
        const isValid = xmlDoc.validate(xsdDoc);
        
        if (isValid) {
            console.log(`  ✅ Validation réussie`);
            console.log(`  📄 XML: ${path.basename(xmlFile)}`);
            console.log(`  📋 XSD: ${path.basename(xsdFile)}`);
            passedTests++;
        } else {
            console.log(`  ❌ Validation échouée`);
            console.log(`  Erreurs:`);
            xmlDoc.validationErrors.forEach((err, idx) => {
                console.log(`    ${idx + 1}. ${err.message.trim()}`);
            });
            failedTests++;
        }
        
    } catch (error) {
        console.log(`  ❌ Erreur de parsing: ${error.message}`);
        failedTests++;
    }
    
    console.log('');
});

// Résumé
console.log('='.repeat(60));
console.log('  RÉSUMÉ DE VALIDATION');
console.log('='.repeat(60));
console.log(`  Total:   ${totalTests} fichiers`);
console.log(`  ✅ Réussis: ${passedTests}`);
console.log(`  ❌ Échoués: ${failedTests}`);
console.log(`  Taux de réussite: ${((passedTests/totalTests)*100).toFixed(1)}%`);
console.log('='.repeat(60));

// Code de sortie
process.exit(failedTests > 0 ? 1 : 0);
