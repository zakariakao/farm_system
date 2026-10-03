# FarmFeed

FarmFeed is a livestock feed management system with a Node.js/Express API, an Angular frontend, and XML/XSD assets for data validation and exchange.

## Stack

- Backend: Node.js, Express, MongoDB
- Frontend: Angular
- XML/XSD: schemas and sample XML files
- Docker: docker-compose for local deployment

## Repository Structure

- backend/: API server
- frontend/: Angular application
- xml-xsd/: XML samples and XSD schemas
- validate-xml.js: XML validation script (Node.js)
- validate-xml.py: XML validation script (Python)

## Prerequisites

- Node.js 18+ (recommended)
- npm
- Python 3.9+ (optional, for validate-xml.py)
- Docker Desktop (optional, for docker-compose)

## Quick Start (Docker)

```bash
docker compose up --build
```

## Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run start
```

## XML/XSD Validation

### Node.js

```bash
node validate-xml.js
```

### Python

```bash
python validate-xml.py
```

## Documentation

- xml-xsd/README.md: XML/XSD guide and validation examples
- GUIDE_COMPLET.md: full project documentation (French)
- MODIFICATIONS_XML_XSD.md: XML/XSD change log
