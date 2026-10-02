"""Audit statique et HTTP local des ressources Législation, sans mutation du site."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse,unquote
from urllib.request import urlopen,Request
from concurrent.futures import ThreadPoolExecutor
import json,sys,subprocess
sys.stdout.reconfigure(encoding='utf-8')
root=Path(__file__).resolve().parents[2]; leg=root/'legislation'
class Links(HTMLParser):
    def __init__(self):super().__init__();self.urls=[];self.scripts=[];self.script=None
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        for key in ['src','href']:
            if a.get(key):self.urls.append(a[key])
        if tag=='script' and not a.get('src') and a.get('type','') not in ('application/json','importmap'):self.script=''
    def handle_data(self,data):
        if self.script is not None:self.script+=data
    def handle_endtag(self,tag):
        if tag=='script' and self.script is not None:self.scripts.append(self.script);self.script=None
files=list((leg/'stations').glob('*/index.html'))+[leg/'index.html',leg/'carnet.html',leg/'batiment3d/index.html',leg/'carnet/guide-pedagogique.html']
missing=[]; checked=set(); json_errors=[]
for p in files:
    parsed=Links();parsed.feed(p.read_text(encoding='utf-8-sig'))
    for u in parsed.urls:
        v=urlparse(u)
        if v.scheme or v.netloc or not v.path:continue
        path=(root/unquote(v.path.lstrip('/'))) if v.path.startswith('/') else p.parent/unquote(v.path)
        if path.is_dir():path=path/'index.html'
        checked.add(str(path.resolve()))
        if not path.exists():missing.append([str(p.relative_to(root)),u])
for p in (leg/'stations').glob('*/mission.json'):
    m=json.loads(p.read_text(encoding='utf-8-sig'))
    if len(m.get('questions',[]))!=4:json_errors.append(str(p))
urls=['http://localhost:8795/legislation/stations/'+p.parent.name+'/' for p in files if p.parent.parent.name=='stations']
urls+=['http://localhost:8795/legislation/carnet/'+p.name for p in (leg/'carnet').glob('*.pdf')]
def probe(u):
    try:
        with urlopen(Request(u,method='HEAD'),timeout=15) as r:return [u,r.status,r.headers.get('Content-Type')]
    except Exception as e:return [u,str(e)]
with ThreadPoolExecutor(max_workers=6) as pool:responses=list(pool.map(probe,urls))
http_bad=[r for r in responses if r[1]!=200]
result={'html_pages':len(files),'local_resources':len(checked),'missing':missing,'missions':len(list((leg/'stations').glob('*/mission.json'))),'mission_errors':json_errors,'http_checked':len(responses),'http_errors':http_bad}
print(json.dumps(result,ensure_ascii=False,indent=2))
sys.exit(1 if missing or json_errors or http_bad else 0)
