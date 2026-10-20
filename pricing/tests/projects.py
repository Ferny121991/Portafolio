"""End-to-end PHP project CRUD, image and publication tests; no production writes."""
import os,json,re,secrets,shutil,subprocess,tempfile,time,urllib.request,urllib.parse,urllib.error,http.cookiejar
from pathlib import Path
repo=Path(__file__).resolve().parents[2]
php=os.environ.get('FERNELY_TEST_PHP','php')
args=[php]
if os.environ.get('FERNELY_TEST_GD_DIR'):args+=['-d','extension_dir='+os.environ['FERNELY_TEST_GD_DIR'],'-d','extension=gd']
temp=Path(tempfile.mkdtemp(prefix='projects-test-',dir=repo.parent))
private=temp/'private';private.mkdir()
web=temp/'web';shutil.copytree(repo/'public',web);shutil.copytree(repo/'pricing/public',web/'precios')
password=secrets.token_urlsafe(24)
subprocess.run(args+[str(repo/'pricing/tools/create-admin.php'),str(private),'--stdin'],input=json.dumps({'username':'test-owner','password':password}),text=True,check=True,capture_output=True)
env={**os.environ,'FERNELY_PRICING_PRIVATE_DIR':str(private)}
servers=[]
client=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
admin='http://127.0.0.1:5181'; public='http://127.0.0.1:5180'
def request(path,fields=None,file=None,owner=True):
    headers={};body=None
    if fields is not None:
        if file:
            boundary='----test'+secrets.token_hex(12);parts=[]
            for key,value in fields.items():parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="{key}"\r\n\r\n{value}\r\n'.encode())
            name,mime,data=file
            parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="image"; filename="{name}"\r\nContent-Type: {mime}\r\n\r\n'.encode()+data+b'\r\n')
            parts.append(f'--{boundary}--\r\n'.encode());body=b''.join(parts);headers['Content-Type']='multipart/form-data; boundary='+boundary
        else:body=urllib.parse.urlencode(fields).encode()
    try:
        r=(client if owner else urllib.request.build_opener()).open(urllib.request.Request(path,data=body,headers=headers),timeout=10)
    except urllib.error.HTTPError as e:r=e
    return r.status,r.read(),r.headers
def page():return request(admin+'/admin/projects.php')[1].decode()
def fields():
    html=page();return {'csrf':re.search(r'name="csrf" value="([^"]+)"',html)[1],'revision':str(json.loads((private/'projects.json').read_text())['revision']) if (private/'projects.json').exists() else '1'}
def feed(lang='es'):return json.loads(request(public+'/api/projects.php?lang='+lang)[1])['projects']
try:
    for port,root in [(5180,web),(5181,web/'precios')]:servers.append(subprocess.Popen(args+['-S',f'127.0.0.1:{port}','-t',str(root)],env=env,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL))
    for _ in range(40):
        try:request(admin+'/admin/');break
        except OSError:time.sleep(.1)
    assert b'Iniciar' in request(admin+'/admin/projects.php',owner=False)[1]
    html=request(admin+'/admin/')[1].decode();token=re.search(r'name="csrf" value="([^"]+)"',html)[1]
    assert b'admin-editor' in request(admin+'/admin/',{'csrf':token,'action':'login','username':'test-owner','password':password})[1]
    assert len(feed())==8
    f={**fields(),'action':'save_project','id':'','order':'0','link':'https://example.com/'}
    for lang in ['es','en']:
        for field in ['title','description','category','alt']:f[lang+'_'+field]=lang+' '+field+' <script>alert(1)</script>'
    image=('image.webp','image/webp',(repo/'public/img/optimized/garden.webp').read_bytes())
    assert request(admin+'/admin/projects.php',{**f,'csrf':'bad'},image)[0]==403
    assert request(admin+'/admin/projects.php',{**f,'link':'javascript:alert(1)'},image)[0]==422
    assert request(admin+'/admin/projects.php',f,('x.svg','image/svg+xml',b'<svg/>'))[0]==422
    assert request(admin+'/admin/projects.php',f,image)[0]==200
    data=json.loads((private/'projects.json').read_text());item=data['projects'][-1];id=item['id'];assert len(feed())==8
    f.update(fields());f.update(id=id,active='on')
    assert request(admin+'/admin/projects.php',f)[0]==200
    assert feed()[0]['id']==id and feed('en')[0]['title'].startswith('en ')
    status,body,headers=request(public+feed()[0]['image']);assert status==200 and headers['Content-Type']=='image/webp' and body[:4]==b'RIFF'
    assert request(public+'/api/project-image.php?id=../../config.php')[0]==404
    assert request(admin+'/admin/projects.php',f)[0]==409
    assert b'&lt;script&gt;' in request(admin+'/admin/projects.php?edit='+id)[1]
    f.update(fields());f.pop('active');assert request(admin+'/admin/projects.php',f)[0]==200;assert len(feed())==8
    f.update(fields());f['active']='on';assert request(admin+'/admin/projects.php',f)[0]==200
    d={**fields(),'action':'delete','id':id,'confirm_delete':'on'};assert request(admin+'/admin/projects.php',d)[0]==200;assert len(feed())==8
    d.update(fields());d['action']='restore';assert request(admin+'/admin/projects.php',d)[0]==200;assert len(feed())==8
    assert not json.loads((private/'projects.json').read_text())['projects'][-1]['deleted']
    # A later public deployment must not replace the independently stored portfolio.
    shutil.copy2(repo/'pricing/public/projects.default.json',web/'precios/projects.default.json');assert len(feed())==8
    print('PASS: authentication, CSRF, URL/image rejection, upload/re-encode, ES/EN, ordering, publish/hide, conflict, escaping, delete/restore, persistence.')
finally:
    for server in servers:server.terminate();server.wait(timeout=10)
    assert temp.parent==repo.parent and temp.name.startswith('projects-test-')
    shutil.rmtree(temp)
