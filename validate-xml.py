#!/usr/bin/env python3
"""
Script de validation XML/XSD pour FarmFeed
Valide tous les fichiers XML du projet contre leurs schémas XSD
"""

import os
import sys
from pathlib import Path
from lxml import etree

# Configuration des couleurs pour le terminal
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    BLUE = '\033[94m'
    YELLOW = '\033[93m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def print_header(text):
    """Affiche un en-tête formaté"""
    print(f"\n{Colors.BOLD}{'=' * 60}{Colors.RESET}")
    print(f"{Colors.BOLD}  {text}{Colors.RESET}")
    print(f"{Colors.BOLD}{'=' * 60}{Colors.RESET}\n")

def print_subheader(text):
    """Affiche un sous-titre formaté"""
    print(f"{Colors.BLUE}{text}{Colors.RESET}")
    print(f"{'-' * 60}")

def validate_xml(xml_file, xsd_file):
    """
    Valide un fichier XML contre un schéma XSD
    
    Args:
        xml_file: Chemin vers le fichier XML
        xsd_file: Chemin vers le fichier XSD
        
    Returns:
        tuple: (is_valid, errors)
    """
    try:
        # Charger et parser le schéma XSD
        with open(xsd_file, 'r', encoding='utf-8') as f:
            schema_root = etree.XML(f.read().encode('utf-8'))
        schema = etree.XMLSchema(schema_root)
        
        # Charger et parser le document XML
        with open(xml_file, 'r', encoding='utf-8') as f:
            doc = etree.parse(f)
        
        # Validation
        is_valid = schema.validate(doc)
        
        # Récupérer les erreurs si invalide
        errors = []
        if not is_valid:
            for error in schema.error_log:
                errors.append(f"Ligne {error.line}: {error.message}")
        
        return is_valid, errors
        
    except Exception as e:
        return False, [f"Erreur de parsing: {str(e)}"]

def main():
    """Fonction principale"""
    # Entités à valider
    entities = [
        'animalGroup',
        'subAnimalGroup',
        'fourage',
        'supplier',
        'fourageStock',
        'feedingRecord'
    ]
    
    # Chemins des dossiers
    base_dir = Path(__file__).parent
    xml_dir = base_dir / 'xml-xsd' / 'xml'
    xsd_dir = base_dir / 'xml-xsd' / 'xsd'
    
    # En-tête
    print_header("VALIDATION XML/XSD - FarmFeed")
    
    # Statistiques
    total_tests = 0
    passed_tests = 0
    failed_tests = 0
    
    # Valider chaque entité
    for entity in entities:
        total_tests += 1
        
        xml_file = xml_dir / f"{entity}.txt"
        xsd_file = xsd_dir / f"{entity}.txt"
        
        print_subheader(f"Validation: {entity}")
        
        # Vérifier l'existence des fichiers
        if not xml_file.exists():
            print(f"  {Colors.RED}❌ Fichier XML introuvable: {xml_file}{Colors.RESET}")
            failed_tests += 1
            print()
            continue
            
        if not xsd_file.exists():
            print(f"  {Colors.RED}❌ Fichier XSD introuvable: {xsd_file}{Colors.RESET}")
            failed_tests += 1
            print()
            continue
        
        # Valider
        is_valid, errors = validate_xml(xml_file, xsd_file)
        
        if is_valid:
            print(f"  {Colors.GREEN}✅ Validation réussie{Colors.RESET}")
            print(f"  📄 XML: {xml_file.name}")
            print(f"  📋 XSD: {xsd_file.name}")
            passed_tests += 1
        else:
            print(f"  {Colors.RED}❌ Validation échouée{Colors.RESET}")
            print(f"  {Colors.YELLOW}Erreurs:{Colors.RESET}")
            for idx, error in enumerate(errors, 1):
                print(f"    {idx}. {error}")
            failed_tests += 1
        
        print()
    
    # Résumé
    print_header("RÉSUMÉ DE VALIDATION")
    print(f"  Total:   {total_tests} fichiers")
    print(f"  {Colors.GREEN}✅ Réussis: {passed_tests}{Colors.RESET}")
    print(f"  {Colors.RED}❌ Échoués: {failed_tests}{Colors.RESET}")
    
    success_rate = (passed_tests / total_tests * 100) if total_tests > 0 else 0
    print(f"  Taux de réussite: {success_rate:.1f}%")
    print(f"{'=' * 60}\n")
    
    # Code de sortie
    sys.exit(0 if failed_tests == 0 else 1)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n\n{Colors.YELLOW}Validation interrompue par l'utilisateur{Colors.RESET}")
        sys.exit(1)
    except Exception as e:
        print(f"\n{Colors.RED}Erreur fatale: {str(e)}{Colors.RESET}")
        sys.exit(1)
