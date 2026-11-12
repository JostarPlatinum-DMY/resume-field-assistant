import {extractFields,LABELS,FIELD_KEYS} from './schema.js';
const $=id=>document.getElementById(id);
const saved=await chrome.storage.local.get(['profile','api']);
$('profile').value=FIELD_KEYS.filter(key=>saved.profile?.[key]).map(key=>`${LABELS[key]}：${saved.profile[key]}`).join('\n');
$('url').value=saved.api?.url||'';$('model').value=saved.api?.model||'';$('key').value=saved.api?.key||'';
function status(text){$('status').textContent=text}
$('save').addEventListener('click',async()=>{try{const profile=extractFields($('profile').value);const url=$('url').value.trim();const model=$('model').value.trim();const key=$('key').value.trim();if(!Object.keys(profile).length)throw Error('请至少填写一项个人资料。');if(!url||!model||!key)throw Error('请填完整 API 地址、模型名称和密钥。');const parsed=new URL(url);if(parsed.protocol!=='https:'&&!(parsed.protocol==='http:'&&['localhost','127.0.0.1'].includes(parsed.hostname)))throw Error('远程 API 必须使用 HTTPS。');const origin=`${parsed.origin}/*`;if(!await chrome.permissions.request({origins:[origin]}))throw Error('需要授权访问所选 API 域名。');await chrome.storage.local.set({profile,api:{url,model,key}});status('已保存。')}catch(error){status(error.message)}});
$('clear').addEventListener('click',async()=>{if(!confirm('清除本机保存的个人资料与 API 密钥？'))return;await chrome.storage.local.remove(['profile','api']);$('profile').value='';$('url').value='';$('model').value='';$('key').value='';status('已清除。')});
