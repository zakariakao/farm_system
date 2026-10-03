# Documentation XML/XSD - FarmFeed

## Vue d'ensemble

Ce dossier contient les schémas XSD (XML Schema Definition) et les exemples de fichiers XML pour toutes les entités du système FarmFeed.

## Structure

```
xml-xsd/
├── xml/          # Exemples de fichiers XML
│   ├── animalGroup.xml
│   ├── subAnimalGroup.xml
│   ├── fourage.xml
│   ├── supplier.xml
│   ├── fourageStock.xml
│   └── feedingRecord.xml
│
└── xsd/          # Schémas de validation XSD
    ├── animalGroup.xsd
    ├── subAnimalGroup.xsd
    ├── fourage.xsd
    ├── supplier.xsd
    ├── fourageStock.xsd
    └── feedingRecord.xsd
```

## Entités

### 1. AnimalGroup (Groupe d'Animaux)
- **XSD**: `xsd/animalGroup.xsd`
- **XML**: `xml/animalGroup.xml`
- **Description**: Représente les groupes principaux d'animaux (Bovins, Ovins, etc.)
- **Éléments**:
  - `id`: Identifiant unique
  - `name`: Nom du groupe

### 2. SubAnimalGroup (Sous-Groupe d'Animaux)
- **XSD**: `xsd/subAnimalGroup.xsd`
- **XML**: `xml/subAnimalGroup.xml`
- **Description**: Sous-catégories d'animaux au sein d'un groupe
- **Éléments**:
  - `id`: Identifiant unique
  - `groupAnimal_id`: Référence au groupe parent
  - `name`: Nom du sous-groupe
  - `type`: Type d'animaux
  - `quantity`: Nombre d'animaux (entier)

### 3. Fourage (Fourrage)
- **XSD**: `xsd/fourage.xsd`
- **XML**: `xml/fourage.xml`
- **Description**: Types de fourrage disponibles
- **Éléments**:
  - `id`: Identifiant unique
  - `name`: Nom du fourrage
  - `type`: Type (énumération: hay, silage, grass, grain, supplement, other)
  - `suitableFor`: Liste des animaux compatibles

**Particularité**: Utilise un type énuméré pour `type`

### 4. Supplier (Fournisseur)
- **XSD**: `xsd/supplier.xsd`
- **XML**: `xml/supplier.xml`
- **Description**: Informations des fournisseurs
- **Éléments**:
  - `id`: Identifiant unique
  - `name`: Nom du fournisseur
  - `phone`: Numéro de téléphone
  - `email`: Adresse email

### 5. FourageStock (Stock de Fourrage)
- **XSD**: `xsd/fourageStock.xsd`
- **XML**: `xml/fourageStock.xml`
- **Description**: Gestion des stocks
- **Éléments**:
  - `id`: Identifiant unique
  - `name`: Nom du stock
  - `fourage_id`: Référence au fourrage
  - `supplier_id`: Référence au fournisseur
  - `quantity`: Quantité disponible
  - `alert_threshold`: Seuil d'alerte
  - `createdAt`: Date de création (dateTime)
  - `updatedAt`: Date de mise à jour (dateTime)

**Particularité**: Utilise le type `xs:dateTime` pour les timestamps

### 6. FeedingRecord (Enregistrement d'Alimentation)
- **XSD**: `xsd/feedingRecord.xsd`
- **XML**: `xml/feedingRecord.xml`
- **Description**: Historique des distributions
- **Éléments**:
  - `id`: Identifiant unique
  - `subgroup_id`: Référence au sous-groupe
  - `fourage_stock_id`: Référence au stock
  - `quantity`: Quantité distribuée
  - `datetime`: Date et heure (dateTime)

## Validation

### Validation en ligne de commande (xmllint)

```bash
# Valider un fichier XML contre son schéma XSD
xmllint --noout --schema xsd/animalGroup.xsd xml/animalGroup.xml

# Valider tous les fichiers
for file in xml/*.xml; do
    schema="xsd/$(basename $file)"
    xmllint --noout --schema "$schema" "$file"
done
```

### Validation avec Python

```python
from lxml import etree

# Charger le schéma XSD
with open('xsd/animalGroup.xsd', 'r') as f:
    schema_root = etree.XML(f.read())
schema = etree.XMLSchema(schema_root)

# Charger et valider le XML
with open('xml/animalGroup.xml', 'r') as f:
    doc = etree.parse(f)

# Validation
is_valid = schema.validate(doc)
print(f"Valide: {is_valid}")

# Afficher les erreurs si invalide
if not is_valid:
    print(schema.error_log)
```

### Validation avec Node.js

```javascript
const libxml = require('libxmljs');
const fs = require('fs');

// Charger les fichiers
const xsdDoc = libxml.parseXml(fs.readFileSync('xsd/animalGroup.xsd', 'utf8'));
const xmlDoc = libxml.parseXml(fs.readFileSync('xml/animalGroup.xml', 'utf8'));

// Validation
const isValid = xmlDoc.validate(xsdDoc);
console.log('Valide:', isValid);

// Afficher les erreurs
if (!isValid) {
    console.log('Erreurs:', xmlDoc.validationErrors);
}
```

## Types de Données XSD

### Types de base utilisés

| Type XSD      | Description                | Exemple                    |
|---------------|----------------------------|----------------------------|
| xs:string     | Chaîne de caractères       | "Bovins"                   |
| xs:int        | Entier 32 bits             | 100                        |
| xs:dateTime   | Date et heure ISO 8601     | 2025-01-06T08:00:00       |

### Types énumérés

Le schéma `fourage.xsd` définit un type énuméré pour les types de fourrage:

```xml
<xs:simpleType name="FourageType">
    <xs:restriction base="xs:string">
        <xs:enumeration value="hay"/>        <!-- Foin -->
        <xs:enumeration value="silage"/>     <!-- Ensilage -->
        <xs:enumeration value="grass"/>      <!-- Herbe -->
        <xs:enumeration value="grain"/>      <!-- Céréales -->
        <xs:enumeration value="supplement"/> <!-- Supplément -->
        <xs:enumeration value="other"/>      <!-- Autre -->
    </xs:restriction>
</xs:simpleType>
```

## Cardinalités

Les schémas utilisent `maxOccurs` pour définir le nombre d'occurrences:

- `maxOccurs="unbounded"`: Nombre illimité d'éléments
- `maxOccurs="1"` (par défaut): Un seul élément
- `minOccurs="0"`: Élément optionnel

Exemple dans `fourage.xsd`:
```xml
<xs:element name="animal" type="xs:string" maxOccurs="unbounded"/>
```

## Cas d'Usage

### 1. Export de données
Exporter les données MongoDB en format XML pour archivage ou transfert:
```javascript
// Exemple Node.js
const animalGroups = await AnimalGroup.find();
const xmlData = convertToXML(animalGroups, 'AnimalGroups');
fs.writeFileSync('export/animalGroups.xml', xmlData);
```

### 2. Import de données
Importer des données depuis un fichier XML validé:
```javascript
// Valider puis importer
const xml = fs.readFileSync('import/animalGroups.xml');
if (validateXML(xml, 'xsd/animalGroup.xsd')) {
    const data = parseXML(xml);
    await AnimalGroup.insertMany(data);
}
```

### 3. Échange inter-systèmes
Échanger des données avec d'autres systèmes agricoles utilisant XML.

### 4. Tests
Créer des jeux de données de test validés:
```xml
<!-- Fichier de test valide -->
<AnimalGroups>
    <AnimalGroup>
        <id>test-1</id>
        <name>Test Bovins</name>
    </AnimalGroup>
</AnimalGroups>
```

## Outils Recommandés

### Éditeurs XML
- **Visual Studio Code** avec extension "XML Tools"
- **Eclipse** avec plugin XML
- **IntelliJ IDEA** avec support XML intégré
- **Oxygen XML Editor** (professionnel)

### Validateurs en ligne
- [FreeFormatter XML Validator](https://www.freeformatter.com/xml-validator-xsd.html)
- [XMLValidation.com](https://www.xmlvalidation.com/)
- [Code Beautify XML Validator](https://codebeautify.org/xmlvalidator)

### Bibliothèques
- **Python**: lxml, xmlschema
- **Node.js**: libxmljs, fast-xml-parser
- **Java**: javax.xml, JAXB
- **C#**: System.Xml

## Bonnes Pratiques

1. **Toujours valider** les fichiers XML avant import
2. **Utiliser des IDs uniques** pour toutes les entités
3. **Respecter les formats de date** ISO 8601 (YYYY-MM-DDTHH:mm:ss)
4. **Encoder en UTF-8** tous les fichiers XML
5. **Versionner** les schémas XSD lors de modifications
6. **Documenter** les changements de schéma

## Évolutions Futures

### Améliorations prévues

1. **Validation avancée** avec patterns regex:
```xml
<xs:simpleType name="EmailType">
    <xs:restriction base="xs:string">
        <xs:pattern value="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"/>
    </xs:restriction>
</xs:simpleType>
```

2. **Namespaces XML** pour éviter les conflits

3. **Schémas modulaires** avec réutilisation de types communs

4. **Support XSLT** pour transformation de données

5. **Intégration API** pour validation côté serveur

## Support

Pour toute question concernant les schémas XML/XSD:
- Consulter la documentation dans `rapport_farmfeed.pdf` (Chapitre 4)
- Vérifier les exemples dans le dossier `xml/`
- Utiliser les outils de validation recommandés

## Licence

Ce projet est sous licence MIT. Les schémas XSD peuvent être réutilisés librement.
