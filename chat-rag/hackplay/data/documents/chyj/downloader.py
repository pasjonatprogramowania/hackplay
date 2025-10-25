# download_skrm_docs.py - Stały Komitet Rady Ministrów
import requests
from pathlib import Path
import time

BASE_URL = 'https://legislacja.rcl.gov.pl'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Referer': 'https://legislacja.rcl.gov.pl/projekt/12390551',
}

# Dokumenty ze Stałego Komitetu RM (WRZESIEŃ-PAŹDZIERNIK 2025!)
documents = [
    # PROJEKT główny (wrzesień 2025)
    {
        'url': '/docs//2/12390551/13087932/13087933/dokument736716.zip',
        'name': 'SKRM_2025-09-12_PROJEKT_UC71_KRM-0610-177-25.zip'
    },

    # AUTOPOPRAWKA (październik 2025) - NAJNOWSZE!
    {
        'url': '/docs//2/12390551/13087932/13087933/dokument740748.zip',
        'name': 'SKRM_2025-10-02_AUTOPOPRAWKA_UC71_KRM-0610-177-25.zip'
    },

    # UWAGI zgłoszone do projektu
    {
        'url': '/docs//2/12390551/13087932/13087934/dokument738243.pdf',
        'name': 'SKRM_Uwagi_KSS.pdf'
    },
    {
        'url': '/docs//2/12390551/13087932/13087934/dokument738244.pdf',
        'name': 'SKRM_Uwagi_KOSR.pdf'
    },
    {
        'url': '/docs//2/12390551/13087932/13087934/dokument738246.pdf',
        'name': 'SKRM_Uwagi_MNiSW.pdf'
    },
    {
        'url': '/docs//2/12390551/13087932/13087934/dokument738247.pdf',
        'name': 'SKRM_Uwagi_Kds_PP.pdf'
    },
    {
        'url': '/docs//2/12390551/13087932/13087934/dokument738248.pdf',
        'name': 'SKRM_Uwagi_MFiG.pdf'
    },
    {
        'url': '/docs//2/12390551/13087932/13087934/dokument738249.pdf',
        'name': 'SKRM_Uwagi_RCL.pdf'
    },
    {
        'url': '/docs//2/12390551/13087932/13087934/dokument738505.pdf',
        'name': 'SKRM_Uwagi_MSZ.pdf'
    },
    {
        'url': '/docs//2/12390551/13087932/13087934/dokument738506.pdf',
        'name': 'SKRM_Uwagi_MS.pdf'
    },
    {
        'url': '/docs//2/12390551/13087932/13087934/dokument738507.pdf',
        'name': 'SKRM_Uwagi_MFiG2.pdf'
    },
    {
        'url': '/docs//2/12390551/13087932/13087934/dokument738508.pdf',
        'name': 'SKRM_Uwagi_MS2.pdf'
    },
    {
        'url': '/docs//2/12390551/13087932/13087934/dokument738756.pdf',
        'name': 'SKRM_Uwagi_MRPiPS.pdf'
    },
    {
        'url': '/docs//2/12390551/13087932/13087934/dokument741350.pdf',
        'name': 'SKRM_Uwagi_MFiG3.pdf'
    },
    {
        'url': '/docs//2/12390551/13087932/13087934/dokument742072.pdf',
        'name': 'SKRM_Uwagi_MS3.pdf'
    },
    {
        'url': '/docs//2/12390551/13087932/13087934/dokument742983.pdf',
        'name': 'SKRM_Uwagi_MFiG4.pdf'
    },

    # ODNIESIENIA wnioskodawcy do uwag
    {
        'url': '/docs//2/12390551/13087932/13087935/dokument740753.zip',
        'name': 'SKRM_Odniesienie_MFiG.zip'
    },
    {
        'url': '/docs//2/12390551/13087932/13087935/dokument740754.zip',
        'name': 'SKRM_Odniesienie_KSS.zip'
    },
    {
        'url': '/docs//2/12390551/13087932/13087935/dokument740757.zip',
        'name': 'SKRM_Odniesienie_RCL.zip'
    },
    {
        'url': '/docs//2/12390551/13087932/13087935/dokument740779.zip',
        'name': 'SKRM_Odniesienie_MSZ.zip'
    },
    {
        'url': '/docs//2/12390551/13087932/13087935/dokument740780.zip',
        'name': 'SKRM_Odniesienie_MNiSW.zip'
    },
]

output_dir = Path('skrm_documents')
output_dir.mkdir(exist_ok=True)

session = requests.Session()
session.headers.update(headers)

print('🚀 Pobieranie dokumentów ze Stałego Komitetu RM...\n')

for i, doc in enumerate(documents, 1):
    url = BASE_URL + doc['url']
    filename = doc['name']
    filepath = output_dir / filename

    print(f'[{i}/{len(documents)}] 📥 {filename}')

    try:
        response = session.get(url, timeout=30, stream=True, allow_redirects=True)
        response.raise_for_status()

        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)

        size = filepath.stat().st_size / 1024
        print(f'   ✅ {size:.1f} KB\n')
        time.sleep(1)

    except Exception as e:
        print(f'   ❌ {e}\n')

print(f'\n🎉 Zapisano w: {output_dir.absolute()}')
print(f'\n📌 TOP dokumenty:')
print('   - AUTOPOPRAWKA 02.10.2025 (NAJNOWSZA!)')
print('   - Projekt główny 12.09.2025')
print('   - Uwagi wszystkich ministerstw')
